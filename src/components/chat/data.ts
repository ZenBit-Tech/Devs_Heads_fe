import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DataSchema, RoomBackend, ValidationSchema } from './interfaces';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { useGetRoomsByUserQuery } from 'service/httpService';
import { useMemo } from 'react';
import profileImage from 'image/profile.png';

export const useOnDataChange = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user?.id;
	const { data: rooms } = useGetRoomsByUserQuery(userId);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DataSchema>({
		resolver: yupResolver(ValidationSchema),
	});

	const getDate = (date: Date) => {
		const currentDate =
			date.toLocaleDateString('en-us', { hour: 'numeric', minute: 'numeric' }) +
			' ' +
			date.getFullYear();
		return currentDate;
	};
	const userList = useMemo(
		() =>
			rooms?.map((item: RoomBackend) => {
				const newObj = {
					jobTitle: item.jobPostId?.jobTitle,
					jobPostId: item.jobPostId?.id,
					lastMessage: item.message[0]?.text,
					senderId: item?.senderId?.id,
					receiverId: item.receiverId?.id,
					roomId: item?.id,
					activeRoom: item.activeRoom,
					date: item.createdAt,
					deletedFor: item.deletedFor,
				};
				if (item.receiverId.clientSetting) {
					const obj = {
						...newObj,
						clientName: item.receiverId.clientSetting?.name,
						clientPhoto: item.receiverId.clientSetting?.photo ?? profileImage,
						firstName: item.senderId?.firstName,
						lastName: item.senderId?.lastName,
						freelancerPhoto: item.senderId?.profileSetting.photo ?? profileImage,
					};
					return obj;
				} else if (item.senderId?.clientSetting) {
					const obj = {
						...newObj,
						clientName: item.senderId.clientSetting?.name,
						clientPhoto: item.senderId.clientSetting?.photo ?? profileImage,
						firstName: item.receiverId?.firstName,
						lastName: item.receiverId?.lastName,
						freelancerPhoto: item.receiverId?.profileSetting?.photo ?? profileImage,
					};
					return obj;
				}
			}),
		[rooms],
	);

	return { register, handleSubmit, reset, errors, getDate, userList, rooms };
};
