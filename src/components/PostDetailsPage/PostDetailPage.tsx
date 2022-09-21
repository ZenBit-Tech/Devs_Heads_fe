import React, { FC } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useGetJobsDetailQuery, useGetProposalDetailQuery } from 'service/httpService';
import { Suspense, useEffect, useState } from 'react';
import { JobSkills } from 'components/PostDetailsPage/interfaces';
import Modal from 'components/PostDetailsPage/components/Modal';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import DeleteModal from './components/DeleteModal';

const DescriptionPage: FC = () => {
	const { t } = useTranslation();
	const params = useParams();
	const { user } = useAppSelector<RootState>(state => state);
	const [disable, setDisable] = useState(false);
	const navigate = useNavigate();
	const [toggleModal, setToggleModal] = useState<boolean>(false);
	const proposalId = {
		userId: user.id,
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

	const handleRemove = () => {
		setToggleModal(!toggleModal);
	};

	const handleNavigate = () => {
		navigate(`/post-job/${params.id}/edit`);
	};

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

	const Role = {
		Freelancer: 'freelancer',
		Client: 'client',
	};

	let content;
	if (isFetching) {
		content = <Suspense fallback={<div>{`${t('PostDetailPage.loading')}`}</div>}></Suspense>;
	} else if (isSuccess) {
		content = (
			<Wrapper>
				<TitleStyled>{post.jobTitle}</TitleStyled>
				{user.role === Role.Freelancer && (
					<>
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
					</>
				)}
				{user.role === Role.Client && (
					<CategoryStyled color={'black'}>
						{`${t('PostDetailPage.category')}`} {post.jobCategory.name}
					</CategoryStyled>
				)}
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
					<div>
						<Button type="link" icon={<EditOutlined />} onClick={handleNavigate}>{`${t(
							'PostDetailPage.editButton',
						)}`}</Button>
						<Button type="link" icon={<DeleteOutlined />} onClick={handleRemove}>{`${t(
							'PostDetailPage.removeButton',
						)}`}</Button>
						<DeleteModal toggleModal={handleRemove} openModal={toggleModal} id={params.id} />
					</div>
				</WrapperSkillsStyled>
			</Wrapper>
		);
	}

	return <div>{content}</div>;
};

export default DescriptionPage;
