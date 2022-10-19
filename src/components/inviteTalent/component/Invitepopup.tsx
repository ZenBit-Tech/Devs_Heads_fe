import React from 'react';
import Popup from 'reactjs-popup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	Actions,
	Close,
	Content,
	Header,
	JobPost,
	Modal,
	SendMessage,
	Select,
	JobPopup,
	ClosePopup,
	Span,
} from 'components/inviteTalent/inviteTalent.styles';
import { BLUE } from 'constants/colors';
import TextArea from 'antd/lib/input/TextArea';
import { CreateJobPost } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import {
	usePostInvitationMutation,
	useCreateRoomMutation,
	usePostMessageMutation,
} from 'service/httpService';
import { IMessage, IProps, Alert } from 'components/inviteTalent/interfaces';
import { notification } from 'antd';
import { ALERT_SUCCESS } from 'constants/links';

const TEXTAREA_ROWS_MAX = 16;
const TEXTAREA_ROWS_MIN = 8;
const BORDER_RADIUS = 6;

const InvitePopup = (props: IProps) => {
	const {
		isDisabled,
		setIsDisabled,
		open,
		setOpen,
		post,
		handleSelect,
		data,
		defaultTitle,
		clientInfos,
	} = props.Context;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [postInvitation] = usePostInvitationMutation();
	const [createRoom] = useCreateRoomMutation();
	const [sendMessage] = usePostMessageMutation();
	const { control, handleSubmit } = useForm<IMessage>();

	const alert = (type: Alert) => {
		notification[type]({
			message: type === ALERT_SUCCESS ? `${t('InvitePopup.success')}` : `${t('InvitePopup.error')}`,
		});
	};

	const onSubmit: SubmitHandler<IMessage> = async (payload: IMessage) => {
		const { message, jobTitle } = payload;
		const { userId, id } = data.profile;
		const { clientId, jobPostId } = clientInfos;

		if (isDisabled) {
			setIsDisabled(false);
		} else {
			if (message && jobTitle) {
				await postInvitation({
					message,
					clientId,
					freelancerId: userId,
					profileId: id,
					jobPostId,
					jobTitle,
				}).unwrap();
				setOpen(false);
				alert('success');
				setIsDisabled(true);
				const room = await createRoom({
					jobPostId: jobPostId,
					senderId: clientId,
					receiverId: userId,
				}).unwrap();
				const chatRoomId = room?.id;
				await sendMessage({
					chatRoomId,
					text: message,
					jobLink: `/post-job/${jobPostId}`,
					userId: clientId,
				});
				setOpen(false);
			} else {
				alert('error');
			}
		}
	};

	return (
		<div>
			{post && post.length !== 0 ? (
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
									render={({ field }) => (
										<TextArea
											{...field}
											autoSize={{ minRows: TEXTAREA_ROWS_MIN, maxRows: TEXTAREA_ROWS_MAX }}
											style={{ borderRadius: BORDER_RADIUS, marginTop: 10, width: 500 }}
											defaultValue={`${t('InvitePopup.message')}`}
										/>
									)}
									name="message"
									control={control}
									defaultValue={`${t('InvitePopup.message')}`}
								/>
							</Content>
							<Actions>
								<Controller
									render={({ field }) => <Select {...field}>{handleSelect()}</Select>}
									name="jobTitle"
									control={control}
									defaultValue={`${defaultTitle.jobTitle}`}
								/>
								<SendMessage
									onClick={handleSubmit(onSubmit)}
									className={isDisabled ? 'btn btn-sucess' : BLUE}
									disabled={isDisabled}
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
						<JobPopup>
							<ClosePopup type="button" onClick={() => setOpen(false)}>
								&times;
							</ClosePopup>
							<Span>{`${t('InvitePopup.noJobs')}`}</Span>
							<Actions>
								<JobPost type="button" onClick={() => navigate(`${CreateJobPost}`)}>{`${t(
									'InvitePopup.buttonPost',
								)}`}</JobPost>
							</Actions>
						</JobPopup>
					) : null}
				</Popup>
			)}
		</div>
	);
};

export default InvitePopup;
