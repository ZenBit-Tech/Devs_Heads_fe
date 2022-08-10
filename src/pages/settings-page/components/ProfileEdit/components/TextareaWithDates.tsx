import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import {
  IEducationAndExperienceTemplate,
  ITextareaWithDatesOnChange,
  OnChangeObjectKeys,
} from '../interfaces/interfaces';

//Styles
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
  const [startDate, setStartDate] = useState<string>(
    props.item.dateStart || new Date().toISOString(),
  );
  const [endDate, setEndDate] = useState<string>(props.item.dateEnd || new Date().toISOString());
  const [text, setText] = useState<string>(props.item.info || '');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    let error = props.item.error;
    if (!text && isTouched) {
      error = true;
    } else {
      error = false;
    }
    props.onChange({
      index: props.index,
      item: { info: text, dateStart: startDate, dateEnd: endDate, error: error },
      key: props.objectKey,
    });
    if (!isTouched) setIsTouched(true);
  }, [startDate, endDate, text]);

  const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (new Date(e.currentTarget.value) > new Date(endDate)) {
      window.alert('Wrong Date');
    } else {
      setStartDate(e.currentTarget.value);
    }
  };

  const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (new Date(e.currentTarget.value) < new Date(startDate)) {
      window.alert('Wrong Date');
    } else {
      setEndDate(e.currentTarget.value);
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
          placeholder="Maximum text length <200 characters"
          value={text}
        />
        {props.item.error && (
          <Alert
            style={{ height: '30px', margin: '0 0 10px' }}
            message="Field is required"
            type="warning"
            showIcon
            closable
          />
        )}
      </div>
      <Block>
        <CalendarBlock>
          <label>Start time</label>
          <input value={startDate} onChange={onChangeStartDate} type="date" />
        </CalendarBlock>
        <CalendarBlock>
          <label>End time</label>
          <input value={endDate} onChange={onChangeEndDate} type="date" />
        </CalendarBlock>
      </Block>
    </Container>
  );
};
