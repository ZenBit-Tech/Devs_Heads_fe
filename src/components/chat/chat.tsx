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
import { useEffect, useMemo, useState, useRef } from 'react';
import profileImage from 'image/profile.png';
import { IoMdSend } from 'react-icons/io';
import Search from 'components/freelancerJobs/components/search';
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
	Button,
	LastMessage,
	TitleMessage,
	TitleChat,
	SearchWrapper,
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

const Chat = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user?.id;

	const [socket, setSocket] = useState<Socket>();
	const [chatRoomId, setChatRoomId] = useState<number>(0);
	const [socketMessage, setSocketMessage] = useState<MessageFrontend[]>([]);
	const [currentChatId, setCurrentChatId] = useState<initialId>();
	const [roomMessages, setRoomMessages] = useState<MessageBackend[]>();
	const [active, setActive] = useState<number>(chatRoomId);
	const { data: rooms, isSuccess } = useGetRoomsByUserQuery(userId);
	const { data: messages, isLoading } = useGetMessagesByRoomQuery(chatRoomId);
	const { data: room, isFetching } = useGetRoomsByTwoUsersQuery(currentChatId);
	const [defaultChat, setDefaultChat] = useState<RoomBackend>();
	const [updateChatRoom] = useUpdateChatRoomMutation();
	const scrollRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		if (!isFetching) {
			setRoomMessages(room?.message);
			setDefaultChat(room);
		}
	}, [isFetching]);

	useEffect(() => {
		if (isSuccess) {
			setChatRoomId(rooms[0]?.id);
			setDefaultChat(rooms[0]);
			setCurrentChatId({
				senderId: rooms[0]?.senderId.id,
				receiverId: rooms[0]?.receiverId.id,
				jobPostId: rooms[0]?.jobPostId.id,
			});
			setActive(rooms[0]?.id);
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

	const messageListener = (message: any) => {
		setSocketMessage(arr => [...arr, message]);
	};

	useEffect(() => {
		socket?.on('recMessage', messageListener);
		return () => {
			socket?.off('recMessage', messageListener);
		};
	}, [socket]);

	const userList = useMemo(
		() =>
			rooms?.map((item: RoomBackend) => {
				const newObj = {
					jobTitle: item.jobPostId?.jobTitle,
					jobPostId: item.jobPostId?.id,
					lastMessage: item.message.text,
					senderId: item?.senderId?.id,
					receiverId: item.receiverId?.id,
					roomId: item?.id,
					activeRoom: item.activeRoom,
					date: item.createdAt,
				};
				if (item.senderId?.id === user?.id && user?.role === 'freelancer') {
					const obj = {
						...newObj,
						clientName: item?.receiverId?.clientSetting.name ?? 'default',
						photo: profileImage,
					};
					return obj;
				} else {
					const obj = {
						...newObj,
						firstName: item.senderId?.firstName ?? 'default',
						lastName: item.senderId?.lastName ?? 'default',
						photo: item.senderId?.profileSetting?.photo ?? profileImage,
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
		setActive(chatRoomId);
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
									changeRoom(item?.senderId, item.receiverId, item.jobPostId, item.roomId)
								}
								className={item.roomId === active ? 'defaultActive' : ''}
							>
								<div>
									<ChatImage src={item.photo} alt="userpicture" width="40px" height="40px" />
									{user?.role === 'client' ? (
										<Title>
											{item.firstName} {item.lastName}
											<br />
											{item.jobTitle}
										</Title>
									) : (
										<Title>
											{item.clientName}
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
						{user?.role === 'client' ? (
							<>
								<img src={room?.senderId?.profileSetting.photo} alt="user" />
								<TitleChat>
									{room?.senderId?.firstName ?? room?.receiverId.firstName}{' '}
									{room?.senderId?.lastName ?? room?.receiverId.lastName}
								</TitleChat>
							</>
						) : (
							<>
								<img src={profileImage} alt="user" />
								<TitleChat>
									{room?.senderId?.clientSetting?.name ?? room?.receiverId?.clientSetting?.name}
								</TitleChat>
							</>
						)}
					</ArrowBlock>
				</TitleMessage>
				<ChatMessages ref={scrollRef}>
					{roomMessages?.map((message: MessageBackend) => {
						if (message?.user?.role === user?.role) {
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
										{!defaultChat?.activeRoom && user.role === 'client' && (
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
					{socketMessage?.map((message: MessageFrontend) => {
						if (message?.chatRoomId === chatRoomId) {
							if (message?.userId === user?.id) {
								return (
									<RightLi>
										<Message className={`message recieved`}>
											<div className="content">
												<p>{message.text}</p>
											</div>
										</Message>
									</RightLi>
								);
							} else {
								return (
									<LeftLi>
										<Message className={`message sended`}>
											<div className="content">
												<p>{message.text}</p>
											</div>
										</Message>
									</LeftLi>
								);
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
					<button type="submit">
						<IoMdSend />
					</button>
				</InputBlock>
			</ChatWrapper>
		</Wrapper>
	);
};

export default Chat;
