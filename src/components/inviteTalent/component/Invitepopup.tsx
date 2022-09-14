import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	Actions,
	Close,
	Content,
	Header,
	Modal,
	Select,
	SendMessage,
} from 'components/inviteTalent/inviteTalent.styles';
import { useGetPostJobQuery } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { BLUE } from 'constants/colors';
import TextArea from 'antd/lib/input/TextArea';

interface IPost {
	jobTitle: string;
	jobDescription: string;
}

const TEXTAREA_ROWS_MAX = 16;
const TEXTAREA_ROWS_MIN = 8;
const BORDER_RADIUS = 6;

const InvitePopup = (open: any, setOpen: any) => {
	const { t } = useTranslation();
	const [isDisebled, setIsDisebled] = useState(false);
	const { user } = useAppSelector<RootState>(state => state);
	const { data: post = [] } = useGetPostJobQuery(user.id);
	const { control } = useForm();

	const handleDisable = () => {
		if (!isDisebled) {
			setIsDisebled(true);
		} else {
			setIsDisebled(false);
		}
	};

	return (
		<div>
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
		</div>
	);
};

export default InvitePopup;
