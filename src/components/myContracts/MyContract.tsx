import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Div, SelectBlock, Wrapper } from './MyContract.style';

export type DataSchema = {
	status: { label: string; value: string };
	date: { label: string; value: string };
};

export const selectionStatus = [
	{ value: 'Ended', label: 'Ended' },
	{ value: 'In process', label: 'In process' },
];

export const selectionDate = [
	{ value: 'Oldest to newest', label: 'Oldest to newest' },
	{ value: 'Newest to oldest', label: 'Newest to oldest' },
];

function MyContract() {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<DataSchema>();

	const { t } = useTranslation();

	return (
		<Wrapper>
			<SelectBlock>
				<Div>
					<Controller
						name="status"
						control={control}
						render={({ field }) => {
							return (
								<Select
									{...field}
									options={selectionStatus}
									className={`${errors.status ? 'is-invalid' : ''}`}
									value={getValues('status')}
									placeholder={`${t('MyContract.status')}`}
								/>
							);
						}}
					/>
				</Div>
				<Div>
					<Controller
						name="date"
						control={control}
						render={({ field }) => {
							return (
								<Select
									{...field}
									options={selectionDate}
									className={`${errors.date ? 'is-invalid' : ''}`}
									value={getValues('date')}
									placeholder={`${t('MyContract.date')}`}
								/>
							);
						}}
					/>
				</Div>
			</SelectBlock>
		</Wrapper>
	);
}

export default MyContract;
