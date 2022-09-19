import React from 'react';
import Popup from 'reactjs-popup';
import { useForm, Controller } from 'react-hook-form';
import { ReactI18NextChild, useTranslation } from 'react-i18next';
import {
	Actions,
	Close,
	Content,
	Header,
	JobPost,
	Modal,
	SendMessage,
	Select,
} from 'components/inviteTalent/inviteTalent.styles';
import { BLUE } from 'constants/colors';
import TextArea from 'antd/lib/input/TextArea';
import { RoleSelection } from 'constants/routes';
import { useNavigate } from 'react-router-dom';

interface IPost {
	jobTitle: string;
	jobDescription: string;
}

interface IProps {
	Context: {
		isDisabled: boolean;
		setIsDisabled: (disabled: boolean) => void;
		open: boolean;
		setOpen: (open: boolean) => void;
		post: IPost[];
		handleSelect: () => ReactI18NextChild | Iterable<ReactI18NextChild>;
	};
}

const TEXTAREA_ROWS_MAX = 16;
const TEXTAREA_ROWS_MIN = 8;
const BORDER_RADIUS = 6;

const InvitePopup = (props: IProps) => {
	const { isDisabled, setIsDisabled, open, setOpen, post, handleSelect } = props.Context;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { control } = useForm();

	const handleDisable = () => {
		if (!isDisabled) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	};

	return (
		<div>
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
									render={() => (
										<TextArea
											autoSize={{ minRows: TEXTAREA_ROWS_MIN, maxRows: TEXTAREA_ROWS_MAX }}
											style={{ borderRadius: BORDER_RADIUS }}
											defaultValue={`${t('InvitePopup.message')}`}
										/>
									)}
									name="text"
									control={control}
								/>
							</Content>
							<Actions>
								<Select>{handleSelect()}</Select>
								<SendMessage
									onClick={() => handleDisable()}
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
		</div>
	);
};

export default InvitePopup;
