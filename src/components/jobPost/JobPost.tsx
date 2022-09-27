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
} from './JobPost.styles';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { useOnDataChange, selection } from 'components/jobPost/dataChanges';
import ValidationSchema from 'components/jobPost/validationSchema';
import { JobSubmitForm } from 'components/jobPost/interfaces';

const JobPost = () => {
	const { t } = useTranslation();
	const { skillsOptions, onSkillsChange, skills, onSubmit } = useOnDataChange();
	const [state] = useState({ data: { checked: `${t('JobPostPage.shortMonthDuration')}` } });
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<Title>{`${t('JobPostPage.title')}`}</Title>
					<input
						type="text"
						{...register('title')}
						className={`form-control ${errors.title ? 'is-invalid' : ''}`}
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
										defaultChecked={state.data.checked === '0-1 month'}
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
										value={'1-6 months'}
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

export default JobPost;
