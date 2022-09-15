import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import InvitePopup from 'components/inviteTalent/component/Invitepopup';

const InviteTalent: FC = () => {
	const { t } = useTranslation();
	const [saveBool, setSaveBool] = useState(false);
	const [srcIcon, setSrcIcon] = useState(whiteHeartIcon);
	const [showPopup, setShowPopup] = useState(false);

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

	useEffect(() => {
		handleSrc();
	}, [saveBool]);

	const hardCode = [
		{
			name: 'Bjarni Kristjan S.',
			location: 'Iceland',
			photo: `${blackHeartIcon}`,
			category: 'Translator',
			description: "I'm a translator specializing in Icelandic and Swedish.",
			price: '$50.00/hr',
		},
	];
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
			{showPopup ? <InvitePopup /> : null}
		</Container>
	);
};

export default InviteTalent;
