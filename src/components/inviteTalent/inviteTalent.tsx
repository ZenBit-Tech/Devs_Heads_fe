import React, { FC, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useForm, Controller } from 'react-hook-form';
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
	Modal,
	Header,
	Content,
	Actions,
	Close,
} from './inviteTalent.styles';
import blackHeartIcon from 'assets/blackHeartIcon.svg';
import whiteHeartIcon from 'assets/whiteHeartIcon.svg';

const InviteTalent: FC = () => {
	const { t } = useTranslation();
	const [saveBool, setSaveBool] = useState(false);
	const [srcIcon, setSrcIcon] = useState(whiteHeartIcon);
	const { control } = useForm();

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
					<Popup
						trigger={<Invite type="button">{`${t('InvitePage.button')}`}</Invite>}
						modal
						nested
					>
						{(close: any) => {
							return (
								<Modal>
									<Close onClick={() => close(close)}>&times;</Close>
									<Header>{`${t('InvitePopup.title')}`}</Header>
									<Content>
										<Controller
											render={() => (
												<textarea defaultValue="I look for a freelancer to do this job" />
											)}
											name="text"
											control={control}
										/>
									</Content>
									<Actions>
										<Popup
											trigger={<button className="button"> Trigger </button>}
											position="top center"
											nested
										>
											<span>dropdown to choose the job and button to send the invitation</span>
										</Popup>
										<button
											onClick={() => {
												console.log('modal closed ');
												close(close);
											}}
										>
											{`${t('InvitePopup.button')}`}
										</button>
									</Actions>
								</Modal>
							);
						}}
					</Popup>
				</>
			))}
		</Container>
	);
};

export default InviteTalent;
