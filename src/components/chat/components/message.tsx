import { MessageBackend, MessageFrontend } from 'components/chat/interfaces';
import { Message } from 'components/chat/chat.styles';
import { Link } from 'react-router-dom';
import { ISliceState } from 'redux/reducers/userSlice';
import FreeOfferPopup from 'components/FreelancerOffer/FreeOfferPopup';

interface Props {
	message: MessageBackend | MessageFrontend;
	className: string;
	offer: [
		{
			name: string;
			price: number;
			startDate: string;
			endDate: string;
			jobPostId: number;
			freelancerId: number;
			clientId: number;
		},
	];
	userSlice: ISliceState;
	setOfferResponse: (response: string) => void;
	setStatus: (status: boolean) => void;
	offerResponse: string;
}

const MessageComponent = (props: Props) => {
	const { message, className, offer, userSlice, setOfferResponse, setStatus, offerResponse } =
		props;
	if (message?.text) {
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
	} else {
		return (
			<div>
				<FreeOfferPopup
					offer={offer}
					user={userSlice}
					setOfferResponse={setOfferResponse}
					setStatus={setStatus}
				/>
				<Message>{offerResponse}</Message>
			</div>
		);
	}
};

export default MessageComponent;
