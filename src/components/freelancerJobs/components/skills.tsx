import { t } from 'i18next';
import { SkillsLabel, SkillsButtonsBlock } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	optionButtons: JSX.Element[];
}

const Skills = (props: Props) => {
	const { optionButtons } = props;
	return (
		<>
			<div>
				<SkillsLabel>{`${t('FreelancerPage.skills')}`}</SkillsLabel>
			</div>
			<div>
				<SkillsButtonsBlock data-toggle="buttons" className="btn-group btn-group-toggle flex-wrap">
					{optionButtons}
				</SkillsButtonsBlock>
			</div>
		</>
	);
};

export default Skills;
