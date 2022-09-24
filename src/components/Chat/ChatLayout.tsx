import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import io, { Socket } from 'socket.io-client';
import { Wrapper, AsideWrapper, ChatWrapper, SearchWrapper } from './ChatLayout.styles';
import Chat from './components/Chat';
import ChatInput from './components/ChatInput';
import { IMessages } from './interface';
import { useGetMessagesQuery } from 'service/httpService';

const ChatLayout: FC = () => {
	const [socket, setSocket] = useState<Socket>();
	const [messages, setMessages] = useState<IMessages[]>([]);
	const { user } = useAppSelector(state => state);
	const { data } = useGetMessagesQuery();

	const userEmail = user.email;

	useEffect(() => {
		const newSocket = io('http://localhost:5009');
		setSocket(newSocket);
	}, [setSocket]);

	useEffect(() => {
		if (data !== undefined) {
			setMessages(data);
		}
	}, [data]);

	const messageListener = (message: any) => {
		setMessages([...messages, message]);
	};

	useEffect(() => {
		socket?.on('message', messageListener);
		return () => {
			socket?.off('message', messageListener);
		};
	}, [messageListener]);

	const handleSend = (value: string) => {
		socket?.emit('message', { email: userEmail, text: value });
	};

	return (
		<Wrapper>
			<AsideWrapper>
				<SearchWrapper>
					<form>
						<input />
					</form>
				</SearchWrapper>
				<ul>
					<li>List of Users</li>
				</ul>
			</AsideWrapper>
			<ChatWrapper>
				<div>Info about User</div>
				<Chat messages={messages} />
				<ChatInput send={handleSend} />
			</ChatWrapper>
		</Wrapper>
	);
};

export default ChatLayout;
