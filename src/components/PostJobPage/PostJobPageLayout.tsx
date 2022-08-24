import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import DirImage from 'assets/greenDir.jpg';
import { Link } from 'react-router-dom';
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

const PostJobPageLayout: FC = () => {
	const { t } = useTranslation();
	const hardCodeData = [
		{
			id: 1,
			title: 'Facebook',
			description:
				'We are currently seeking for a Frontend Developer. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque varius morbi enim nunc faucibus. Sed id semper risus in hendrerit gravida rutrum quisque. Platea dictumst vestibulum rhoncus est pellentesque. Orci nulla pellentesque dignissim enim sit amet. Feugiat nisl pretium fusce id velit ut tortor pretium. Lorem ipsum dolor sit amet. Viverra accumsan in nisl nisi scelerisque eu ultrices. Ac tincidunt vitae semper quis lectus. Vestibulum lorem sed risus ultricies tristique. Mattis nunc sed blandit libero volutpat sed cras ornare. Dictum varius duis at consectetur lorem. Venenatis tellus in metus vulputate. Turpis egestas pretium aenean pharetra. Donec ultrices tincidunt arcu non sodales neque sodales.',
			date: '2022-12-17T03:24:00',
		},
		{
			id: 2,
			title: 'Google',
			description:
				'We are currently seeking for a Backend Developer. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque varius morbi enim nunc faucibus. Sed id semper risus in hendrerit gravida rutrum quisque. Platea dictumst vestibulum rhoncus est pellentesque. Orci nulla pellentesque dignissim enim sit amet. Feugiat nisl pretium fusce id velit ut tortor pretium. Lorem ipsum dolor sit amet. Viverra accumsan in nisl nisi scelerisque eu ultrices. Ac tincidunt vitae semper quis lectus. Vestibulum lorem sed risus ultricies tristique. Mattis nunc sed blandit libero volutpat sed cras ornare. Dictum varius duis at consectetur lorem. Venenatis tellus in metus vulputate. Turpis egestas pretium aenean pharetra. Donec ultrices tincidunt arcu non sodales neque sodales.',
			date: '2020-12-17T03:24:00',
		},
		{
			id: 3,
			title: 'Instagram',
			description:
				'We are currently seeking for a Full Stack Developer. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque varius morbi enim nunc faucibus. Sed id semper risus in hendrerit gravida rutrum quisque. Platea dictumst vestibulum rhoncus est pellentesque. Orci nulla pellentesque dignissim enim sit amet. Feugiat nisl pretium fusce id velit ut tortor pretium. Lorem ipsum dolor sit amet. Viverra accumsan in nisl nisi scelerisque eu ultrices. Ac tincidunt vitae semper quis lectus. Vestibulum lorem sed risus ultricies tristique. Mattis nunc sed blandit libero volutpat sed cras ornare. Dictum varius duis at consectetur lorem. Venenatis tellus in metus vulputate. Turpis egestas pretium aenean pharetra. Donec ultrices tincidunt arcu non sodales neque sodales.',
			date: '2021-12-17T03:24:00',
		},
	];
	return (
		<Wrapper>
			<h1>{`${t('PostJobPage.title')}`}</h1>
			{hardCodeData ? (
				<ul>
					{hardCodeData
						.sort((a, b) => b.date.localeCompare(a.date))
						.map(data => (
							<li key={data.id}>
								<Link to={`/post-job/${data.id}`}>
									<TitleStyled>{data.title}</TitleStyled>
									<DescriptionDataStyled>{data.description}</DescriptionDataStyled>
									<DateStyled>
										<span>{data.date}</span>
									</DateStyled>
								</Link>
							</li>
						))}
				</ul>
			) : (
				<NonPostWrapper>
					<ImageStyled src={DirImage} alt="DirImage" />
					<DescriptionStyled>{`${t('PostJobPage.description')}`}</DescriptionStyled>
					<ButtonStyled>{`${t('PostJobPage.button')}`}</ButtonStyled>
				</NonPostWrapper>
			)}
		</Wrapper>
	);
};

export default PostJobPageLayout;
