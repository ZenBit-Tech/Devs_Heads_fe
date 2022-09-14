import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DirImage from 'assets/greenDir.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {
	Wrapper,
	TitleStyled,
	DescriptionDataStyled,
	DateStyled,
	ButtonStyled,
	DescriptionStyled,
	NonPostWrapper,
	ImageStyled,
} from './PostJobLayout.styles';
import { useGetPostJobQuery } from 'service/httpService';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import FreelancerPage from 'components/freelancerJobs/freelancerPage';
import { CreateJobPost } from 'constants/routes';

interface IPost {
	id: number;
	jobTitle: string;
	jobDescription: string;
	dateTime: string;
}

const PostJobPageLayout: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { user } = useAppSelector<RootState>(state => state);

	const { data: post = [], isLoading } = useGetPostJobQuery(user.id);
	const sortedPosts = useMemo(() => {
		const sortedPosts = post.slice();
		sortedPosts.sort((a: { dateTime: string }, b: { dateTime: string }) =>
			b.dateTime.localeCompare(a.dateTime),
		);
		return sortedPosts;
	}, [post]);

	const Role = {
		Freelancer: 'freelancer',
		Client: 'client',
	};

	return (
		<>
			{user.role === Role.Client && (
				<Wrapper>
					<h1>{`${t('PostJobPage.title')}`}</h1>
					{isLoading && <div>Loading..</div>}
					{post?.length > 0 ? (
						<ul>
							{sortedPosts.map((postData: IPost) => (
								<li key={postData.id}>
									<Link to={`/post-job/${postData.id}`}>
										<TitleStyled>{postData.jobTitle}</TitleStyled>
										<DescriptionDataStyled>{postData.jobDescription}</DescriptionDataStyled>
										<DateStyled>
											<span>{postData.dateTime}</span>
										</DateStyled>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<NonPostWrapper>
							<ImageStyled src={DirImage} alt="DirImage" />
							<DescriptionStyled>{`${t('PostJobPage.description')}`}</DescriptionStyled>
							<ButtonStyled onClick={() => navigate(`${CreateJobPost}`)}>{`${t(
								'PostJobPage.button',
							)}`}</ButtonStyled>
						</NonPostWrapper>
					)}
				</Wrapper>
			)}
			{user.role === Role.Freelancer && <FreelancerPage />}
		</>
	);
};

export default PostJobPageLayout;
