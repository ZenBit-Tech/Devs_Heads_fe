import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
	title: Yup.string()
		.required('This field is required')
		.min(6, 'Must be at least 6 characters')
		.max(50, 'Maximum length is 50 symbols'),
	category: Yup.object().shape({
		label: Yup.string().required('This field is required'),
		value: Yup.string().required(),
	}),
	description: Yup.string()
		.required('This field is required')
		.min(6, 'Must be at least 6 characters')
		.max(5000, 'Maximum length is 5000 symbols'),
	fromHourRate: Yup.number().required('This field is required').positive(),
	toHourRate: Yup.number().required('This field is required').positive(),
	duration: Yup.string().required('This field is required'),
});

export default ValidationSchema;
