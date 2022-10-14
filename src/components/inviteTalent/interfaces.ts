import { ReactI18NextChild } from 'react-i18next';

export interface IPost {
	id: number;
	jobTitle: string;
	userId: number;
}

export interface IProps {
	Context: {
		isDisabled: boolean;
		setIsDisabled: (disabled: boolean) => void;
		open: boolean;
		setOpen: (open: boolean) => void;
		post: IPost[];
		handleSelect: () => ReactI18NextChild | Iterable<ReactI18NextChild>;
		data: {
			profile: { userId: number; id: number };
		};
		defaultTitle: IPost;
		clientInfos: {
			clientId: number;
			jobPostId: number;
		};
	};
}
export interface IMessage {
	message: string;
	clientId?: number;
	freelancerId?: number;
	profileId?: number;
	jobPostId?: number;
	jobTitle: string;
}

export type Alert = 'success' | 'error';
