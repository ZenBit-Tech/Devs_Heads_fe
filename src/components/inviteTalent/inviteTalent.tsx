import React, { FC, useEffect, useState } from 'react';
import { ReactI18NextChild, useTranslation } from 'react-i18next';
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
import { useGetPostJobQuery } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { hardCode } from 'components/inviteTalent/constants';
import InvitePopup from 'components/inviteTalent/component/Invitepopup';

interface IPost {
	jobTitle: string;
	jobDescription: string;
}

const InviteTalent: FC = () => {
	const { t } = useTranslation();
	const [saveBool, setSaveBool] = useState<boolean>(false);
	const [srcIcon, setSrcIcon] = useState<string>(whiteHeartIcon);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const { user } = useAppSelector<RootState>(state => state);
	const { data: post } = useGetPostJobQuery(user.id);

	const Context = {
		isDisabled,
		setIsDisabled,
		open,
		setOpen,
		post,
		handleSelect,
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
			{hardCode.map(el => (
				<>
					<Div1 key={el.name}>
						<Div2>
							<H3>{el.name}</H3>
							<P>{el.location}</P>
						</Div2>
						<Image src={el.photo} />
						<Save onClick={() => handleSaveClick()}>
							<Img src={srcIcon} />
						</Save>
					</Div1>
					<Div1 key={el.category}>
						<H5>{el.category}</H5>
						<H5>{el.price}</H5>
					</Div1>
					<Div3>
						<P>{el.description}</P>
					</Div3>
				</>
			))}
			<Invite type="button" onClick={() => handleClick()}>{`${t('InvitePage.button')}`}</Invite>
			{showPopup ? <InvitePopup Context={Context} /> : null}
		</Container>
	);
};

export default InviteTalent;
