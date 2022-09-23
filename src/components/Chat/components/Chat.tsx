import React, { FC } from 'react';
import { IMessages } from '../interface';

interface ChatProps {
	messages: IMessages[];
}

const Chat: FC<ChatProps> = ({ messages }) => {
	return (
		<div>
			<ul>
				{messages.map(message => (
					<li key={message.id}>{message.text}</li>
				))}
			</ul>
		</div>
	);
};

export default Chat;
