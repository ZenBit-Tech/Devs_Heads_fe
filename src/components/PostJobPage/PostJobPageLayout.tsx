import React, { FC } from 'react';
// import { useAppSelector } from 'redux/hooks';
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
// import { RootState } from 'redux/store';
// import { IPostJob } from './interface';
// IJobPostBE

interface IPost {
	id: number;
	jobTitle: string;
	jobDescription: string;
	dateTime: string;
}

const PostJobPageLayout: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const userId = JSON.parse(localStorage.getItem('userId') || '{}');
	// console.log(userId);
	const { data: post, isLoading } = useGetPostJobQuery(userId);
	// console.log(post);

	return (
		<Wrapper>
			<h1>{`${t('PostJobPage.title')}`}</h1>
			{isLoading && <div>Loading..</div>}
			{post?.length > 0 ? (
				<ul>
					{post.map((postData: IPost) => (
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
					<ButtonStyled onClick={() => navigate('/create-job-post')}>{`${t(
						'PostJobPage.button',
					)}`}</ButtonStyled>
				</NonPostWrapper>
			)}
		</Wrapper>
	);
};

export default PostJobPageLayout;
