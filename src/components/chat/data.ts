import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DataSchema, RoomBackend, ValidationSchema } from './interfaces';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { useGetRoomsByUserQuery, useUpdateChatRoomMutation } from 'service/httpService';
import { useMemo, useState } from 'react';
import { Socket } from 'socket.io-client';
import profileImage from 'image/profile.png';

export const useOnDataChange = () => {
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user?.id;
	const [socket] = useState<Socket>();
	const { data: rooms } = useGetRoomsByUserQuery(userId);
	const [updateChatRoom] = useUpdateChatRoomMutation();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DataSchema>({
		resolver: yupResolver(ValidationSchema),
	});

	const onSubmit = (data: DataSchema, chatRoomId: number) => {
		const NewData = {
			...data,
			userId,
			chatRoomId,
		};
		socket?.emit('sendMessage', NewData);
		reset();
	};

	const updateRoom = (chatRoomId: number) => {
		const newObj = {
			chatRoomId,
			activeRoom: true,
		};
		updateChatRoom(newObj);
		const message = {
			text: 'Accepted',
			chatRoomId,
			userId,
		};
		socket?.emit('sendMessage', message);
	};

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
	return { register, handleSubmit, reset, onSubmit, errors, updateRoom, getDate, userList };
};
