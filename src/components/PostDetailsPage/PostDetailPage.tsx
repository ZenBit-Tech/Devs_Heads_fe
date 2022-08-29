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
import { useParams } from 'react-router-dom';
import { useGetJobsDetailQuery } from 'service/httpService';
import { Suspense } from 'react';
import { JobSkills } from './interfaces';

function DescriptionPage() {
	const { t } = useTranslation();
	const params = useParams();
	const { data: post, isFetching, isSuccess } = useGetJobsDetailQuery(params.id);

	let content;
	if (isFetching) {
		content = <Suspense fallback={<div>Loading...</div>}></Suspense>;
	} else if (isSuccess) {
		content = (
			<Wrapper>
				<TitleStyled>{post.jobTitle}</TitleStyled>
				<CategoryStyled color={'black'}>
					{`${t('PostDetailPage.category')}`} {post.jobCategory.name}
				</CategoryStyled>
				<DescriptionStyled>{post.jobDescription}</DescriptionStyled>
				<BorderStyled></BorderStyled>
				<WrapperSkillsStyled>
					<CategorySkillsBlock>
						<CategoryStyled>
							<p>{`${t('PostDetailPage.skills')}`}</p>
						</CategoryStyled>
						<p>{`${t('PostDetailPage.skillsTechnik')}`}</p>
						{post.jobSkills.map((item: JobSkills) => {
							return <SkillsItem key={item.id}>{item.name}</SkillsItem>;
						})}
					</CategorySkillsBlock>
					<CategorySkillsBlock>
						<CategoryStyled>{`${t('PostDetailPage.rate')}`}</CategoryStyled>
						<HourRateStyled>{`${post.fromHourRate}$ - ${post.toHourRate}$`}</HourRateStyled>
					</CategorySkillsBlock>
					<CategorySkillsBlock>
						<CategoryStyled>{`${t('PostDetailPage.project')}`}</CategoryStyled>
						<Checkbox>{post.jobDuration}</Checkbox>
					</CategorySkillsBlock>
				</WrapperSkillsStyled>
			</Wrapper>
		);
	}

	return <div>{content}</div>;
}

export default DescriptionPage;
