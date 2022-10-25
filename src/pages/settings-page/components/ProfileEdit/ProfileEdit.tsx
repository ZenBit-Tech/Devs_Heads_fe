import React, { useMemo } from 'react';
import { Radio } from 'antd';
import { TextareaWithDates } from './components/TextareaWithDates';
import { useOnDataChange } from './hooks/use-on-data-change';
import { Image, Alert } from 'antd';
import { useTranslation } from 'react-i18next';
import { defaultProfilePhoto } from 'constants/links';
import {
	Container,
	Title,
	Block,
	SkillsButtonsBlock,
	SkillButton,
	SaveButton,
	Position,
	Category,
	ProfilePhoto,
	StyledTextarea,
} from './ProfileEdit.styles';

export const ProfileEdit = () => {
	const {
		skillsOptions,
		onSkillsChange,
		textAreaWithDatesState,
		onChangeTextareaWithDates,
		addField,
		englishOption,
		onEnglishOptionChange,
		position,
		onPositionChange,
		category,
		onCategoryChange,
		onPriceChange,
		price,
		description,
		onDescriptionChange,
		onChangePhotoHandler,
		file64,
		categoryOptions,
		onPhotoDelete,
		positionError,
		descriptionError,
		priceError,
		onSubmitErrors,
		onSubmit,
	} = useOnDataChange();

	const { t } = useTranslation();

	const englishOptions = [
		{ label: t('ProfileEdit.englishLevelLabels.preIntermediate'), value: 'Pre_intermediate' },
		{ label: t('ProfileEdit.englishLevelLabels.intermediate'), value: 'Intermediate' },
		{ label: t('ProfileEdit.englishLevelLabels.upperIntermediate'), value: 'Upper_intermediate' },
	];

	const optionButtons = useMemo(() => {
		return skillsOptions.map((e, i) => (
			<SkillButton key={e.label} selected={e.value} onClick={() => onSkillsChange(i)}>
				{e.label}
			</SkillButton>
		));
	}, [skillsOptions]);

	return (
		<Container>
			<Block>
				<ProfilePhoto>
					<Title>{`${t('ProfileEdit.profilePhotoTitle')}`}</Title>
					<p>{`${t('ProfileEdit.profilePhotowarning')}`}</p>
					<Image width={200} src={file64 || defaultProfilePhoto} />
					<input type={'file'} accept=".png, .jpg, .jpeg" onChange={onChangePhotoHandler} />
					<button onClick={onPhotoDelete}>{`${t('ProfileEdit.deletePhotoButton')}`}</button>
				</ProfilePhoto>
				<div>
					<Position>
						<Title>{`${t('ProfileEdit.positionTitle')}`}</Title>
						<input value={position} onChange={onPositionChange} />
						{positionError && (
							<Alert
								message={`${t('ProfileEdit.positionAlert')}`}
								type="warning"
								showIcon
								closable
							/>
						)}
						{onSubmitErrors.positionError && (
							<Alert
								message={`${t('ProfileEdit.fieldIsRequired')}`}
								type="warning"
								showIcon
								closable
							/>
						)}
					</Position>
					<Category>
						<Title>{`${t('ProfileEdit.categoryTitle')}`}</Title>
						<select onChange={onCategoryChange} value={category}>
							{categoryOptions.map(o => {
								return <option key={o.id}>{o.value}</option>;
							})}
						</select>
					</Category>
					<div>
						<Title>{`${t('ProfileEdit.priceTitle')}`}</Title>
						<input onChange={onPriceChange} value={price === 0 ? undefined : price} type="number" />
						<span>$</span>
						{priceError && (
							<Alert message={`${t('ProfileEdit.priceAlert')}`} type="warning" showIcon closable />
						)}
						{onSubmitErrors.priceError && (
							<Alert
								message={`${t('ProfileEdit.fieldIsRequired')}`}
								type="warning"
								showIcon
								closable
							/>
						)}
					</div>
				</div>
			</Block>
			<div>
				<Title>{`${t('ProfileEdit.skillsTitle')}`}</Title>
				<span>{`${t('ProfileEdit.skillsSubTitle')}`}</span>
				<SkillsButtonsBlock>{optionButtons}</SkillsButtonsBlock>
				{onSubmitErrors.skillsError && (
					<Alert message={`${t('ProfileEdit.skillsSubTitle')}`} type="warning" showIcon closable />
				)}
			</div>
			<div>
				<Title>{`${t('ProfileEdit.englishLevelTitle')}`}</Title>
				<Radio.Group
					onChange={onEnglishOptionChange}
					value={englishOption}
					optionType="button"
					buttonStyle="solid"
					size="large"
					options={englishOptions}
				/>
			</div>
			<div>
				<Title>{`${t('ProfileEdit.descriptionTitle')}`}</Title>
				<StyledTextarea
					onChange={onDescriptionChange}
					value={description}
					height="150px"
					placeholder={`${t('ProfileEdit.descriptionPlaceholder')}`}
				/>
				{descriptionError && (
					<Alert
						style={{ width: '500px' }}
						message={`${t('ProfileEdit.descriptionPlaceholder')}`}
						type="warning"
						showIcon
						closable
					/>
				)}
				{onSubmitErrors.descriptionError && (
					<Alert message={`${t('ProfileEdit.fieldIsRequired')}`} type="warning" showIcon closable />
				)}
			</div>
			<div>
				<Title>{`${t('ProfileEdit.educationTitle')}`}</Title>
				{textAreaWithDatesState['education'].map((e, i) => (
					<TextareaWithDates
						objectKey={'education'}
						key={i}
						index={i}
						item={e}
						onChange={onChangeTextareaWithDates}
					/>
				))}
				{onSubmitErrors.educationError && (
					<Alert message={`${t('ProfileEdit.fieldIsRequired')}`} type="warning" showIcon closable />
				)}
				<button onClick={() => addField('education')}>{`${t(
					'ProfileEdit.addEducationButton',
				)}`}</button>
			</div>
			<div>
				<Title>{`${t('ProfileEdit.experienceTitle')}`}</Title>
				{textAreaWithDatesState['experience'].map((e, i) => (
					<TextareaWithDates
						objectKey={'experience'}
						key={i}
						index={i}
						item={e}
						onChange={onChangeTextareaWithDates}
					/>
				))}
				{onSubmitErrors.experienceError && (
					<Alert message={`${t('ProfileEdit.fieldIsRequired')}`} type="warning" showIcon closable />
				)}
				<button onClick={() => addField('experience')}>{`${t(
					'ProfileEdit.addExperienceButton',
				)}`}</button>
			</div>
			<div style={{ display: 'flex' }}>
				<SaveButton onClick={onSubmit}>{`${t('ProfileEdit.saveButton')}`}</SaveButton>
			</div>
		</Container>
	);
};
