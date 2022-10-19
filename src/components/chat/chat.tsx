import {
	useGetMessagesByRoomQuery,
	useGetRoomsByUserQuery,
	useGetRoomsByTwoUsersQuery,
} from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import io, { Socket } from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { IoMdSend } from 'react-icons/io';
import {
	UsersList,
	ChatMessages,
	MessageBlock,
	ButtonChat,
	InputBlock,
	ButtonBlock,
	RightLi,
	LeftLi,
	Wrapper,
	ChatWrapper,
	Message,
	ArrowBlock,
	TitleMessage,
} from 'components/chat/chat.styles';
import { initialId, MessageBackend, MessageFrontend, RoomBackend, UserList } from './interfaces';
import { Input } from 'components/clientSettings/clentSettings.styles';
import { t } from 'i18next';
import Image from 'image/no_result.png';
import { Img, H3, H5, ImgSpinner } from 'components/freelancerJobs/freelancerPage.styles';
import Spinner from 'assets/spinner.gif';
import MessageComponent from 'components/chat/components/message';
import User from 'components/chat/components/singleUser';
import { useOnDataChange } from 'components/chat/data';
import ChatTitle from 'components/chat/components/chatTitle';
import { Role } from 'pages/RoleSelection';

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
		const newSocket = io(`${process.env.REACT_APP_API_URL}`);
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

	const { register, handleSubmit, onSubmit, errors, updateRoom, getDate, userList } =
		useOnDataChange();

	const changeRoom = (senderId: number, receiverId: number, jobPostId: number, roomId: number) => {
		setCurrentChatId({ senderId, receiverId, jobPostId });
		setChatRoomId(roomId);
		setActive(chatRoomId);
	};
	if (isFetching || isLoading || !isSuccess) {
		return <ImgSpinner src={Spinner} />;
	} else if (isSuccess && !chatRoomId) {
		return (
			<>
				<Img src={Image}></Img>
				<H3>{`${t('FreelancerPage.noResult1')}`}</H3>
				<H5>{`${t('FreelancerPage.noResult2')}`}</H5>
			</>
		);
	}
	return (
		<Wrapper onSubmit={handleSubmit(data => onSubmit(data, chatRoomId))}>
			<UsersList>
				{userList?.map((item: UserList) => {
					if (
						(user.role === Role.Freelancer && item.activeRoom) ||
						(user.role === Role.Freelancer && user.id === item.receiverId) ||
						(user.role === Role.Client && user.id === item.receiverId) ||
						(user.role === Role.Client && item.activeRoom)
					) {
						return <User item={item} changeRoom={changeRoom} active={active} />;
					}
				})}
			</UsersList>
			<ChatWrapper>
				<TitleMessage>
					<ArrowBlock>
						<ChatTitle userRole={user.role} room={room} />
					</ArrowBlock>
				</TitleMessage>
				<ChatMessages ref={scrollRef}>
					{roomMessages?.map((message: MessageBackend) => {
						if (message?.user?.role === user?.role) {
							const date = getDate(new Date(message.created_at));
							return (
								<RightLi>
									<MessageComponent message={message} className={`message recieved`} />
									<Message className={`message date recieved`}>{date}</Message>
								</RightLi>
							);
						} else {
							const date = getDate(new Date(message.created_at));
							return (
								<LeftLi>
									<MessageComponent message={message} className={`message sended`} />
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
										<MessageComponent message={message} className={`message recieved`} />
									</RightLi>
								);
							} else {
								return (
									<LeftLi>
										<MessageComponent message={message} className={`message sended`} />
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
