import React, { FC, Suspense, useEffect, useState } from 'react';
import { ReactI18NextChild, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
	Container,
	Div1,
	Div2,
	Div3,
	H3,
	Image,
	P,
	Save,
	Img,
	H5,
	Invite,
} from './inviteTalent.styles';
import blackHeartIcon from 'assets/blackHeartIcon.svg';
import whiteHeartIcon from 'assets/whiteHeartIcon.svg';
import { IPost } from 'components/inviteTalent/interfaces';
import {
	useGetPostJobQuery,
	useGetUserProfileQuery,
	useUpdateSingleProfileMutation,
} from 'service/httpService';
import InvitePopup from 'components/inviteTalent/component/Invitepopup';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const InviteTalent: FC = () => {
	const { t } = useTranslation();
	const params = Number(useParams().id);
	const [saveBool, setSaveBool] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const {
		user: { id },
	} = useAppSelector<RootState>(state => state);
	const { data: post } = useGetPostJobQuery(id);
	const profile = {
		id: params,
		clientId: id,
	};
	const { data, isLoading } = useGetUserProfileQuery(profile);
	const [userUpdate] = useUpdateSingleProfileMutation();

	const defaultTitle = post?.find((el: IPost) => el.jobTitle);

	const clientInfos = {
		clientId: post?.find((el: IPost) => el.userId)?.userId,
		jobPostId: post?.find((el: IPost) => el.id)?.id,
	};

	const Context = {
		isDisabled,
		setIsDisabled,
		open,
		setOpen,
		post,
		handleSelect,
		data,
		defaultTitle,
		clientInfos,
	};

	useEffect(() => {
		setOpen(true);
	}, []);

	useEffect(() => {
		const getSingleProfile = () => {
			if (isLoading) {
				return <Suspense fallback={<div>{`${t('PostDetailPage.loading')}`}</div>}></Suspense>;
			} else if (data) {
				setSaveBool(data?.status?.saved);
			}
		};
		getSingleProfile();
	}, [data?.status?.saved]);

	const handleSaveClick = async () => {
		if (!saveBool) {
			setSaveBool(true);
		} else {
			setSaveBool(false);
		}
		const userHeartUpdate = await userUpdate({
			id: params,
			saved: !saveBool,
			clientId: id,
		}).unwrap();
		const { saved } = userHeartUpdate;
		if (saved) {
			setSaveBool(!saveBool);
		}
	};

	const handleClick = () => {
		if (!showPopup) {
			setShowPopup(true);
		} else {
			setShowPopup(false);
		}
	};

	function handleSelect(): ReactI18NextChild | Iterable<ReactI18NextChild> {
		return post?.map((el: IPost) => <option>{el.jobTitle}</option>);
	}

	return (
		<Container>
			{
				<>
					<Div1>
						<Div2>
							<H3>{data?.setting?.firstName}</H3>
							<H3>{data?.setting?.lastName}</H3>
							<P>{data?.setting?.phone}</P>
						</Div2>
						<Image src={data?.profile.photo} />
						<Save onClick={handleSaveClick}>
							<Img src={saveBool ? blackHeartIcon : whiteHeartIcon} />
						</Save>
					</Div1>
					<Div1>
						<H5>{data?.profile.postion}</H5>
						<H5>Price: {data?.profile.price}</H5>
					</Div1>
					<Div3>
						<P>{data?.profile.description}</P>
					</Div3>
				</>
			}
			<Invite type="button" onClick={() => handleClick()}>{`${t('InvitePage.button')}`}</Invite>
			{showPopup ? <InvitePopup Context={Context} /> : null}
		</Container>
	);
};

export default InviteTalent;
