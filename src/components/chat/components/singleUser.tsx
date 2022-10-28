import { UserList } from 'components/chat/interfaces';
import { Btn, ChatImage, LastMessage, SingleUser, Title } from 'components/chat/chat.styles';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { Role } from 'pages/RoleSelection';
import { useUpdateDeletingStatusMutation } from 'service/httpService';
import Image from 'image/dots.png';
import { t } from 'i18next';

interface Props {
	item: UserList;
	changeRoom: (
		senderId: number,
		receiverId: number,
		jobPostId: number,
		roomId: number,
		activeRoom: string,
	) => void;
	active: number;
}

const User = (props: Props) => {
	const { user } = useAppSelector<RootState>(state => state);
	const { item, changeRoom, active } = props;
	const [updateDeletingStatus] = useUpdateDeletingStatusMutation();
	const deleteHandler = (status: string) => {
		const newObj = {
			id: item.roomId,
			deletedFor: status,
		};
		updateDeletingStatus(newObj);
	};
	return (
		<SingleUser
			onClick={() =>
				changeRoom(item?.senderId, item.receiverId, item.jobPostId, item.roomId, item.activeRoom)
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
				<div className="dropdown show">
					<a
						className="btn"
						role="button"
						id="dropdownMenuLink"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<img src={Image} />
					</a>

					<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
						<Btn onClick={() => deleteHandler(user.role)}>{`${t('chat.delete')}`}</Btn>
					</div>
				</div>
				<LastMessage>{item.lastMessage}</LastMessage>
			</div>
		</SingleUser>
	);
};

export default User;
