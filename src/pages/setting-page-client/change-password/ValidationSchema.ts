import { t } from 'i18next';
import * as Yup from 'yup';

const ValidationSchema = Yup.object({
	oldPassword: Yup.string().required(),
	newPassword: Yup.string()
		.required()
		.matches(/^(?=.{8,})/, 'Must Contain at least 8 digits')
		.matches(/^(?=.*[0-9])/, 'Must Contain at least one Number')
		.matches(/^(?=.*[!@#\$%\^&\*])/, 'Must Contain at least one Symbols'),
	confirmPassword: Yup.string().required(),
}).required();

export default ValidationSchema;
