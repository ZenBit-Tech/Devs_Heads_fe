import { useGetAcceptedJobOfferQuery } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { useMemo, useState } from 'react';
import { IContract, ISelect } from './interfaces';

export const expired = 'pending';
export const client = 'client';
export const freelancer = 'freelancer';

export type DataSchema = {
	status: { label: string; value: string };
	date: { label: string; value: string };
};

export const selectionStatus = [
	{ value: 'expired', label: 'Ended' },
	{ value: 'accepted', label: 'In Process' },
	{ value: 'pending', label: 'Pending' },
];

export const selectionDate = [
	{ value: 'ASC', label: 'Oldest to newest' },
	{ value: 'DESC', label: 'Newest to oldest' },
];

export const getDate = (date: Date) => {
	const currentDate = date.toLocaleDateString('en-us', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
	return currentDate;
};

export const useSendData = (offerAccepted: IContract[]) => {
	const ids: number[] = [];

	const filteredContract = useMemo(
		() => offerAccepted?.filter((item: IContract) => new Date(item.endDate) > new Date()),
		[offerAccepted],
	);
	useMemo(
		() => filteredContract?.filter((item: IContract) => ids.push(item.id)),
		[filteredContract],
	);

	return { ids, offerAccepted };
};
