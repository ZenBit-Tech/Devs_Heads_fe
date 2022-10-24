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
	MaxColumn,
	MinColumn,
	FullColumn,
	P,
	Description,
	WrapperWithBorder,
	P1,
	ClientInfoDescription,
} from './PostDetailPage.styles';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useGetClientInfoByUserQuery,
	useGetJobsDetailQuery,
	useGetProposalDetailQuery,
} from 'service/httpService';
import { Suspense, useEffect, useState } from 'react';
import { JobSkills } from 'components/PostDetailsPage/interfaces';
import Modal from 'components/PostDetailsPage/components/Modal';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import DeleteModal from './components/DeleteModal';

const Role = {
	Freelancer: 'freelancer',
	Client: 'client',
};

const DescriptionPage: FC = () => {
	const { t } = useTranslation();
	const params = useParams();
	const navigate = useNavigate();
	const { user } = useAppSelector<RootState>(state => state);
	const proposalId = {
		userId: user.id,
		jobId: Number(params.id),
	};
	const { data: id, isLoading, isError } = useGetProposalDetailQuery(proposalId);
	const { data: post, isFetching, isSuccess } = useGetJobsDetailQuery(params.id);
	const { data: clientInfo } = useGetClientInfoByUserQuery(post?.userId);

	const [disable, setDisable] = useState(false);
	const [toggleModal, setToggleModal] = useState<boolean>(false);

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
			setIsShown,
			toggle,
		};
	};

	const { isShown, toggle, setIsShown } = useModal();

	let content;
	if (isFetching) {
		content = <Suspense fallback={<div>{`${t('PostDetailPage.loading')}`}</div>}></Suspense>;
	} else if (isSuccess) {
		content = (
			<Wrapper>
				<TitleStyled>{post.jobTitle}</TitleStyled>
				{user.role === Role.Client && (
					<CategoryStyled color={'black'}>
						{`${t('PostDetailPage.category')}`} {post.jobCategory.name}
					</CategoryStyled>
				)}
				{user.role === Role.Freelancer && (
					<>
						<MaxColumn>
							<MaxColumn>
								<CategoryStyled color={'black'}>
									{`${t('PostDetailPage.category')}`} {post.jobCategory.name}
								</CategoryStyled>
							</MaxColumn>
							<MinColumn>
								{disable ? (
									<div>{`${t('PostDetailPage.proposalSent')}`}</div>
								) : (
									<SendProposal
										onClick={toggle}
										className={`btn btn-success ${disable ? 'hidden' : 'block'}`}
									>
										{`${t('PostDetailPage.sendPrpBtn')}`}
									</SendProposal>
								)}
								<Modal
									isShown={isShown}
									hide={toggle}
									setIsShown={setIsShown}
									clientId={post.userId}
									setDisable={setDisable}
									jobPostId={Number(params.id)}
									receiverId={post.userId}
								/>
							</MinColumn>
							<DescriptionStyled>{post.jobDescription}</DescriptionStyled>
						</MaxColumn>
						<MinColumn>
							<WrapperWithBorder>
								<h4>{`${t('PostDetailPage.clientInfo')}`}</h4>
								<P1>{clientInfo?.name}</P1>
								<P>
									<a href={clientInfo?.website}>{clientInfo?.website}</a>
								</P>
								<P1>{clientInfo?.country}</P1>
								<P1>{clientInfo?.industry}</P1>
								<P>{clientInfo?.quantity}</P>
								<ClientInfoDescription>{clientInfo?.description}</ClientInfoDescription>
							</WrapperWithBorder>
						</MinColumn>
					</>
				)}
				{user.role === Role.Client && <Description>{post.jobDescription}</Description>}
				<FullColumn>
					<BorderStyled></BorderStyled>
					<WrapperSkillsStyled>
						<CategorySkillsBlock>
							<CategoryStyled>
								<p>{`${t('PostDetailPage.skills')}`}</p>
							</CategoryStyled>
							<P>{`${t('PostDetailPage.skillsTechnik')}`}</P>
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
						{user.role === Role.Client && (
							<CategorySkillsBlock>
								<Button
									type="link"
									icon={<EditOutlined />}
									onClick={handleNavigate}
									style={{ fontSize: '20px' }}
								>{`${t('PostDetailPage.editButton')}`}</Button>
								<Button
									type="link"
									icon={<DeleteOutlined />}
									onClick={handleRemove}
									style={{ fontSize: '20px' }}
								>{`${t('PostDetailPage.removeButton')}`}</Button>
								<DeleteModal toggleModal={handleRemove} openModal={toggleModal} id={params.id} />
							</CategorySkillsBlock>
						)}
					</WrapperSkillsStyled>
				</FullColumn>
			</Wrapper>
		);
	}
	return <div>{content}</div>;
};
export default DescriptionPage;
