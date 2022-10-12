import { t } from 'i18next';
import { Suspense } from 'react';
import { useGetTalentProfileQuery } from 'service/httpService';
import FilterProfileUser from '../FilterProfileUser';
import { Filter } from '../interfaces';
import { useState } from 'react';
import Pagination from '../Pagination';
import { PaginationBlock, ProfileBlock, Title, TitleDiv } from '../TalentPageLayout.style';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const MySavedTalent = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);
	const { user } = useAppSelector<RootState>(state => state);
	const userData = {
		page: currentPage,
		id: user.id,
	};
	const { data: talent, isFetching, isSuccess } = useGetTalentProfileQuery(userData);
	let content;
	if (isFetching) {
		content = <Suspense fallback={<div>{`${t('TalentPage.loading')}`}</div>}></Suspense>;
	} else if (isSuccess) {
		content = (
			<div>
				<TitleDiv>
					<Title>Saved Talents</Title>
				</TitleDiv>
				<PaginationBlock>
					<ProfileBlock className={talent?.profile.length ? '' : 'notFound'}>
						{talent?.profile.length ? (
							talent?.profile.map((item: Filter, index: React.Key | null | undefined) => {
								return (
									<div key={index}>
										<FilterProfileUser item={item} path={false} />
									</div>
								);
							})
						) : (
							<h2>{`${t('TalentPage.data')}`}</h2>
						)}
					</ProfileBlock>
					<Pagination filterPerPage={talent.limit} total={talent.total} paginate={paginate} />
				</PaginationBlock>
			</div>
		);
	}
	return <div>{content}</div>;
};

export default MySavedTalent;
