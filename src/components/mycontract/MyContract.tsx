import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import {
	ContractContainer,
	ContractItem,
	Div,
	SelectBlock,
	Title,
	Wrapper,
	P,
	NotFoundContract,
	MainWrapper,
} from './MyContract.style';
import {
	useGetAcceptedJobOfferQuery,
	useUpdateOfferStatusExpiredMutation,
} from 'service/httpService';
import { Image } from 'components/Layout/Layout.styles';
import profileImage from 'image/profile.png';
import Spinner from 'assets/spinner.gif';
import { ImgSpinner } from 'components/freelancerJobs/freelancerPage.styles';
import { DescriptionStyled } from 'components/freelancerJobs/freelancerPage.styles';
import {
	accepted,
	client,
	DataSchema,
	expired,
	freelancer,
	getDate,
	selectionDate,
	selectionStatus,
	useSendData,
} from './dataUpdate';
import { IContract, ISelect } from './interfaces';
import { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

function MyContract() {
	const { t } = useTranslation();
	const { user } = useAppSelector<RootState>(state => state);
	const [selectDate, setSelectDate] = useState<ISelect>();
	const [selectStatus, setSelectStatus] = useState<ISelect>();
	const [status, setStatus] = useState<IContract[]>([]);
	const {
		control,
		getValues,
		formState: { errors },
	} = useForm<DataSchema>();
	const dataSend = {
		userId: user.id,
		role: user.role,
		date: selectDate?.name,
		status: selectStatus?.name,
	};
	const { data: offerAccepted, isLoading, isSuccess } = useGetAcceptedJobOfferQuery(dataSend);
	const { ids } = useSendData(offerAccepted);
	const [updateStatus] = useUpdateOfferStatusExpiredMutation();

	useEffect(() => {
		const intervalId = setInterval(() => {
			updateStatusContract();
		}, 60000);
		return () => clearInterval(intervalId);
	}, []);

	const updateStatusContract = async () => {
		await updateStatus({ id: ids, status: expired });
	};

	useEffect(() => {
		const sortArray = () => {
			if (offerAccepted) {
				const sorted = [...offerAccepted].sort((a: { status: string }, b: { status: string }) =>
					a.status > b.status ? -1 : 1,
				);
				setStatus(sorted);
			}
		};

		sortArray();
	}, [offerAccepted]);
	let content;
	if (isLoading) {
		content = <ImgSpinner src={Spinner} />;
	} else if (isSuccess) {
		content = (
			<MainWrapper>
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
											onChange={select => select && setSelectStatus({ name: select.value })}
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
											onChange={select => select && setSelectDate({ name: select.value })}
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
				{status.length > 0 && !isLoading ? (
					status?.map((item: IContract) => {
						return (
							<ContractContainer key={item.id}>
								<Title>{item.jobPostId?.jobTitle}</Title>
								<ContractItem>
									{user.role === client ? (
										<Image src={item.freelancerId?.photo ?? profileImage} alt="freelancerPhoto" />
									) : (
										<Image src={item.jobPostId?.userId.clientSetting.photo} alt="clientPoto" />
									)}
									<Link className="link" to="#">
										{user.role === client && item?.freelancerId?.userId.firstName && (
											<>
												<P>
													{item?.freelancerId.userId.firstName ?? 'default'}{' '}
													{item?.freelancerId.userId.lastName ?? 'default'}
												</P>
											</>
										)}
										{user.role === freelancer && <P>{item?.name}</P>}
									</Link>
									<P className={item.status === accepted ? 'accepted' : 'expired'}>
										Status/{item.status}
									</P>
									<P>
										{getDate(new Date(item.startDate))}-{getDate(new Date(item.endDate))}
									</P>
								</ContractItem>
							</ContractContainer>
						);
					})
				) : (
					<NotFoundContract>
						<DescriptionStyled>Not found created contract!</DescriptionStyled>
					</NotFoundContract>
				)}
			</MainWrapper>
		);
	}
	return <div>{content}</div>;
}

export default MyContract;
