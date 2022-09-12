import { t } from 'i18next';
import { SearchInput } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	search: string;
	setSearch: (search: string) => void;
}

const Search = (props: Props) => {
	const { search, setSearch } = props;
	return (
		<SearchInput
			type="text"
			placeholder={`${t('FreelancerPage.search')}`}
			value={search}
			onChange={e => setSearch(e.target.value)}
		/>
	);
};

export default Search;
