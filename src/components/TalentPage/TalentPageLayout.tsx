import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useMemo } from 'react';
import {
	Wrapper,
	Title,
	Input,
	BorderStyled,
	MainBlockWrapper,
	Label,
	Button,
	ButtonBlock,
	SkillsButtonsBlock,
	WrapperSidePanel,
	InputContainer,
	IconSearch,
	ProfileData,
	ProfileBlock,
	ProfileImage,
	ImageWrapper,
	ImageWrapperBlock,
} from './TalentPageLayout.style';
import { ImSearch } from 'react-icons/im';
import { ISkill } from 'components/jobPost/interfaces';
import { skillsMock } from 'components/jobPost/dataChanges';
import { RootState } from 'redux/store';
import { ICategoryBE, SearchSubmitForm } from './interfaces';
import Select from 'react-select';
import { selection } from 'components/jobPost/dataChanges';
import { useAppSelector } from 'redux/hooks';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { BsArrowRightCircle } from 'react-icons/bs';
import MyHiresCompany from './myhires/MyHiresCompany';
import MySavedTalent from './mysaved/MySavedTalent';
import FilterProfileUser from './FilterProfileUser';

const TalentPageLayout: FC = () => {
	const { t } = useTranslation();
	const { user } = useAppSelector<RootState>(state => state);
	const userId = user.id;
	const [skillsOption, setSkillsOptions] = useState<ISkill[]>(skillsMock);
	const [select, setSelect] = useState<ICategoryBE>();
	const [search, setSearch] = useState<string>('');
	const [showFilterList, setShowFilterList] = useState<boolean>(true);
	const [active, setActive] = useState<{ [name: string]: string }>();

	const filteredSkills = skillsOption.filter(s => s.value);
	const skillsBack: string[] = [];

	const skills = filteredSkills.map(({ value, ...rest }) => {
		return rest;
	});
	skills.map(item => {
		skillsBack.push(item.name);
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<SearchSubmitForm>();

	useEffect(() => {
		setActive({ ['discover']: 'discover' });
	}, []);

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
		return skillsOption.map((e, i) => (
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
	}, [skillsOption]);

	const onSubmit = async (data: SearchSubmitForm) => {
		const newData = {
			...data,
			userId,
			skills,
		};
	};

	const searchItemKeyWords = (value: string) => {
		console.log(value);
		//get serach request
	};

	const hardCodeData = [
		{
			id: 1,
			userName: 'John Smith',
			profilePhoto: '',
			title: 'frontend developer',
			fromHourRate: 100,
			toHourRate: 200,
		},
		{
			id: 2,
			userName: 'John Smith',
			profilePhoto: '',
			title: 'frontend developer',
			fromHourRate: 100,
			toHourRate: 200,
		},
		{
			id: 3,
			userName: 'John Smith',
			profilePhoto: '',
			title: 'frontend developer',
			fromHourRate: 100,
			toHourRate: 200,
		},
		{
			id: 4,
			userName: 'John Smith',
			profilePhoto: '',
			title: 'frontend developer',
			fromHourRate: 100,
			toHourRate: 200,
		},
		{
			id: 5,
			userName: 'John Smith',
			profilePhoto: '',
			title: 'frontend developer',
			fromHourRate: 100,
			toHourRate: 200,
		},
		{
			id: 6,
			userName: 'John Smith',
			profilePhoto: '',
			title: 'frontend developer',
			fromHourRate: 100,
			toHourRate: 200,
		},
	];
	const sendFilter = {
		select: select?.name,
		skills: skillsBack.toString(),
		search: search,
	};
	console.log(sendFilter);
	console.log(skills);
	console.log(search);

	function getFilterList() {
		setShowFilterList(!showFilterList);
	}
	function useMediaQuery(query: string, defaultMatches = window.matchMedia(query).matches) {
		const [matches, setMatches] = useState(window.matchMedia(defaultMatches.toString()).matches);

		useEffect(() => {
			const media = window.matchMedia(query);

			if (media.matches !== matches) setMatches(media.matches);

			const listener = () => setMatches(media.matches);

			media.addEventListener('change', listener);

			return () => media.removeEventListener('change', listener);
		}, [query, matches]);
		return matches;
	}

	const matchesQuery = useMediaQuery('(min-width: 1017px)');
	console.log(matchesQuery);

	const handleChangeActive = (e: FormEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		setActive({ [target.id]: target.id });
	};
	console.log(active);
	return (
		<div>
			<MainBlockWrapper onSubmit={handleSubmit(onSubmit)}>
				{(!showFilterList || matchesQuery) && (
					<WrapperSidePanel>
						<ButtonBlock>
							<Button
								className={active?.discover ? 'defaultActive' : ''}
								onClick={handleChangeActive}
							>
								<span id="discover">{`${t('TalentCompanyPage.discover')}`}</span>
							</Button>
							<Button className={active?.hires ? 'defaultActive' : ''} onClick={handleChangeActive}>
								<span id="hires"> {`${t('TalentCompanyPage.hires')}`}</span>
							</Button>
							<Button className={active?.save ? 'defaultActive' : ''} onClick={handleChangeActive}>
								<span id="save"> {`${t('TalentCompanyPage.saved')}`}</span>
							</Button>
						</ButtonBlock>
						{active?.discover === 'discover' && (
							<>
								<Title className="filterTitle">
									{`${t('TalentCompanyPage.filter')}`}{' '}
									<span>
										<BsArrowRightCircle className="arrowRight w-40 h-40" onClick={getFilterList} />
									</span>
								</Title>
								<Controller
									name="category"
									control={control}
									render={({ field }) => {
										return (
											<Select
												{...field}
												options={selection}
												placeholder="Categories"
												onChange={select => select && setSelect({ name: select.label })}
												theme={theme => ({
													...theme,
													borderRadius: 0,
													colors: {
														...theme.colors,
														neutral50: 'black', // Placeholder color
													},
												})}
												className={`${errors.category ? 'is-invalid' : ''}`}
											/>
										);
									}}
								/>
								<BorderStyled className="borderResults">{`${t(
									'TalentCompanyPage.results',
								)}`}</BorderStyled>
							</>
						)}
					</WrapperSidePanel>
				)}
				{(showFilterList || matchesQuery) && active?.discover === 'discover' && (
					<Wrapper>
						<div>
							<Title>
								<span>
									<BsArrowLeftCircle className="arrowRight w-40 h-40" onClick={getFilterList} />
								</span>
								{`${t('TalentCompanyPage.title')}`}
							</Title>
						</div>
						<InputContainer className="input-group rounded">
							<IconSearch onClick={() => searchItemKeyWords(search)}>
								<ImSearch />
							</IconSearch>
							<Input
								type="search"
								onChange={event => setSearch(event.target.value)}
								placeholder="Discover"
								onKeyPress={event => {
									if (event.key === 'Enter') {
										searchItemKeyWords(search);
									}
								}}
								value={search}
								aria-label="Discover"
								aria-describedby="search-addon"
							/>
						</InputContainer>
						<BorderStyled>{`${t('TalentCompanyPage.skill')}`}</BorderStyled>
						<SkillsButtonsBlock
							data-toggle="buttons"
							className="btn-group btn-group-toggle flex-wrap"
						>
							{optionButtons}
						</SkillsButtonsBlock>
					</Wrapper>
				)}
			</MainBlockWrapper>
			{active?.discover === 'discover' && (
				<ProfileBlock>
					{hardCodeData &&
						hardCodeData.map(item => {
							return (
								<div key={item.id}>
									<FilterProfileUser item={item} />
								</div>
							);
						})}
				</ProfileBlock>
			)}
			{active?.hires === 'hires' && <MyHiresCompany />}
			{active?.save === 'save' && <MySavedTalent />}
		</div>
	);
};

export default TalentPageLayout;
