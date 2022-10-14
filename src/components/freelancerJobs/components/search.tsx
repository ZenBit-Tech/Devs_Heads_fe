import { SearchInput } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	search: string;
	setSearch: (search: string) => void;
	placeholder: string;
	searchSize: string;
	width: string;
}

const Search = (props: Props) => {
	const { search, setSearch, placeholder, searchSize, width } = props;
	return (
		<SearchInput
			type="text"
			style={{ margin: searchSize }}
			placeholder={placeholder}
			width={width}
			value={search}
			onChange={e => setSearch(e.target.value)}
		/>
	);
};

export default Search;
