import { SearchInput } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	search: string;
	setSearch: (search: string) => void;
	placeholder: string;
}

const Search = (props: Props) => {
	const { search, setSearch, placeholder } = props;
	return (
		<SearchInput
			type="text"
			placeholder={placeholder}
			value={search}
			onChange={e => setSearch(e.target.value)}
		/>
	);
};

export default Search;
