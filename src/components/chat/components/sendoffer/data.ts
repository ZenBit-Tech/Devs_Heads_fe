import * as Yup from 'yup';

export interface ModalProps {
	isShown: boolean;
	hide: () => void;
	setIsShown: (isShown: boolean) => void;
	freelancerId: number;
	clientId: number;
	jobPostId: number;
	isError: boolean;
}

export type OfferForm = {
	name: string;
	price: number;
	startDate: unknown;
	clientId: number;
	endDate: unknown;
	freelancerId: number;
	jobPostId: number;
};

export type NotificationType = 'success' | 'error';

export const Schema = Yup.object().shape({
	price: Yup.number().required().positive(),
	startDate: Yup.date().required().min(new Date()).typeError('This field is required!'),
	endDate: Yup.date().required().min(new Date()).typeError('This field is required!'),
});
