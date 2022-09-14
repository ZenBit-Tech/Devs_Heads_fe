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
	TextArea,
	Actions,
	SendMessage,
	Close,
	Select,
	JobPost,
} from './inviteTalent.styles';
import blackHeartIcon from 'assets/blackHeartIcon.svg';
import whiteHeartIcon from 'assets/whiteHeartIcon.svg';
import { useGetJobPostsQuery, useGetPostJobQuery } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { BLUE } from 'constants/colors';
import { useNavigate } from 'react-router-dom';
import { RoleSelection } from 'constants/routes';

interface IPost {
	jobTitle: string;
	jobDescription: string;
}

const InviteTalent: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [isDisebled, setIsDisebled] = useState(false);
	const [saveBool, setSaveBool] = useState(false);
	const [srcIcon, setSrcIcon] = useState(whiteHeartIcon);
	const { user } = useAppSelector<RootState>(state => state);
	const { data: post = [] } = useGetPostJobQuery(user.id);
	const { data: posts } = useGetJobPostsQuery(user.role);
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

	const handleDisable = () => {
		if (!isDisebled) {
			setIsDisebled(true);
		} else {
			setIsDisebled(false);
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
			<Invite type="button" onClick={() => setOpen(true)}>{`${t('InvitePage.button')}`}</Invite>
			{post ? (
				<Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
					{open ? (
						<Modal>
							<Close type="button" onClick={() => setOpen(false)}>
								&times;
							</Close>
							<Header>{`${t('InvitePopup.title')}`}</Header>
							<Content>
								{`${t('InvitePopup.label')}`}
								<Controller
									render={() => <TextArea defaultValue={`${t('InvitePopup.message')}`} />}
									name="text"
									control={control}
								/>
							</Content>
							<Actions>
								<Select>
									{post?.map((el: IPost) => (
										<option>{el.jobTitle}</option>
									))}
								</Select>
								<SendMessage
									onClick={() => handleDisable()}
									className={isDisebled ? 'btn btn-sucess' : BLUE}
									disabled={isDisebled}
								>
									{`${t('InvitePopup.button')}`}
								</SendMessage>
							</Actions>
						</Modal>
					) : null}
				</Popup>
			) : (
				<Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
					{open ? (
						<Modal>
							<Close type="button" onClick={() => setOpen(false)}>
								&times;
							</Close>
							<Header>{`${t('InvitePopup.noJobs')}`}</Header>
							<Actions>
								<JobPost type="button" onClick={() => navigate(`${RoleSelection}`)}>{`${t(
									'InvitePopup.buttonPost',
								)}`}</JobPost>
							</Actions>
						</Modal>
					) : null}
				</Popup>
			)}
		</Container>
	);
};

export default InviteTalent;
