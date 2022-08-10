import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import { TextareaWithDates } from './components/TextareaWithDates';
import { useOnDataChange } from './hooks/use-on-data-change';
import { Image, Alert } from 'antd';

//Styles
const Container = styled.div`
  border: 1px solid black;
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
const Price = styled.div``;

const Skills = styled.div``;

const SkillsButtonsBlock = styled.div`
  max-width: 840px;
`;
const SkillButton = styled.button<{ selected: boolean }>`
  width: 200px;
  border-radius: 10px;
  margin: 5px;
  height: 30px;
  background-color: ${props => (props.selected ? 'dodgerblue' : '')};
  color: ${props => (props.selected ? 'white' : '')};
`;
const EnglishLevel = styled.div``;

const StyledTextarea = styled.textarea<{ height: string }>`
  width: 500px;
  height: ${props => props.height};
  resize: none;
`;

const SaveButton = styled.button`
  width: 140px;
  height: 50px;
  border-radius: 10px;
  background-color: #5db501;
  color: white;
  margin: 0 auto;
  border-color: white;
`;
const Block = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
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
          <span>Profile photo</span>
          <Image
            width={200}
            src={
              file64?.toString() ||
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
          />
          <input type={'file'} onChange={onChangePhotoHandler} />
          <button onClick={onPhotoDelete}>Delete photo</button>
        </ProfilePhoto>
        <div>
          <Position>
            <h2>Position</h2>
            <input value={position} onChange={onPositionChange} />
            {positionError && (
              <Alert message="Maximum length is 25 symbols" type="warning" showIcon closable />
            )}
          </Position>
          <Category>
            <h2>Category</h2>
            <select onChange={onCategoryChange} value={category}>
              {categoryOptions.map(o => {
                return <option key={o.id}>{o.value}</option>;
              })}
            </select>
          </Category>
          <Price>
            <h2>Price</h2>
            <input onChange={onPriceChange} value={price} type="number" />
            <span>$</span>
          </Price>
        </div>
      </Block>
      <Skills>
        <h2>Skills</h2>
        <span>You must mark at least 3 skills</span>
        <SkillsButtonsBlock>{optionButtons}</SkillsButtonsBlock>
      </Skills>
      <EnglishLevel>
        <h2>English level</h2>
        <Radio.Group
          onChange={onEnglishOptionChange}
          value={englishOption}
          optionType="button"
          buttonStyle="solid"
          size="large"
          options={englishOptions}
        />
      </EnglishLevel>
      <div>
        <h2>Description</h2>
        <StyledTextarea
          onChange={onDescriptionChange}
          value={description}
          height="150px"
          placeholder="Maximum text length <200 characters"
        />
        {descriptionError && (
          <Alert
            style={{ width: '500px' }}
            message="Maximum length is 200 symbols"
            type="warning"
            showIcon
            closable
          />
        )}
      </div>
      <div>
        <h2>Education</h2>
        {textAreaWithDatesState['education'].map((e, i) => (
          <TextareaWithDates
            objectKey={'education'}
            key={i}
            index={i}
            item={e}
            onChange={onChangeTextareaWithDates}
          />
        ))}
        <button onClick={() => addField('education')}>+ Add education</button>
      </div>
      <div>
        <h2>Experience</h2>
        {textAreaWithDatesState['experience'].map((e, i) => (
          <TextareaWithDates
            objectKey={'experience'}
            key={i}
            index={i}
            item={e}
            onChange={onChangeTextareaWithDates}
          />
        ))}
        <button onClick={() => addField('experience')}>+ Add experience</button>
      </div>
      <div style={{ display: 'flex' }}>
        <SaveButton>Save changes</SaveButton>
      </div>
    </Container>
  );
};
