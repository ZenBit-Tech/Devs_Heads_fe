import { t } from 'i18next';
import { SearchInput } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	search: string;
	setSearch: (search: string) => void;
	placeholder: string;
	searchSize: string;
}

const Search = (props: Props) => {
	const { search, setSearch, placeholder, searchSize } = props;
	return (
		<SearchInput
			type="text"
			style={{ margin: searchSize }}
			placeholder={placeholder}
			value={search}
			onChange={e => setSearch(e.target.value)}
		/>
	);
};

export default Search;
