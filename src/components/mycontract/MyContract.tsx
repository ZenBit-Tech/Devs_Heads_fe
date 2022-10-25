import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
	MainWrapper,
} from 'components/mycontract/MyContract.style';
import {
	useGetAcceptedJobOfferQuery,
	useUpdateOfferStatusExpiredMutation,
} from 'service/httpService';
import { Image } from 'components/Layout/Layout.styles';
import profileImage from 'image/profile.png';
import Spinner from 'assets/spinner.gif';
import { H3, H5, Img, ImgSpinner } from 'components/freelancerJobs/freelancerPage.styles';
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
} from 'components/mycontract/dataUpdate';
import { IContract, initialContract, ISelect } from 'components/mycontract/interfaces';
import { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';
import ContractModal from 'components/mycontract/modal';
import ImageNoFound from 'image/no_result.png';

function MyContract() {
	const { t } = useTranslation();
	const { user } = useAppSelector<RootState>(state => state);
	const [selectDate, setSelectDate] = useState<ISelect>();
	const [selectStatus, setSelectStatus] = useState<ISelect>();
	const [contractItem, setItem] = useState<IContract>(initialContract);
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
	const { data: offerAccepted, isLoading } = useGetAcceptedJobOfferQuery(dataSend);
	const [updateStatus] = useUpdateOfferStatusExpiredMutation();
	const { ids } = useSendData(offerAccepted);

	useEffect(() => {
		const updateExpired = async () => {
			await updateStatus({ id: ids, status: expired });
		};
		updateExpired();
	}, [offerAccepted, ids]);

	useEffect(() => {
		const sortArray = () => {
			if (offerAccepted) {
				return [...offerAccepted].sort((a: { status: string }, b: { status: string }) =>
					a.status > b.status ? -1 : 1,
				);
			}
		};

		sortArray();
	}, [offerAccepted]);

	const itemChange = (item: IContract) => {
		toggle();
		setItem(item);
	};
	const useModal = () => {
		const [isShown, setIsShown] = useState<boolean>(false);
		const toggle = () => setIsShown(!isShown);
		return {
			isShown,
			toggle,
		};
	};
	const { isShown, toggle } = useModal();

	return (
		<MainWrapper>
			{isLoading && <ImgSpinner src={Spinner} />}
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
			{offerAccepted?.length > 0 && !isLoading ? (
				offerAccepted?.map((item: IContract) => {
					return (
						<ContractContainer key={item.id} onClick={() => itemChange(item)}>
							<Title>{item.jobPostId?.jobTitle}</Title>
							<ContractItem>
								{user.role === client ? (
									<Image
										src={item.freelancerId?.profileSetting?.photo ?? profileImage}
										alt="freelancerPhoto"
									/>
								) : (
									<Image src={item.clientId?.clientSetting.photo} alt="clientPhoto" />
								)}
								<div>
									{user.role === client && item?.freelancerId?.firstName && (
										<>
											<P>
												{item?.freelancerId?.firstName ?? 'default'}{' '}
												{item?.freelancerId?.lastName ?? 'default'}
											</P>
										</>
									)}
									{user.role === freelancer && <P>{item?.name}</P>}
								</div>
								<P className={item.status === accepted ? accepted : expired}>
									Status/{item.status}
								</P>
								<P>
									{getDate(new Date(item.startDate))}-{getDate(new Date(item.endDate))}
								</P>
							</ContractItem>
							<ContractModal isShown={isShown} hide={toggle} item={contractItem} />
						</ContractContainer>
					);
				})
			) : (
				<>
					<Img src={ImageNoFound}></Img>
					<H3>{`${t('FreelancerPage.noResult1')}`}</H3>
					<H5>{`${t('FreelancerPage.noResult2')}`}</H5>
				</>
			)}
		</MainWrapper>
	);
}

export default MyContract;
