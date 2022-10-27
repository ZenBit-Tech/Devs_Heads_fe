import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import {
	IEducationAndExperienceTemplate,
	ITextareaWithDatesOnChange,
	OnChangeObjectKeys,
} from '../interfaces/interfaces';
import { useTranslation } from 'react-i18next';
import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

const { RangePicker } = DatePicker;

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

	useEffect(() => {
		const error = !text && isTouched;
		props.onChange({
			index: props.index,
			item: { info: text, dateStart: startDate, dateEnd: endDate, error: error },
			key: props.objectKey,
		});
		if (!isTouched) setIsTouched(true);
	}, [startDate, endDate, text]);

	const onChange = (value: RangePickerProps['value'], dateString: [string, string]) => {
		if (dateString) {
			setStartDate(new Date(dateString[0]));
			setEndDate(new Date(dateString[1]));
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
					<Space direction="vertical" size={12}>
						<RangePicker onChange={onChange} value={[moment(startDate), moment(endDate)]} />
					</Space>
				</CalendarBlock>
			</Block>
		</Container>
	);
};
