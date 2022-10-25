import { useEffect, useMemo, useState } from 'react';
import { IContract } from './interfaces';

export const expired = 'Expired';
export const accepted = 'Accepted';
export const client = 'client';
export const freelancer = 'freelancer';

export type DataSchema = {
	status: { label: string; value: string };
	date: { label: string; value: string };
};

export const selectionStatus = [
	{ value: 'Expired', label: 'Ended' },
	{ value: 'Accepted', label: 'In Process' },
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
	const [ids, setIds] = useState<number[]>([]);
	const filteredContract = useMemo(
		() => offerAccepted?.filter((item: IContract) => new Date(item.endDate) < new Date()),
		[offerAccepted],
	);
	useEffect(() => {
		if (filteredContract) {
			const contract = filteredContract?.map(item => item.id);
			setIds(contract);
		}
	}, [filteredContract]);

	return { ids, offerAccepted };
};
