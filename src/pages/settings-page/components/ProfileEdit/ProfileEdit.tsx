import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import { TextareaWithDates } from './components/TextareaWithDates';
import { useOnDataChange } from './hooks/use-on-data-change';
import { Image, Alert } from 'antd';
import { useTranslation } from 'react-i18next';

const colors = {
  black: 'black',
  dodgerblue: 'dodgerblue',
  white: 'white',
  green: '#5db501',
  default: '',
};
const defaultPhoto = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const Container = styled.div`
  border: 1px solid ${colors.black};
  padding: 5px;
`;

const ProfilePhoto = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  & > button {
    width: 100px;
  }

  & > span {
    font-size: 24px;
  }
`;

const Position = styled.div`
  & > input {
    width: 500px;
  }
`;

const Category = styled.div`
  & > select {
    width: 500px;
  }
`;

const SkillsButtonsBlock = styled.div`
  max-width: 840px;
`;
const SkillButton = styled.button<{ selected: boolean }>`
  width: 200px;
  border-radius: 10px;
  margin: 5px;
  height: 30px;
  background-color: ${props => (props.selected ? colors.dodgerblue : colors.default)};
  color: ${props => (props.selected ? colors.white : colors.default)};
`;

const StyledTextarea = styled.textarea<{ height: string }>`
  width: 500px;
  height: ${props => props.height};
  resize: none;
`;

const SaveButton = styled.button`
  width: 140px;
  height: 50px;
  border-radius: 10px;
  background-color: ${colors.green};
  color: ${colors.white};
  border-color: ${colors.white};
  margin: 0 auto;
`;
const Block = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 20px;
  margin-top: 15px;
`;

export const ProfileEdit = () => {
  const {
    skillsOptions,
    onSkillsChange,
    textAreaWithDatesState,
    onChangeTextareaWithDates,
    addField,
    englishOption,
    englishOptions,
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
      <Block>
        <ProfilePhoto>
          <Title>{`${t('ProfileEdit.profilePhotoTitle')}`}</Title>
          <Image width={200} src={file64?.toString() || defaultPhoto} />
          <input type={'file'} onChange={onChangePhotoHandler} />
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
            <input onChange={onPriceChange} value={price} type="number" />
            <span>$</span>
          </div>
        </div>
      </Block>
      <div>
        <Title>{`${t('ProfileEdit.skillsTitle')}`}</Title>
        <span>{`${t('ProfileEdit.skillsSubTitle')}`}</span>
        <SkillsButtonsBlock>{optionButtons}</SkillsButtonsBlock>
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
        <button onClick={() => addField('experience')}>{`${t(
          'ProfileEdit.addExperienceButton',
        )}`}</button>
      </div>
      <div style={{ display: 'flex' }}>
        <SaveButton>{`${t('ProfileEdit.saveButton')}`}</SaveButton>
      </div>
    </Container>
  );
};
