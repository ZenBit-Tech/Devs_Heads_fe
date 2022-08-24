import { useTranslation } from 'react-i18next';
import {
	Container,
	Title,
	StyledTextarea,
	Category,
	SkillsButtonsBlock,
	SkillButton,
	CreateButton,
	Column,
	Li,
	CurrencyColumn,
} from './JobPost.styles';
import { useOnDataChange } from './hooks/dataChanges';
import { Alert } from 'antd';
import { useMemo } from 'react';
import CurrencyInput from 'components/jobPost/components/CurrencyInput';
import RadioBox from 'components/jobPost/components/RadioBox';

const JobPost = () => {
	const {
		skillsOptions,
		onSkillsChange,
		title,
		onTitleChange,
		category,
		onCategoryChange,
		duration,
		onDurationChange,
		description,
		onDescriptionChange,
		categoryOptions,
		titleError,
		descriptionError,
		fromHourRate,
		fromHourRateError,
		onFromHourRateChange,
		toHourRate,
		toHourRateError,
		onToHourRateChange,
		onSubmitErrors,
		onSubmit,
	} = useOnDataChange();

	const { t } = useTranslation();

	const optionButtons = useMemo(() => {
		return skillsOptions.map((e, i) => (
			<SkillButton key={e.label} selected={e.value} onClick={() => onSkillsChange(i)}>
				{e.label}
			</SkillButton>
		));
	}, [skillsOptions]);

	return (
		<Container>
			<div>
				<Title>{`${t('JobPostPage.title')}`}</Title>
				<StyledTextarea onChange={onTitleChange} value={title} height="50px" width="40%" />
				{titleError && (
					<Alert message={`${t('JobPostPage.titleAlert')}`} type="error" showIcon closable />
				)}
				{onSubmitErrors.titleError && (
					<Alert message={`${t('JobPostPage.fieldIsRequired')}`} type="warning" showIcon closable />
				)}
			</div>
			<Column>
				<Category>
					<Title>{`${t('JobPostPage.categoryTitle')}`}</Title>
					<select onChange={onCategoryChange} value={category}>
						{categoryOptions.map(o => {
							return <option key={o.id}>{o.value}</option>;
						})}
					</select>
				</Category>
			</Column>
			<Column>
				<div>
					<Title>{`${t('JobPostPage.skillsTitle')}`}</Title>
					<span>{`${t('JobPostPage.skillsSubTitle')}`}</span>
					<SkillsButtonsBlock>{optionButtons}</SkillsButtonsBlock>
					{onSubmitErrors.skillsError && (
						<Alert message={`${t('JobPostPage.skillsWarning')}`} type="warning" showIcon closable />
					)}
				</div>
				<div>
					<Title>{`${t('JobPostPage.HoutlyRateTitle')}`}</Title>
					<CurrencyColumn>
						<CurrencyInput
							label={`${t('JobPostPage.from')}`}
							onChange={onFromHourRateChange}
							value={fromHourRate}
						/>
						{fromHourRateError && (
							<Alert message={`${t('JobPostPage.priceError')}`} type="error" showIcon closable />
						)}
						{onSubmitErrors.fromHourRateError && (
							<Alert
								message={`${t('JobPostPage.fieldIsRequired')}`}
								type="warning"
								showIcon
								closable
							/>
						)}
					</CurrencyColumn>
					<CurrencyColumn>
						<CurrencyInput
							label={`${t('JobPostPage.to')}`}
							onChange={onToHourRateChange}
							value={toHourRate}
						/>
						{toHourRateError && (
							<Alert message={`${t('JobPostPage.priceError')}`} type="error" showIcon closable />
						)}
						{onSubmitErrors.toHourRateError && (
							<Alert
								message={`${t('JobPostPage.fieldIsRequired')}`}
								type="warning"
								showIcon
								closable
							/>
						)}
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
						<RadioBox onChange={onDurationChange} value={duration} />
					</Column>
				</div>
			</Column>
			<div>
				<Title>{`${t('JobPostPage.descriptionTitle')}`}</Title>
				<StyledTextarea
					onChange={onDescriptionChange}
					value={description}
					height="150px"
					width="90%"
					placeholder={`${t('JobPostPage.descriptionPlaceholder')}`}
				/>
				{descriptionError && (
					<Alert
						message={`${t('JobPostPage.descriptionPlaceholder')}`}
						type="warning"
						showIcon
						closable
					/>
				)}
				{onSubmitErrors.descriptionError && (
					<Alert message={`${t('JobPostPage.fieldIsRequired')}`} type="warning" showIcon closable />
				)}
			</div>
			<div style={{ display: 'flex' }}>
				<CreateButton onClick={onSubmit}>{`${t('JobPostPage.buttonTitle')}`}</CreateButton>
			</div>
		</Container>
	);
};

export default JobPost;
