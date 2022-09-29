import userEvent from '@testing-library/user-event';
import { message } from 'antd';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IMessages, IUser } from '../interface';

interface ChatProps {
	messages: IMessages[];
}

const Chat: FC<ChatProps> = ({ messages }) => {
	return (
		<div>
			<ul>
				{messages.map(message => (
					<li key={message.id}>
						<div>{message.text}</div>
						<NavLink to={`${message?.linkJob}`}>{message.linkJob}</NavLink>
						<div>{message?.name}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Chat;
