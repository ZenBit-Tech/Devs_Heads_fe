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
import Profile from '../../image/profile-talent.png';

const FilterProfileUser: FC<{ item: Filter }> = ({ item }) => {
	return (
		<>
			<ImageWrapperBlock>
				{item.filter.photo ? (
					<PhotoWrapper>
						<ProfileImage src={item.filter.photo} alt="profile" />
					</PhotoWrapper>
				) : (
					<ImageWrapper>
						<ProfileImage src={Profile} alt="profile" />
					</ImageWrapper>
				)}
			</ImageWrapperBlock>
			<ProfileData>
				<Link to={`/profile/${item.filter.id}`}>
					{item.user.firstName} {item.user.lastName}
				</Link>
				<p>{item.filter.position}</p>
				{`${t('TalentCompanyPage.rate')} ${item.filter.price}$`}
			</ProfileData>
		</>
	);
};

export default FilterProfileUser;
