import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { increment, decrement } from 'redux/reducers/sampleSlice';
import type { RootState } from 'redux/store';
import { TitleStyled } from './Sample.styles';
import { useTranslation } from 'react-i18next';

const Sample: FC = () => {
	const value = useAppSelector((state: RootState) => state.sample.value);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	return (
		<div>
			<TitleStyled>{`${t('Sample.title')}`}</TitleStyled>
			<div>{value}</div>
			<button onClick={() => dispatch(decrement())}>-10</button>
			<button onClick={() => dispatch(increment())}>+10</button>
		</div>
	);
};

export default Sample;
