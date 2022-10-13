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
import profileImage from 'image/profile.png';
import {
	UsersList,
	ChatMessages,
	Title,
	MessageBlock,
	ButtonChat,
	InputBlock,
	ButtonBlock,
	RightLi,
	LeftLi,
	Wrapper,
	ChatWrapper,
	Message,
	SingleUser,
	ArrowBlock,
	ChatImage,
	LastMessage,
	TitleMessage,
	TitleChat,
} from './chat.styles';
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
import { Input } from 'components/clientSettings/clentSettings.styles';
import { Button } from 'antd';

const Chat = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user?.id;

	const [socket, setSocket] = useState<Socket>();
	const [chatRoomId, setChatRoomId] = useState<number>(0);
	const [client, setClient] = useState<string>();
	const [photo, setPhoto] = useState<string>(profileImage);
	const [socketMessage, setSocketMessage] = useState<MessageFrontend[]>(initialMessage);
	const [currentChatId, setCurrentChatId] = useState<initialId>(initialRoomId);
	const [roomMessages, setRoomMessages] = useState<MessageBackend[]>();

	const { data: rooms, isSuccess } = useGetRoomsByUserQuery(userId);
	const { data: messages, isLoading } = useGetMessagesByRoomQuery(chatRoomId);
	const { data: room, isFetching } = useGetRoomsByTwoUsersQuery(currentChatId);
	const [updateChatRoom] = useUpdateChatRoomMutation();
	console.log(roomMessages);

	useEffect(() => {
		if (!isFetching) {
			setRoomMessages(room?.message);
		}
	}, [isFetching]);

	useEffect(() => {
		if (isSuccess) {
			setChatRoomId(rooms[0]?.id);
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

	console.log(rooms);

	useEffect(() => {
		setClient(
			room?.message.filter((item: { user: { role: string } }) => item.user?.role === 'client')[0]
				?.user.clientSetting.name,
		);
		setPhoto(
			room?.message.filter(
				(item: { user: { role: string } }) => item.user?.role === 'freelancer',
			)[0]?.user.profileSetting.photo,
		);
	}, [chatRoomId, currentChatId]);

	const userList = useMemo(
		() =>
			rooms?.map((item: RoomBackend) => {
				const newObj = {
					jobTitle: item.jobPostId?.jobTitle,
					jobPostId: item.jobPostId?.id,
					lastMessage: item.message.text,
					senderId: item.senderId?.id,
					receiverId: item.receiverId?.id,
					roomId: item?.id,
					activeRoom: item.activeRoom,
					date: item.createdAt,
					photo: photo,
				};
				if (item.senderId.id === user?.id) {
					if (item.senderId.role === 'client') {
						const obj = {
							...newObj,
							clientName: client,
						};
						return obj;
					} else {
						const obj = {
							...newObj,
							firstName: item.receiverId.firstName,
							lastName: item.receiverId.lastName,
						};
						return obj;
					}
				} else {
					if (item.senderId.role === 'client') {
						const obj = {
							...newObj,
							clientName: client,
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
	console.log(currentChatId);
	console.log(userList);

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
	const getDate = (date: Date) => {
		const currentDate =
			date.toLocaleDateString('en-us', { hour: 'numeric', minute: 'numeric' }) +
			' ' +
			date.getFullYear();
		return currentDate;
	};
	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)}>
			<UsersList>
				{userList?.map((item: UserList) => {
					if ((user.role === 'freelancer' && item.activeRoom) || user.role === 'client') {
						return (
							<SingleUser
								onClick={() =>
									changeRoom(item.senderId, item.receiverId, item.jobPostId, item.roomId)
								}
							>
								<div>
									<ChatImage src={photo} alt="userpicture" width="40px" height="40px" />
									{user?.role === 'client' ? (
										<Title>
											{item.firstName} {item.lastName}
											<br />
											{item.jobTitle}
										</Title>
									) : (
										<Title>
											{'ClientName'}
											<br />
											{item.jobTitle}
										</Title>
									)}
									<LastMessage>{item.lastMessage}</LastMessage>
								</div>
							</SingleUser>
						);
					}
				})}
			</UsersList>
			<ChatWrapper>
				<TitleMessage>
					<ArrowBlock>
						<img src={photo} alt="user" />
						<TitleChat>
							{user?.role === 'client' ? (
								<>
									{room?.senderId.firstName} {room?.senderId.lastName}
								</>
							) : (
								<>{'ClientName'}</>
							)}
						</TitleChat>
					</ArrowBlock>
				</TitleMessage>
				<ChatMessages>
					{roomMessages?.map((message: MessageBackend) => {
						console.log(message);
						if (message?.user.role === user?.role) {
							const timeElapsed = message.created_at;
							const date = getDate(new Date(timeElapsed));
							return (
								<RightLi>
									<Message className={`message recieved`}>
										<div className="content">
											<p>{message.text}</p>
											<Link to={`${message?.jobLink}`}>
												{process.env.REACT_APP_URL_JOB_POST}
												{message.jobLink}
											</Link>
										</div>
									</Message>
									<Message className={`message date recieved`}>{date}</Message>
								</RightLi>
							);
						} else {
							const date = getDate(new Date(message.created_at));
							return (
								<LeftLi>
									<Message className={`message sended`}>
										<img src={photo} alt="person" />
										<div className="content">
											<p>{message.text}</p>
											<Link to={`${message?.jobLink}`}>
												{process.env.REACT_APP_URL_JOB_POST}
												{message.jobLink}
											</Link>
										</div>
									</Message>
									<MessageBlock>
										<Message className={`message date sended`}>{date}</Message>
										{!room?.activeRoom && (
											<ButtonBlock>
												<ButtonChat onClick={() => updateRoom(chatRoomId)}>Accept</ButtonChat>
												<ButtonChat>Decline</ButtonChat>
											</ButtonBlock>
										)}
									</MessageBlock>
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
				</ChatMessages>
				<InputBlock>
					<Input
						type="text"
						{...register('text')}
						className={`${errors.text ? 'is-invalid' : ''}`}
					/>
					<Button>Send message</Button>
				</InputBlock>
			</ChatWrapper>
		</Wrapper>
	);
};

export default Chat;
