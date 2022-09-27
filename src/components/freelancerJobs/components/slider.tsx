import { t } from 'i18next';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { SkillsLabel, P } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	slider: number[];
	rangeSelector: (event: React.ChangeEvent<unknown>, newValue: number | number[]) => void;
}

const SliderSearch = (props: Props) => {
	const { slider, rangeSelector } = props;
	return (
		<div>
			<SkillsLabel>{`${t('FreelancerPage.price')}`}</SkillsLabel>
			<P>
				${slider[0]}-{slider[1]}
			</P>
			<Typography id="range-slider" gutterBottom></Typography>
			<Slider value={slider} onChange={rangeSelector} valueLabelDisplay="auto" min={0} max={3000} />
		</div>
	);
};

export default SliderSearch;
