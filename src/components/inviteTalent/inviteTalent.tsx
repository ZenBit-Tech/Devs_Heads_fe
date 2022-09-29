import React, { FC, useEffect, useState } from 'react';
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
import { useGetPostJobQuery, useGetUserProfileQuery } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import InvitePopup from 'components/inviteTalent/component/Invitepopup';
import { IPost } from 'components/inviteTalent/interfaces';

const InviteTalent: FC = () => {
	const { t } = useTranslation();
	const params = useParams();
	const [saveBool, setSaveBool] = useState<boolean>(false);
	const [srcIcon, setSrcIcon] = useState<string>(whiteHeartIcon);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const {
		user: { id },
	} = useAppSelector<RootState>(state => state);
	const { data: post } = useGetPostJobQuery(id);
	const { data } = useGetUserProfileQuery(Number(params.id));

	const defaultTitle = post?.find((el: IPost) => el.jobTitle);

	const Context = {
		isDisabled,
		setIsDisabled,
		open,
		setOpen,
		post,
		handleSelect,
		data,
		defaultTitle,
	};

	const handleSrc = () => {
		if (saveBool) {
			setSrcIcon(blackHeartIcon);
		} else {
			setSrcIcon(whiteHeartIcon);
		}
	};

	const handleSaveClick = () => {
		if (!saveBool) {
			setSaveBool(true);
		} else {
			setSaveBool(false);
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

	useEffect(() => {
		setOpen(true);
	}, []);

	useEffect(() => {
		handleSrc();
	}, [saveBool]);

	return (
		<Container>
			{
				<>
					<Div1>
						<Div2>
							<H3>{data?.setting.firstName}</H3>
							<H3>{data?.setting.lastName}</H3>
							<P>{data?.setting.phone}</P>
						</Div2>
						<Image src={data?.profile.photo} />
						<Save onClick={() => handleSaveClick()}>
							<Img src={srcIcon} />
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
