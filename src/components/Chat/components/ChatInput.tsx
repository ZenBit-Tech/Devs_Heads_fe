import React, { FC, useState } from 'react';

interface ChatInputProps {
	send: (value: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ send }) => {
	const [value, setValue] = useState<string>('');
	return (
		<div>
			<input
				placeholder="Type your message"
				value={value}
				onChange={event => setValue(event.target.value)}
			/>
			<button onClick={() => send(value)}>Send</button>
		</div>
	);
};

export default ChatInput;
