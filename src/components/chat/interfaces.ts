import * as Yup from 'yup';
import { t } from 'i18next';

export const ValidationSchema = Yup.object().shape({
	text: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
});

export type DataSchema = {
	text: string;
};

export type MessageFrontend = {
	text: string;
	userId: number | undefined;
	chatRoomId: number;
	jobLink?: string;
};

export type MessageBackend = {
	text: string;
	userId: number | undefined;
	created_at: Date;
	jobLink: string | undefined;
	user: {
		email: string;
		firstName: string;
		lastName: string;
		googleId: string;
		id: number;
		password: string;
		phone: string;
		role: string;
		userId: number;
	};
	profileSetting: {
		photo: string;
		position: string;
		price: number;
		englishLevel: string;
		description: string;
		userId: number;
	};
};

export type RoomBackend = {
	id: number;
	createdAt: Date;
	activeRoom: boolean;
	receiverId: {
		email: string;
		firstName: string;
		lastName: string;
		googleId: string;
		id: number;
		password: string;
		phone: string;
		role: string;
		profileId: number;
	};
	senderId: {
		email: string;
		firstName: string;
		lastName: string;
		googleId: string;
		id: number;
		password: string;
		phone: string;
		role: string;
		profileId: number;
	};
	message: {
		text: string;
		userId: number | undefined;
		chatRoomId: number;
		jobLink: string | undefined;
	};
	jobTitle: string | undefined;
	jobPostId: {
		id: number;
		jobTitle: string;
		dataTime: Date;
		fromHourRate: number;
		toHourRate: number;
		jobDescription: string;
		jobDuration: string;
		userId: number;
	};
};
export type UserList = {
	firstName: string;
	lastName: string;
	clientName: string;
	date: string;
	photo: string;
	jobTitle: string;
	jobPostId: number;
	lastMessage: string;
	senderId: number;
	receiverId: number;
	roomId: number;
	activeRoom: boolean;
};

export type initialId = {
	senderId: number;
	receiverId: number;
	jobPostId: number;
};

export const initialMessage = [
	{
		text: '',
		userId: 0,
		chatRoomId: 0,
		jobLink: '',
	},
];

export const initialRoomId = {
	senderId: 0,
	receiverId: 0,
	jobPostId: 0,
};
