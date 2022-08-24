import { t } from 'i18next';
import React from 'react';
import { CheckLabel } from 'components/jobPost/JobPost.styles';

interface Props {
	label: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: number;
}

const CurrencyInput = (props: Props) => {
	return (
		<React.Fragment>
			<CheckLabel>{props.label}</CheckLabel>
			<span>$</span>
			<input onChange={props.onChange} value={props.value} type="number" />
			<label>{`${t('JobPostPage.perHour')}`}</label>
		</React.Fragment>
	);
};

export default CurrencyInput;
