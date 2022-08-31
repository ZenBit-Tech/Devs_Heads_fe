import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
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

const PostJobPageLayout: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const currentUser = useAppSelector(state => state.user.id);
	const [hasPublished, setPublished] = useState(false);
	const { data: post } = useGetPostJobQuery(currentUser);

	useEffect(() => {
		if (post) {
			setPublished(true);
		} else {
			setPublished(false);
		}
	}, [hasPublished]);

	return (
		<Wrapper>
			<h1>{`${t('PostJobPage.title')}`}</h1>
			{hasPublished ? (
				<ul>
					<li>
						<Link to={`/post-job/${post.id}`}>
							<TitleStyled>{post.jobTitle}</TitleStyled>
							<DescriptionDataStyled>{post.jobDescription}</DescriptionDataStyled>
							<DateStyled>
								<span>{post.dateTime}</span>
							</DateStyled>
						</Link>
					</li>
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
