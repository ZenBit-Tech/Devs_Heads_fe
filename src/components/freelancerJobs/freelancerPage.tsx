import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useGetJobPostsQuery } from 'service/httpService';
import {
	TitleStyled,
	DescriptionDataStyled,
	ColumnSmall,
	ColumnBig,
	FilterLabel,
	SkillsLabel,
	SkillsButtonsBlock,
	ClearBtn,
	CategoryDiv,
	SearchInput,
	CustomSelect,
	P,
	Li,
	CheckLabel,
	Span,
	Column,
	Label,
} from 'components/freelancerJobs/freelancerPage.styles';
import {
	Category,
	checkList,
	IPost,
	ISkill,
	selection,
	skillsMock,
} from 'components/freelancerJobs/changes';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const FreelancerPage: FC = () => {
	const { t } = useTranslation();
	const { user } = useAppSelector<RootState>(state => state);
	const { data: posts } = useGetJobPostsQuery(user.id);

	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsMock);
	const filteredSkills = skillsOptions.filter(s => s.value);

	const skills = filteredSkills.map(skill => {
		return skill.name;
	});

	const onSkillsChange = (index: number) => {
		setSkillsOptions(prevState => {
			return prevState.map((e, i) => {
				if (index === i) {
					return { ...e, value: !e.value };
				}
				return e;
			});
		});
	};

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

	const intitialState = {
		value: '',
		label: '',
	};

	const [slider, setSlider] = useState([0, 10000]);
	const [search, setSearch]: [string, (search: string) => void] = useState('');
	const [userChoice, setUserChoice] = useState(intitialState);
	const [radio, setRadio] = useState('');

	const rangeSelector = (event: React.ChangeEvent<unknown>, newValue: number | number[]) => {
		setSlider(newValue as number[]);
	};

	useEffect(() => {
		setUserChoice(userChoice);
	}, [userChoice]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRadio(event.target.value);
	};

	const ClearFilters = () => {
		setSearch('');
		setUserChoice(intitialState);
		setSlider([0, 10000]);
		setSkillsOptions(skillsMock);
		setRadio('');
	};

	return (
		<>
			{posts?.length > 0 && (
				<>
					<ColumnSmall>
						<div>
							<FilterLabel>{`${t('FreelancerPage.filter')}`}</FilterLabel>
						</div>
						<div>
							<SkillsLabel>{`${t('FreelancerPage.skills')}`}</SkillsLabel>
						</div>
						<div>
							<SkillsButtonsBlock
								data-toggle="buttons"
								className="btn-group btn-group-toggle flex-wrap"
							>
								{optionButtons}
							</SkillsButtonsBlock>
						</div>
						<CategoryDiv>
							<CustomSelect
								options={selection || ''}
								onChange={choice => setUserChoice(choice as Category)}
							/>
						</CategoryDiv>
						<div>
							<SkillsLabel>{`${t('FreelancerPage.price')}`}</SkillsLabel>
							<P>
								${slider[0]}-{slider[1]}
							</P>
							<Typography id="range-slider" gutterBottom></Typography>
							<Slider
								value={slider}
								onChange={rangeSelector}
								valueLabelDisplay="auto"
								min={0}
								max={10000}
							/>
						</div>
						<div>
							<Column>
								<ul>
									<Li>{`${t('JobPostPage.shortDuration')}`}</Li>
									<Li>{`${t('JobPostPage.mediumDuration')}`}</Li>
									<Li>{`${t('JobPostPage.longDuration')}`}</Li>
								</ul>
							</Column>
							<Column>
								<CheckLabel>
									{checkList.map((item: string, index: number) => (
										<div key={index}>
											<input value={item} type="radio" name="gender" onChange={handleChange} />
											<Span>{item}</Span>
										</div>
									))}
								</CheckLabel>
							</Column>
						</div>
					</ColumnSmall>
					<ColumnBig>
						<SearchInput
							type="text"
							placeholder={`${t('FreelancerPage.search')}`}
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<ClearBtn onClick={ClearFilters}>{`${t('FreelancerPage.clear')}`}</ClearBtn>
						<ul>
							{posts
								.filter((post: IPost) => {
									if (search === '') {
										return post;
									} else if (post.jobTitle.toLowerCase().includes(search.toLowerCase())) {
										return post;
									} else if (post.jobDescription.toLowerCase().includes(search.toLowerCase())) {
										return post;
									}
								})
								.filter((post: IPost) => {
									const skill = post.jobSkills.map(skill => {
										return skill.name;
									});
									if (
										post.jobCategory.name === userChoice.label &&
										slider[0] <= post.fromHourRate &&
										slider[1] >= post.fromHourRate &&
										JSON.stringify(radio) === JSON.stringify(post.jobDuration) &&
										JSON.stringify(skill).includes(JSON.stringify(skills))
									) {
										return post;
									} else if (userChoice.label === '' && skills.length === 0) {
										return post;
									}
								})
								.map((postData: IPost) => (
									<Li key={postData.id}>
										<Link to={`/post-job/${postData.id}`}>
											<TitleStyled>{postData.jobTitle}</TitleStyled>
											<DescriptionDataStyled>{postData.jobDescription}</DescriptionDataStyled>
										</Link>
									</Li>
								))}
						</ul>
					</ColumnBig>
				</>
			)}
		</>
	);
};
export default FreelancerPage;
