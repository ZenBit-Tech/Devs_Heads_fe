import React, { FC } from 'react';
import {
	ImageWrapper,
	ImageWrapperBlock,
	ProfileData,
	ProfileImage,
} from './TalentPageLayout.style';
import Profile from '../../image/profile.png';
import { FilterData } from './interfaces';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

const FilterProfileUser: FC<{ item: FilterData }> = ({ item }) => {
	return (
		<>
			<ImageWrapperBlock>
				{item.profilePhoto ? (
					<ImageWrapper>
						<ProfileImage src={item.profilePhoto} alt="profile" />
					</ImageWrapper>
				) : (
					<ImageWrapper>
						<ProfileImage src={Profile} alt="profile" />
					</ImageWrapper>
				)}
			</ImageWrapperBlock>
			<ProfileData>
				<Link to={`/profile/${item.id}`}>{item.userName}</Link>
				<p>{item.title}</p>
				{`${t('TalentCompanyPage.rate')} ${item.fromHourRate}$ - ${item.toHourRate}$`}
			</ProfileData>
		</>
	);
};

export default FilterProfileUser;
