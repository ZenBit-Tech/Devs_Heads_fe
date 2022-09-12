import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetJobPostsQuery, useGetJobPostByUserQuery } from 'service/httpService';
import {
	TitleStyled,
	DescriptionDataStyled,
	ColumnSmall,
	ColumnBig,
	FilterLabel,
	ClearBtn,
	Li,
	CategoryDiv,
	CustomSelect,
	Label,
} from 'components/freelancerJobs/freelancerPage.styles';
import { ICategory, IPost, ISkill } from 'components/freelancerJobs/interfaces';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import Skills from 'components/freelancerJobs/components/skills';
import RadioButtons from 'components/freelancerJobs/components/radio';
import SliderSearch from 'components/freelancerJobs/components/slider';
import Search from 'components/freelancerJobs/components/search';
import { initialState, selection, skillsMock } from 'components/freelancerJobs/constants';

const FreelancerPage: FC = () => {
	const { t } = useTranslation();
	const { user } = useAppSelector<RootState>(state => state);

	const { data: userInfo, isLoading } = useGetJobPostByUserQuery(user.id);
	const { data: posts } = useGetJobPostsQuery(user.id);

	const BeCategory = userInfo.jobCategory.name;
	const categoryValue = { value: BeCategory, label: BeCategory };
	const BeSkills = userInfo.jobSkills;

	const BESkills = BeSkills.map((skill: { name: string }) => {
		return skill.name;
	});

	const skillsBE = skillsMock.map(skill => {
		let name = '';
		BESkills.map((skill2: string) => {
			if (skill.value === false && skill.name === skill2) {
				name = skill.name;
			} else return skill2;
		});
		if (name !== '') {
			const abc: { name: string; value: boolean } = { name: name, value: true };
			name = '';
			return abc;
		} else return skill;
	});

	const [search, setSearch] = useState<string>('');
	const [userChoice, setUserChoice] = useState<ICategory>(categoryValue);
	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsBE);
	const [radio, setRadio] = useState<string>('');
	const [slider, setSlider] = useState<number[]>([0, 10000]);

	const rangeSelector = (event: React.ChangeEvent<unknown>, newValue: number | number[]) => {
		setSlider(newValue as number[]);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRadio(event.target.value);
	};

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

	const ClearFilters = () => {
		setSearch('');
		setSkillsOptions(skillsMock);
		setUserChoice(initialState);
		setSlider([0, 10000]);
		setRadio('');
	};

	return (
		<>
			{isLoading && <div>Loading..</div>}
			{posts?.length > 0 && (
				<>
					<ColumnSmall>
						<div>
							<FilterLabel>{`${t('FreelancerPage.filter')}`}</FilterLabel>
						</div>
						<Skills optionButtons={optionButtons} />
						<CategoryDiv>
							<CustomSelect
								options={selection}
								onChange={choice => setUserChoice(choice as ICategory)}
								defaultValue={categoryValue}
							/>
						</CategoryDiv>
						<SliderSearch slider={slider} rangeSelector={rangeSelector} />
						<RadioButtons handleChange={handleChange} />
					</ColumnSmall>
					<ColumnBig>
						<Search search={search} setSearch={setSearch} />
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
									} else if (
										radio === '' &&
										post.jobCategory.name === userChoice.label &&
										slider[0] <= post.fromHourRate &&
										slider[1] >= post.fromHourRate &&
										JSON.stringify(skill).includes(JSON.stringify(skills))
									) {
										return post;
									} else if (userChoice.label === '') {
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
