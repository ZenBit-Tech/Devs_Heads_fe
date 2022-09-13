import { FC, useEffect, useMemo, useState } from 'react';
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

	const [search, setSearch] = useState<string>('');
	const [categoryValue, setCategoryValue] = useState<ICategory>(initialState);
	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsMock);
	const [durationValue, setDurationValue] = useState<string>('');
	const [userPrice, setUserPrice] = useState<number[]>([0, 10000]);

	const rangeSelector = (event: React.ChangeEvent<unknown>, newValue: number | number[]) => {
		setUserPrice(newValue as number[]);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDurationValue(event.target.value);
	};

	useEffect(() => {
		if (!isLoading) {
			setSkillsOptions(skills);
			setCategoryValue(category);
		}
	}, [isLoading]);

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

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const category = { value: userInfo.jobCategory.name, label: userInfo.jobCategory.name };
	const skills = skillsMock.map(skill => ({
		...skill,
		value: userInfo.jobSkills.some((jobSkill: { name: string }) => jobSkill.name === skill.name),
	}));
	const filteredSkills = skillsOptions.filter(s => s.value);
	const userSkills = filteredSkills.map(s => s.name);

	const ClearFilters = () => {
		setSearch('');
		setSkillsOptions(skillsMock);
		setCategoryValue(initialState);
		setUserPrice([0, 10000]);
		setDurationValue('');
	};

	return (
		<>
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
								onChange={choice => setCategoryValue(choice as ICategory)}
								defaultValue={categoryValue}
							/>
						</CategoryDiv>
						<SliderSearch slider={userPrice} rangeSelector={rangeSelector} />
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
									const jobSkills = post.jobSkills.map(skill => {
										return skill.name;
									});
									if (
										userPrice[0] <= post.fromHourRate &&
										userPrice[1] >= post.fromHourRate &&
										(durationValue.includes(post.jobDuration) || durationValue === '') &&
										(categoryValue.label === post.jobCategory.name || categoryValue.value === '') &&
										(jobSkills.some(value => userSkills.includes(value)) || userSkills.length === 0)
									) {
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
