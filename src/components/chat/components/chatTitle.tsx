import { RoomBackend } from 'components/chat/interfaces';
import profileImage from 'image/profile.png';
import { TitleChat } from 'components/chat/chat.styles';
import { Role } from 'pages/RoleSelection';

interface Props {
	userRole: string;
	room: RoomBackend;
}

const ChatTitle = (props: Props) => {
	const { userRole, room } = props;
	return (
		<>
			{userRole === Role.Client && room?.senderId.profileSetting && (
				<>
					<img src={room?.senderId?.profileSetting?.photo ?? profileImage} />
					<TitleChat>
						{room?.senderId.firstName} {room?.senderId.lastName}
					</TitleChat>
				</>
			)}
			{userRole === Role.Client && room?.receiverId.profileSetting && (
				<>
					<img src={room?.receiverId?.profileSetting?.photo ?? profileImage} />
					<TitleChat>
						{room?.receiverId.firstName} {room?.receiverId.lastName}
					</TitleChat>
				</>
			)}
			{userRole === Role.Freelancer && room?.receiverId.clientSetting && (
				<>
					<img src={room?.receiverId?.clientSetting?.photo ?? profileImage} />
					<TitleChat>{room?.receiverId?.clientSetting?.name}</TitleChat>
				</>
			)}
			{userRole === Role.Freelancer && room?.senderId.clientSetting && (
				<>
					<img src={room?.senderId?.clientSetting?.photo ?? profileImage} />
					<TitleChat>{room?.senderId?.clientSetting?.name}</TitleChat>
				</>
			)}
		</>
	);
};

export default ChatTitle;
