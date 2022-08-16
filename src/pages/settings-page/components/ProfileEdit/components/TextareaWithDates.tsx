import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import {
	IEducationAndExperienceTemplate,
	ITextareaWithDatesOnChange,
	OnChangeObjectKeys,
} from '../interfaces/interfaces';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
	display: flex;
`;

const Block = styled.div`
	display: flex;
	margin-left: 15px;
`;

const CalendarBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledTextarea = styled.textarea`
	width: 500px;
	height: 100px;
	resize: none;
`;

interface ITextareaWithDates {
	item: IEducationAndExperienceTemplate;
	index: number;
	objectKey: OnChangeObjectKeys;
	onChange: (args: ITextareaWithDatesOnChange) => void;
}

export const TextareaWithDates = (props: ITextareaWithDates) => {
	const { t } = useTranslation();

	const [startDate, setStartDate] = useState<Date>(
		props.item.dateStart || new Date().toISOString(),
	);
	const [endDate, setEndDate] = useState<Date>(props.item.dateEnd || new Date().toISOString());
	const [text, setText] = useState<string>(props.item.info || '');
	const [isTouched, setIsTouched] = useState<boolean>(false);
	const [dateError, setDateError] = useState<boolean>(false);

	useEffect(() => {
		const error = !text && isTouched;
		props.onChange({
			index: props.index,
			item: { info: text, dateStart: startDate, dateEnd: endDate, error: error },
			key: props.objectKey,
		});
		if (!isTouched) setIsTouched(true);
	}, [startDate, endDate, text]);

	const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
		if (new Date(e.currentTarget.value) > new Date(endDate)) {
			setDateError(true);
		} else {
			setDateError(false);
			setStartDate(new Date(e.currentTarget.value));
		}
	};

	const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
		if (new Date(e.currentTarget.value) < new Date(startDate)) {
			setDateError(true);
		} else {
			setDateError(false);
			setEndDate(new Date(e.currentTarget.value));
		}
	};
	const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (e.currentTarget.value.length > 200) {
			return;
		}
		setText(e.currentTarget.value);
	};

	return (
		<Container>
			<div>
				<StyledTextarea
					onChange={onTextChange}
					placeholder={`${t('ProfileEdit.descriptionPlaceholder')}`}
					value={text}
				/>
				{props.item.error && (
					<Alert
						style={{ height: '30px', margin: '0 0 10px' }}
						message={`${t('ProfileEdit.fieldIsRequired')}`}
						type="warning"
						showIcon
						closable
					/>
				)}
			</div>
			<Block>
				<CalendarBlock>
					<label>{`${t('ProfileEdit.startDate')}`}</label>
					<input
						value={startDate.toLocaleDateString('en-CA')}
						onChange={onChangeStartDate}
						type="date"
					/>
				</CalendarBlock>
				<CalendarBlock>
					<label>{`${t('ProfileEdit.endDate')}`}</label>
					<input
						value={endDate.toLocaleDateString('en-CA')}
						onChange={onChangeEndDate}
						type="date"
					/>
				</CalendarBlock>
				{dateError && (
					<Alert
						style={{ height: '28px', margin: '22px 0 0' }}
						message={`${t('ProfileEdit.wrongDate')}`}
						type="warning"
						showIcon
						closable
					/>
				)}
			</Block>
		</Container>
	);
};
