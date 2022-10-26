import { UserList } from 'components/chat/interfaces';
import { ChatImage, LastMessage, SingleUser, Title } from 'components/chat/chat.styles';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { Role } from 'pages/RoleSelection';
import { useUpdateDeletingStatusMutation } from 'service/httpService';

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
			<button onClick={() => deleteHandler(user.role)}>Delete only for me</button>
			<button onClick={() => deleteHandler('both')}>Delete for both</button>
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
};

export default User;
