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
} from './JobPost.styles';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Select from 'react-select';
import { notification } from 'antd';
import { useOnDataChange } from 'components/jobPost/hooks/dataChanges';

type JobSubmitForm = {
	title: string;
	category: { label: string; value: string };
	fromHourRate: number;
	toHourRate: number;
	description: string;
	duration: string;
};

const JobPost = () => {
	const { t } = useTranslation();

	const { skillsOptions, onSkillsChange, filteredSkills } = useOnDataChange();

	const validationSchema = Yup.object().shape({
		title: Yup.string()
			.required(`${t('JobPostPage.fieldIsRequired')}`)
			.min(6, `${t('JobPostPage.lengthWarning')}`)
			.max(50, `${t('JobPostPage.titleError')}`),
		category: Yup.object().shape({
			label: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
			value: Yup.string().required(),
		}),
		description: Yup.string()
			.required(`${t('JobPostPage.fieldIsRequired')}`)
			.min(6, `${t('JobPostPage.lengthWarning')}`)
			.max(5000, `${t('JobPostPage.titleError')}`),
		fromHourRate: Yup.number()
			.required(`${t('JobPostPage.fieldIsRequired')}`)
			.positive(),
		toHourRate: Yup.number()
			.required(`${t('JobPostPage.fieldIsRequired')}`)
			.positive(),
		duration: Yup.string().required(`${t('JobPostPage.fieldIsRequired')}`),
	});

	const [state] = useState({ data: { checked: `${t('JobPostPage.shortMonthDuration')}` } });
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<JobSubmitForm>({
		resolver: yupResolver(validationSchema),
	});

	type NotificationType = 'success' | 'error';
	const openNotificationWithIcon = (type: NotificationType) => {
		notification[type]({
			message: type === 'success' && `${t('JobPostPage.success')}`,
			description: type === 'success' && `${t('JobPostPage.dataHasBeenSaved')}`,
		});
	};

	const onSubmit = (data: JobSubmitForm) => {
		console.log(JSON.stringify(data, null, 2));
		openNotificationWithIcon('success');
	};

	const optionButtons = useMemo(() => {
		return skillsOptions.map(e => (
			<Label key={e.id} className={`btn btn-${e.value ? 'primary' : 'light'}`}>
				<input
					type="checkbox"
					checked={e.value}
					autoComplete="off"
					onChange={() => onSkillsChange(e.id)}
				/>
				{e.label}
			</Label>
		));
	}, [skillsOptions]);

	const [redColor, setRedColor] = useState(false);
	const onSkillsTrue = () => {
		if (filteredSkills.length < 3) {
			setRedColor(true);
		} else {
			setRedColor(false);
		}
	};

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
					<div className="invalid-feedback">{errors.title?.message}</div>
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
									options={[
										{ value: 'Legal', label: 'Legal' },
										{ value: 'IT', label: 'IT' },
										{ value: 'Sales', label: 'Sales' },
										{ value: 'Finance', label: 'Finance' },
										{ value: 'Construction', label: 'Construction' },
										{ value: 'Accounting', label: 'Accounting' },
										{ value: 'Design', label: 'Design' },
										{ value: 'Security', label: 'Security' },
										{ value: 'Healthcare', label: 'Healthcare' },
										{ value: 'Marketing', label: 'Marketing' },
									]}
									className={`${errors.category ? 'is-invalid' : ''}`}
								/>
							);
						}}
					/>
					{errors.category && (
						<div className="invalid-feedback">{errors.category.label?.message}</div>
					)}
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
						<Title>{`${t('JobPostPage.HoutlyRateTitle')}`}</Title>
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
										value={`${t('JobPostPage.shortMonthDuration')}`}
										defaultChecked={state.data.checked === `${t('JobPostPage.shortMonthDuration')}`}
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
										value={`${t('JobPostPage.mediumMonthDuration')}`}
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
										value={`${t('JobPostPage.longMonthDuration')}`}
									/>
									{`${t('JobPostPage.longMonthDuration')}`}
								</label>
							</div>
						</Column>
					</div>
				</Column>
				<div>
					<Title>{`${t('JobPostPage.descriptionTitle')}`}</Title>
					<input
						type="text"
						{...register('description')}
						className={`form-control ${errors.description ? 'is-invalid' : ''}`}
					/>
					<div className="invalid-feedback">{errors.description?.message}</div>
				</div>
				<div style={{ display: 'flex' }}>
					<CreateButton type="submit" onClick={onSkillsTrue}>{`${t(
						'JobPostPage.buttonTitle',
					)}`}</CreateButton>
				</div>
			</form>
		</Container>
	);
};

export default JobPost;
