import { CheckLabel, Span } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	radio: string | null;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string[];
}

const RadioButtons = (props: Props) => {
	const { handleChange, radio, value } = props;
	return (
		<>
			<CheckLabel>
				{value.map((item: string, index: number) => (
					<div key={index}>
						<input
							value={item}
							type="radio"
							name="gender"
							onChange={handleChange}
							checked={item === radio}
						/>
						<Span>{item}</Span>
					</div>
				))}
			</CheckLabel>
		</>
	);
};

export default RadioButtons;
