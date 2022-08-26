import {
	TitleStyled,
	DescriptionStyled,
	CategoryStyled,
	BorderStyled,
	Wrapper,
	CategorySkillsBlock,
	SkillsItem,
	HourRateStyled,
	WrapperSkillsStyled,
} from './PostDetailPage.styles';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'antd';

function DescriptionPage() {
	const { t } = useTranslation();

	const hardCodeData = [
		{
			id: 1,
			title: 'Expert in Copy and Content writing',
			category: 'IT',
			skills: ['consulting', 'estimate'],
			workDuration: '0-1 month',
			dayRate: '20-25$',
			description:
				'We are currently seeking for Expert in Copy and Content writing. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque varius morbi enim nunc faucibus. Sed id semper risus in hendrerit gravida rutrum quisque. Platea dictumst vestibulum rhoncus est pellentesque. Orci nulla pellentesque dignissim enim sit amet. Feugiat nisl pretium fusce id velit ut tortor pretium. Lorem ipsum dolor sit amet. Viverra accumsan in nisl nisi scelerisque eu ultrices. Ac tincidunt vitae semper quis lectus. Vestibulum lorem sed risus ultricies tristique. Mattis nunc sed blandit libero volutpat sed cras ornare. Dictum varius duis at consectetur lorem. Venenatis tellus in metus vulputate. Turpis egestas pretium aenean pharetra. Donec ultrices tincidunt arcu non sodales neque sodales.',
			date: '2022-12-17T03:24:00',
		},
	];

	return (
		<Wrapper>
			{hardCodeData.map(item => (
				<div key={item.id}>
					<TitleStyled>{item.title}</TitleStyled>
					<CategoryStyled color={'black'}>Category/ {item.category}</CategoryStyled>
					<DescriptionStyled>{item.description}</DescriptionStyled>
					<BorderStyled></BorderStyled>
					<WrapperSkillsStyled>
						<CategorySkillsBlock>
							<CategoryStyled>
								<p>{`${t('PostDetailPage.skills')}`}</p>
							</CategoryStyled>
							<p>{`${t('PostDetailPage.skillsTechnik')}`}</p>
							{item.skills.map((item, index) => {
								return <SkillsItem key={index}>{item}</SkillsItem>;
							})}
						</CategorySkillsBlock>
						<CategorySkillsBlock>
							<CategoryStyled>{`${t('PostDetailPage.rate')}`}</CategoryStyled>
							<HourRateStyled>{item.dayRate}</HourRateStyled>
						</CategorySkillsBlock>
						<CategorySkillsBlock>
							<CategoryStyled>{`${t('PostDetailPage.project')}`}</CategoryStyled>
							<Checkbox>{item.workDuration}</Checkbox>
						</CategorySkillsBlock>
					</WrapperSkillsStyled>
				</div>
			))}
		</Wrapper>
	);
}

export default DescriptionPage;
