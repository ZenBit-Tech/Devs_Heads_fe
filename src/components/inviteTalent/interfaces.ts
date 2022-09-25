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
		postInvitation: (text: string, id: number, title: string | IMessage) => Promise<IMessage>;
		data: {
			profile: { userId: number };
		};
	};
}
export interface IMessage {
	text: string;
	userId: number | undefined;
	title: string;
}
