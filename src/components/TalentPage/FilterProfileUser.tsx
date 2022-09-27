import React, { FC } from 'react';
import {
	ImageWrapper,
	ImageWrapperBlock,
	ProfileData,
	ProfileImage,
	PhotoWrapper,
} from './TalentPageLayout.style';
import { Filter } from './interfaces';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import Profile from 'image/profile-talent.png';

const FilterProfileUser: FC<{ item: Filter; path: boolean }> = ({ item, path }) => {
	return (
		<>
			<ImageWrapperBlock>
				{item.photo ? (
					<PhotoWrapper>
						<ProfileImage src={item.photo} alt="profile" />
					</PhotoWrapper>
				) : (
					<ImageWrapper>
						<ProfileImage src={Profile} alt="profile" />
					</ImageWrapper>
				)}
			</ImageWrapperBlock>
			<ProfileData>
				{path ? (
					<Link
						to={{
							pathname: `/profile/${item.id}`,
						}}
					>
						{item.userId.firstName} {item.userId.lastName}
					</Link>
				) : (
					<>
						{item.userId.firstName} {item.userId.lastName}
					</>
				)}
				<p>{item.position}</p>
				{`${t('TalentCompanyPage.rate')} ${item.price}$`}
			</ProfileData>
		</>
	);
};

export default FilterProfileUser;
