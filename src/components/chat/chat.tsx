import { useForm } from 'react-hook-form';
import {
	useGetMessagesByRoomQuery,
	useGetRoomsByUserQuery,
	useGetRoomsByTwoUsersQuery,
	useUpdateChatRoomMutation,
} from 'service/httpService';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import io, { Socket } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';
import { UsersList, ChatList, Input, Button, RightLi, LeftLi } from './chat.styles';
import { Link } from 'react-router-dom';
import {
	DataSchema,
	initialId,
	initialRoomId,
	initialMessage,
	MessageBackend,
	MessageFrontend,
	RoomBackend,
	UserList,
	ValidationSchema,
} from './interfaces';

const Chat = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user.id;

	const [socket, setSocket] = useState<Socket>();
	const [chatRoomId, setChatRoomId] = useState<number>(0);
	const [socketMessage, setSocketMessage] = useState<MessageFrontend[]>(initialMessage);
	const [currentChatId, setCurrentChatId] = useState<initialId>(initialRoomId);
	const [roomMessages, setRoomMessages] = useState<MessageBackend[]>();

	const { data: rooms, isSuccess } = useGetRoomsByUserQuery(userId);
	const { data: messages, isLoading } = useGetMessagesByRoomQuery(chatRoomId);
	const { data: room, isFetching } = useGetRoomsByTwoUsersQuery(currentChatId);
	const [updateChatRoom] = useUpdateChatRoomMutation();

	useEffect(() => {
		if (!isFetching) {
			setRoomMessages(room?.message);
		}
	}, [isFetching]);

	useEffect(() => {
		if (isSuccess) {
			setChatRoomId(rooms[0].id);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (!isLoading) {
			setRoomMessages(messages);
		}
	}, [isLoading]);

	useEffect(() => {
		const newSocket = io('http://localhost:3000');
		setSocket(newSocket);
	}, []);

	useEffect(() => {
		if (socket) {
			socket?.on('recMessage', message => {
				setSocketMessage(arr => [...arr, message]);
			});
		}
	}, [socket]);

	const userList = useMemo(
		() =>
			rooms?.map((item: RoomBackend) => {
				const newObj = {
					jobTitle: item.jobPostId?.jobTitle,
					jobPostId: item.jobPostId?.id,
					lastMessage: item.message.text,
					senderId: item.senderId.id,
					receiverId: item.receiverId.id,
					roomId: item.id,
					activeRoom: item.activeRoom,
				};
				if (item.senderId.id === user.id) {
					const obj = {
						...newObj,
						firstName: item.receiverId.firstName,
						lastName: item.receiverId.lastName,
					};
					return obj;
				} else {
					const obj = {
						...newObj,
						firstName: item.senderId.firstName,
						lastName: item.senderId.lastName,
					};
					return obj;
				}
			}),
		[rooms],
	);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DataSchema>({
		resolver: yupResolver(ValidationSchema),
	});

	const onSubmit = (data: DataSchema) => {
		const NewData = {
			...data,
			userId,
			chatRoomId,
		};
		socket?.emit('sendMessage', NewData);
		reset();
	};

	const changeRoom = (senderId: number, receiverId: number, jobPostId: number, roomId: number) => {
		setCurrentChatId({ senderId, receiverId, jobPostId });
		setChatRoomId(roomId);
	};

	const updateRoom = (chatRoomId: number) => {
		const newObj = {
			chatRoomId,
			activeRoom: true,
		};
		updateChatRoom(newObj);
		const message = {
			text: 'Accepted',
			chatRoomId,
			userId,
		};
		socket?.emit('sendMessage', message);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<UsersList>
				{userList?.map((item: UserList) => {
					if ((user.role === 'freelancer' && item.activeRoom) || user.role === 'client') {
						return (
							<div
								onClick={() =>
									changeRoom(item.senderId, item.receiverId, item.jobPostId, item.roomId)
								}
							>
								<h4>
									{item.firstName} {item.lastName}
								</h4>
								<h6>{item.jobTitle}</h6>
							</div>
						);
					}
				})}
			</UsersList>
			<ChatList>
				{roomMessages?.map((message: MessageBackend) => {
					if (message?.user.role === user?.role) {
						return (
							<RightLi>
								{message.text}
								{message.jobLink && (
									<>
										<Link to={message.jobLink}>
											<br />
											{process.env.REACT_APP_URL_JOB_POST}
											{message.jobLink}
										</Link>
									</>
								)}
							</RightLi>
						);
					} else {
						return (
							<LeftLi>
								{message.text}
								{message.jobLink && (
									<>
										<Link to={message.jobLink}>
											<br />
											{process.env.REACT_APP_URL_JOB_POST}
											{message.jobLink}
										</Link>
										{!room?.activeRoom && (
											<>
												<button onClick={() => updateRoom(chatRoomId)}>Accept</button>
												<button>Decline</button>
											</>
										)}
									</>
								)}
							</LeftLi>
						);
					}
				})}
				{socketMessage.map((message: MessageFrontend) => {
					if (message?.chatRoomId === chatRoomId) {
						if (message?.userId === user?.id) {
							return <RightLi>{message.text}</RightLi>;
						} else {
							return <LeftLi>{message.text}</LeftLi>;
						}
					}
				})}
				<Input type="text" {...register('text')} className={`${errors.text ? 'is-invalid' : ''}`} />
				<Button type="submit">Send message</Button>
			</ChatList>
		</form>
	);
};

export default Chat;
