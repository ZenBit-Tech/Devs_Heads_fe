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
	SendProposal,
	Column,
} from './PostDetailPage.styles';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetJobsDetailQuery, useGetProposalDetailQuery } from 'service/httpService';
import { Suspense, useEffect, useState } from 'react';
import { JobSkills } from 'components/PostDetailsPage/interfaces';
import Modal from 'components/PostDetailsPage/components/Modal';

function DescriptionPage() {
	const { t } = useTranslation();
	const params = useParams();
	const userId = JSON.parse(localStorage.getItem('userId') || '{}');
	const [disable, setDisable] = useState(false);

	const useModal = () => {
		const [isShown, setIsShown] = useState<boolean>(false);
		const toggle = () => setIsShown(!isShown);
		return {
			isShown,
			toggle,
		};
	};

	const { isShown, toggle } = useModal();
	const { data: post, isFetching, isSuccess } = useGetJobsDetailQuery(params.id);

	const proposalId = {
		userId: userId.userId || userId.id,
		jobId: Number(params.id),
	};
	const { data: id, isLoading, isError } = useGetProposalDetailQuery(proposalId);

	useEffect(() => {
		const buttonDisable = () => {
			if (isLoading) {
				return <Suspense fallback={<div>{`${t('PostDetailPage.loading')}`}</div>}></Suspense>;
			} else if (isError) {
				setDisable(false);
			} else if (id) {
				setDisable(true);
			}
		};
		buttonDisable();
	}, [id]);

	let content;
	if (isFetching) {
		content = <Suspense fallback={<div>{`${t('PostDetailPage.loading')}`}</div>}></Suspense>;
	} else if (isSuccess) {
		content = (
			<Wrapper>
				<TitleStyled>{post.jobTitle}</TitleStyled>
				<Column>
					<CategoryStyled color={'black'}>
						{`${t('PostDetailPage.category')}`} {post.jobCategory.name}
					</CategoryStyled>
				</Column>
				<SendProposal onClick={toggle} className="btn btn-success" disabled={disable}>
					{`${t('PostDetailPage.sendPrpBtn')}`}
				</SendProposal>
				<Modal
					isShown={isShown}
					hide={toggle}
					setDisable={setDisable}
					jobPostId={Number(params.id)}
				/>
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
						<Checkbox defaultChecked>{post.jobDuration}</Checkbox>
					</CategorySkillsBlock>
				</WrapperSkillsStyled>
			</Wrapper>
		);
	}

	return <div>{content}</div>;
}

export default DescriptionPage;
