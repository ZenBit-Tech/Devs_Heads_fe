import * as Yup from 'yup';
import { t } from 'i18next';
import { ISliceState } from 'redux/reducers/userSlice';

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
		role: string;
	};
	profileSetting: {
		photo: string;
	};
	clientId: number;
	dateTime: Date;
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
};

export type RoomBackend = {
	id: number;
	createdAt: Date;
	activeRoom: boolean;
	receiverId: {
		firstName: string;
		lastName: string;
		id: number;
		profileId: number;
		clientSetting: {
			name: string;
			photo: string;
		};
		profileSetting: {
			photo: string;
		};
	};
	senderId: {
		firstName: string;
		lastName: string;
		id: number;
		role: string;
		profileId: number;
		profileSetting: {
			photo: string;
		};
		clientSetting: {
			name: string;
			photo: string;
		};
	};
	message: {
		text: string;
		userId?: number;
		chatRoomId: number;
		jobLink?: string;
	}[];
	jobTitle: string;
	jobPostId: {
		id: number;
		jobTitle: string;
	};
};
export type UserList = {
	firstName: string;
	lastName: string;
	clientName: string;
	date: string;
	freelancerPhoto: string;
	clientPhoto: string;
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
	activeRoom: boolean;
};
