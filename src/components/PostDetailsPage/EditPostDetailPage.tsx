import { useParams, useNavigate } from 'react-router-dom';
import { useGetJobsDetailQuery, useUpdateJobPostMutation } from 'service/httpService';
import { useTranslation } from 'react-i18next';
import {
	Container,
	Title,
	CreateButton,
	Column,
	Li,
	CurrencyColumn,
	P,
} from '../jobPost/JobPost.styles';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ValidationSchema from './validationSchema';
import { EditJobSubmitForm } from 'components/jobPost/interfaces';

const EditPostDetailPage: FC = () => {
	const [updatejobPost, {}] = useUpdateJobPostMutation();
	const { t } = useTranslation();
	const params = useParams();
	const { data: post } = useGetJobsDetailQuery(params.id);
	const postId = post.id;
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditJobSubmitForm>({
		resolver: yupResolver(ValidationSchema),
	});

	const onSubmit = async (data: EditJobSubmitForm) => {
		await updatejobPost({ data, postId });
		navigate(`/post-job/${params.id}`);
	};
	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<Title>{`${t('EditPostDetailPage.title')}`}</Title>
					<input
						type="text"
						{...register('jobTitle')}
						className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
						defaultValue={post.jobTitle}
					/>
					{errors.jobTitle && <P>{errors.jobTitle?.message}</P>}
				</div>
				<div>
					<Title>{`${t('JobPostPage.hourTitle')}`}</Title>
					<CurrencyColumn>
						<label>From</label>
						<div className="input-group-prepend">
							<span className="input-group-prepend input-group-text">$</span>
							<input
								type="number"
								{...register('fromHourRate')}
								className={`form-control ${errors.fromHourRate ? 'is-invalid' : ''}`}
								defaultValue={post.fromHourRate}
							/>
						</div>
						{errors.fromHourRate && <P>{`${t('JobPostPage.priceError')}`}</P>}
					</CurrencyColumn>
					<CurrencyColumn>
						<label>To</label>
						<div className="input-group-prepend">
							<span className="input-group-text">$</span>
							<input
								type="number"
								{...register('toHourRate')}
								className={`form-control ${errors.toHourRate ? 'is-invalid' : ''}`}
								defaultValue={post.toHourRate}
							/>
						</div>
						{errors.toHourRate && <P>{`${t('JobPostPage.priceError')}`}</P>}
					</CurrencyColumn>
				</div>
				<div>
					<Title>{`${t('JobPostPage.durationTitle')}`}</Title>
					<Column>
						<ul>
							<Li>{`${t('JobPostPage.shortDuration')}`}</Li>
							<Li>{`${t('JobPostPage.mediumDuration')}`}</Li>
							<Li>{`${t('JobPostPage.longDuration')}`}</Li>
						</ul>
					</Column>
					<Column>
						<div className="form-check">
							<label htmlFor={`${t('JobPostPage.shortMonthDuration')}`}>
								<input
									{...register('jobDuration')}
									className={`form-check-input`}
									type="radio"
									name="duration"
									value={'0-1 month'}
									defaultChecked={post.jobDuration === '0-1 month'}
								/>
								{`${t('JobPostPage.shortMonthDuration')}`}
							</label>
						</div>

						<div className="form-check">
							<label htmlFor={`${t('JobPostPage.mediumMonthDuration')}`}>
								<input
									{...register('jobDuration')}
									className={`form-check-input`}
									type="radio"
									name="duration"
									value={'1-6 month'}
									defaultChecked={post.jobDuration === '1-6 month'}
								/>
								{`${t('JobPostPage.mediumMonthDuration')}`}
							</label>
						</div>

						<div className="form-check">
							<label htmlFor={`${t('JobPostPage.longMonthDuration')}`}>
								<input
									{...register('jobDuration')}
									className={`form-check-input`}
									type="radio"
									name="duration"
									value={'6+ months'}
									defaultChecked={post.jobDuration === '6+ months'}
								/>
								{`${t('JobPostPage.longMonthDuration')}`}
							</label>
						</div>
					</Column>
				</div>
				<div>
					<Title>{`${t('EditPostDetailPage.descriptionTitle')}`}</Title>
					<textarea
						{...register('jobDescription')}
						className={`form-control ${errors.jobDescription ? 'is-invalid' : ''}`}
						defaultValue={post.jobDescription}
					/>
					{errors.jobDescription && <P>{errors.jobDescription?.message}</P>}
				</div>
				<div style={{ display: 'flex' }}>
					<CreateButton type="submit">{`${t('EditPostDetailPage.updateButton')}`}</CreateButton>
				</div>
			</form>
		</Container>
	);
};

export default EditPostDetailPage;
