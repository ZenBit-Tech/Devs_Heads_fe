import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetJobPostsQuery, useGetUserProfileQuery } from 'service/httpService';
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
import {
	initialCategory,
	selection,
	skillsMock,
	initialPrice,
} from 'components/freelancerJobs/constants';

const FreelancerPage: FC = () => {
	const { t } = useTranslation();
	const { user } = useAppSelector<RootState>(state => state);

	const { data: userInfo, isLoading } = useGetUserProfileQuery(user.id);
	const { data: posts } = useGetJobPostsQuery(user.id);

	const [search, setSearch] = useState<string>('');
	const [categoryValue, setCategoryValue] = useState<ICategory>(initialCategory);
	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsMock);
	const [durationValue, setDurationValue] = useState<string>('');
	const [userPrice, setUserPrice] = useState<number[]>(initialPrice);

	const rangeSelector = (event: React.ChangeEvent<unknown>, newValue: number | number[]) => {
		setUserPrice(newValue as number[]);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDurationValue(event.target.value);
	};

	useEffect(() => {
		if (!isLoading && userInfo) {
			const category = {
				value: userInfo.profile.category.name,
				label: userInfo.profile.category.name,
			};
			const skills = useMemo(
				() =>
					skillsMock.map(skill => ({
						...skill,
						value: userInfo.profile.skills.some(
							(jobSkill: { name: string }) => jobSkill.name === skill.name,
						),
					})),
				[skillsMock],
			);
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

	const filteredSkills = useMemo(() => skillsOptions.filter(s => s.value), [skillsOptions]);
	const userSkills = useMemo(() => filteredSkills.map(s => s.name), [filteredSkills]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	const ClearFilters = () => {
		setSearch('');
		setSkillsOptions(skillsMock);
		setCategoryValue(initialCategory);
		setUserPrice(initialPrice);
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
								value={categoryValue}
							/>
						</CategoryDiv>
						<SliderSearch slider={userPrice} rangeSelector={rangeSelector} />
						<RadioButtons handleChange={handleChange} radio={durationValue} />
					</ColumnSmall>
					<ColumnBig>
						<Search
							search={search}
							setSearch={setSearch}
							placeholder={`${t('FreelancerPage.search')}`}
							searchSize={'2% 10% 2% 0%'}
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
