import { ReactI18NextChild } from 'react-i18next';

export interface IPost {
	jobTitle: string;
	jobDescription: string;
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
	};
}
export interface IMessage {
	message: string;
	userId: number | undefined;
	jobTitle: string;
}

export type Alert = 'success' | 'error';
