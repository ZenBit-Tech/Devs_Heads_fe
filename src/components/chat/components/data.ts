import * as Yup from 'yup';

export interface ModalProps {
	isShown: boolean;
	hide: () => void;
	setIsShown: (isShown: boolean) => void;
	freelancerId: number;
	jopPostId: number;
}

export type OfferForm = {
	name: string;
	price: number;
	startDate: unknown;
	endDate: unknown;
};

export type NotificationType = 'success' | 'error';

export const Schema = Yup.object().shape({
	price: Yup.number().required().positive(),
	startDate: Yup.date().required().min(new Date()).typeError('This field is required!'),
	endDate: Yup.date().required().min(new Date()).typeError('This field is required!'),
});
