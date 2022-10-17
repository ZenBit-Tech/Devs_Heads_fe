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
	MessageBackend,
	MessageFrontend,
	RoomBackend,
	UserList,
	ValidationSchema,
} from './interfaces';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { t } from 'i18next';

const Role = {
	Freelancer: 'freelancer',
	Client: 'client',
};

const Chat = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user?.id;

	const [socket, setSocket] = useState<Socket>();
	const [chatRoomId, setChatRoomId] = useState<number>(0);
	const [socketMessage, setSocketMessage] = useState<MessageFrontend[]>([]);
	const [currentChatId, setCurrentChatId] = useState<initialId>();
	const [roomMessages, setRoomMessages] = useState<MessageBackend[]>();
	const [active, setActive] = useState<number>(chatRoomId);
	const [defaultChat, setDefaultChat] = useState<RoomBackend>();

	const { data: rooms, isSuccess } = useGetRoomsByUserQuery(userId);
	const { data: messages, isLoading } = useGetMessagesByRoomQuery(chatRoomId);
	const { data: room, isFetching } = useGetRoomsByTwoUsersQuery(currentChatId);

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
					lastMessage: item.message[0]?.text,
					senderId: item?.senderId?.id,
					receiverId: item.receiverId?.id,
					roomId: item?.id,
					activeRoom: item.activeRoom,
					date: item.createdAt,
				};
				if (item.receiverId.clientSetting) {
					const obj = {
						...newObj,
						clientName: item.receiverId.clientSetting?.name,
						clientPhoto: profileImage,
						firstName: item.senderId?.firstName,
						lastName: item.senderId?.lastName,
						freelancerPhoto: item.senderId?.profileSetting.photo ?? profileImage,
					};
					return obj;
				} else if (item.senderId?.clientSetting) {
					const obj = {
						...newObj,
						clientName: item.senderId.clientSetting?.name,
						clientPhoto: profileImage,
						firstName: item.receiverId?.firstName,
						lastName: item.receiverId?.lastName,
						freelancerPhoto: item.receiverId?.profileSetting?.photo ?? profileImage,
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
	console.log(room);
	return (
		<Wrapper onSubmit={handleSubmit(onSubmit)}>
			<UsersList>
				{userList?.map((item: UserList) => {
					if (
						(user.role === Role.Freelancer && item.activeRoom) ||
						(user.role === Role.Freelancer && user.id === item.receiverId) ||
						(user.role === Role.Client && user.id === item.receiverId) ||
						(user.role === Role.Client && item.activeRoom)
					) {
						return (
							<SingleUser
								onClick={() =>
									changeRoom(item?.senderId, item.receiverId, item.jobPostId, item.roomId)
								}
								className={item.roomId === active ? 'defaultActive' : ''}
							>
								<div>
									{user?.role === Role.Client && (
										<>
											<ChatImage src={item.freelancerPhoto} />
											<Title>
												{item.firstName} {item.lastName}
												<br />
												{item.jobTitle}
											</Title>
										</>
									)}
									{user?.role === Role.Freelancer && (
										<>
											<ChatImage src={item.clientPhoto} />
											<Title>
												{item.clientName}
												<br />
												{item.jobTitle}
											</Title>
										</>
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
						{user?.role === Role.Client && room?.senderId.profileSetting && (
							<>
								<img src={room?.senderId?.profileSetting?.photo ?? profileImage} />
								<TitleChat>
									{room?.senderId.firstName} {room?.senderId.lastName}
								</TitleChat>
							</>
						)}
						{user?.role === Role.Client && room?.receiverId.profileSetting && (
							<>
								<img src={room?.receiverId?.profileSetting?.photo ?? profileImage} />
								<TitleChat>
									{room?.receiverId.firstName} {room?.receiverId.lastName}
								</TitleChat>
							</>
						)}
						{user?.role === Role.Freelancer && room?.receiverId.clientSetting && (
							<>
								<img src={profileImage} />
								<TitleChat>{room?.receiverId?.clientSetting?.name}</TitleChat>
							</>
						)}
						{user?.role === Role.Freelancer && room?.senderId.clientSetting && (
							<>
								<img src={profileImage} />
								<TitleChat>{room?.senderId?.clientSetting?.name}</TitleChat>
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
											{message.jobLink && (
												<Link to={`${message?.jobLink}`}>
													{process.env.REACT_APP_URL_JOB_POST}
													{message.jobLink}
												</Link>
											)}
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
											{message.jobLink && (
												<Link to={`${message?.jobLink}`}>
													{process.env.REACT_APP_URL_JOB_POST}
													{message.jobLink}
												</Link>
											)}
										</div>
									</Message>
									<MessageBlock>
										<Message className={`message date sended`}>{date}</Message>
										{!defaultChat?.activeRoom && user.id !== message.userId && (
											<ButtonBlock>
												<ButtonChat onClick={() => updateRoom(chatRoomId)}>
													{`${t('chat.accepted')}`}
												</ButtonChat>
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
