import { useParams } from 'react-router-dom';
import { useGetJobsDetailQuery } from 'service/httpService';
import { useTranslation } from 'react-i18next';
import {
	Container,
	Title,
	CreateButton,
	Column,
	Li,
	CurrencyColumn,
	SkillsButtonsBlock,
	Label,
	Span,
	P,
} from '../jobPost/JobPost.styles';
import { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { useOnDataChange, selection } from 'components/jobPost/dataChanges';
import ValidationSchema from 'components/jobPost/validationSchema';
import { JobSubmitForm } from 'components/jobPost/interfaces';

const EditPostDetailPage: FC = () => {
	const { t } = useTranslation();
	const { skillsOptions, onSkillsChange, skills, handleUpdate } = useOnDataChange();
	const params = useParams();

	const { data: post } = useGetJobsDetailQuery(params.id);
	// console.log(post);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<JobSubmitForm>({
		resolver: yupResolver(ValidationSchema),
	});

	const optionButtons = useMemo(() => {
		return skillsOptions.map((e, i) => (
			<Label key={e.name} className={`btn btn-${e.value ? 'primary' : 'light'}`}>
				<input
					type="checkbox"
					checked={e.value}
					autoComplete="off"
					onChange={() => onSkillsChange(i)}
				/>
				{e.name}
			</Label>
		));
	}, [skillsOptions]);

	const [redColor, setRedColor] = useState(false);
	const [btn, setBtn] = useState(false);
	const onSkillsTrue = () => {
		setBtn(true);
	};

	useEffect(() => {
		if (skills.length < 3 && btn) {
			setRedColor(true);
		} else {
			setRedColor(false);
		}
	}, [skills, btn]);

	return (
		<Container>
			<form onSubmit={handleSubmit(handleUpdate)}>
				<div>
					<Title>{`${t('JobPostPage.title')}`}</Title>
					<input
						type="text"
						{...register('title')}
						className={`form-control ${errors.title ? 'is-invalid' : ''}`}
						value={post.jobTitle}
					/>
					{errors.title && <P>{errors.title?.message}</P>}
				</div>
				<Column>
					<Title>{`${t('JobPostPage.categoryTitle')}`}</Title>
					<Controller
						name="category"
						control={control}
						render={({ field }) => {
							return (
								<Select
									{...field}
									options={selection}
									className={`${errors.category ? 'is-invalid' : ''}`}
									defaultValue={selection.filter(({ value }) => value === post.jobCategory.name)}
								/>
							);
						}}
					/>
					{errors.category && <P>{errors.category.value?.message}</P>}
				</Column>
				<Column>
					<div>
						<Title>{`${t('JobPostPage.skillsTitle')}`}</Title>
						<Span value={redColor}>{`${t('JobPostPage.skillsError')}`}</Span>
						<SkillsButtonsBlock
							data-toggle="buttons"
							className="btn-group btn-group-toggle flex-wrap"
						>
							{optionButtons}
						</SkillsButtonsBlock>
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
									value={post.fromHourRate}
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
									value={post.toHourRate}
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
										{...register('duration')}
										className={`form-check-input`}
										type="radio"
										name="duration"
										value={'0-1 month'}
										checked={post.jobDuration === '0-1 month'}
									/>
									{`${t('JobPostPage.shortMonthDuration')}`}
								</label>
							</div>

							<div className="form-check">
								<label htmlFor={`${t('JobPostPage.mediumMonthDuration')}`}>
									<input
										{...register('duration')}
										className={`form-check-input`}
										type="radio"
										name="duration"
										value={'1-6 month'}
										checked={post.jobDuration === '1-6 month'}
									/>
									{`${t('JobPostPage.mediumMonthDuration')}`}
								</label>
							</div>

							<div className="form-check">
								<label htmlFor={`${t('JobPostPage.longMonthDuration')}`}>
									<input
										{...register('duration')}
										className={`form-check-input`}
										type="radio"
										name="duration"
										value={'6+ months'}
										checked={post.jobDuration === '6+ months'}
									/>
									{`${t('JobPostPage.longMonthDuration')}`}
								</label>
							</div>
						</Column>
					</div>
				</Column>
				<div>
					<Title>{`${t('JobPostPage.descriptionTitle')}`}</Title>
					<textarea
						{...register('description')}
						className={`form-control ${errors.description ? 'is-invalid' : ''}`}
						defaultValue={post.jobDescription}
					/>
					{errors.description && <P>{errors.description?.message}</P>}
				</div>
				<div style={{ display: 'flex' }}>
					<CreateButton type="submit" onClick={onSkillsTrue}>
						{`${t('JobPostPage.buttonTitle')}`}
					</CreateButton>
				</div>
			</form>
		</Container>
	);
};

export default EditPostDetailPage;
