import { ReactI18NextChild } from 'react-i18next';

export interface IPost {
	id: number;
	clientId: number;
	jobDescription: string;
	jobTitle: string;
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
			profile: { userId: number };
		};
		firstName: string;
		lastName: string;
	};
}
export interface IMessage {
	message: string;
	userId: number | undefined;
	clientId: number;
}

export type Alert = 'success';
