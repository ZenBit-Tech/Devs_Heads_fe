import { MessageBackend, MessageFrontend } from 'components/chat/interfaces';
import { Message } from 'components/chat/chat.styles';
import { Link } from 'react-router-dom';

interface Props {
	message: MessageBackend | MessageFrontend;
	className: string;
}

const MessageComponent = (props: Props) => {
	const { message, className } = props;
	return (
		<Message className={className}>
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
	);
};

export default MessageComponent;
