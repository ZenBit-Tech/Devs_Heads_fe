import { useState } from 'react';
import { ISkill } from 'components/jobPost/interfaces';

export const skillsMock = [
	{ label: 'Business analysis', value: false },
	{ label: 'Consulting', value: false },
	{ label: 'Estimate', value: false },
	{ label: 'Recruiting', value: false },
	{ label: 'SMM', value: false },
	{ label: 'Copyrighting', value: false },
	{ label: 'UI/UX', value: false },
	{ label: 'Administration', value: false },
	{ label: 'Taxation', value: false },
	{ label: 'Coaching', value: false },
	{ label: 'Full stack', value: false },
	{ label: 'Quality control', value: false },
	{ label: 'Communication', value: false },
	{ label: 'JavaScript', value: false },
	{ label: 'QA Automation', value: false },
	{ label: 'ReactJS', value: false },
	{ label: 'Python', value: false },
	{ label: 'Game dev', value: false },
	{ label: 'Flutter', value: false },
	{ label: 'Node.js', value: false },
	{ label: 'DevOps', value: false },
	{ label: 'Scrum Master', value: false },
	{ label: 'Agile Coach', value: false },
	{ label: 'Project Manager', value: false },
];

export const useOnDataChange = () => {
	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsMock);

	const filteredSkills = skillsOptions.filter(s => s.value);

	const onSkillsChange = (index: number) => {
		setSkillsOptions(prevState => {
			return prevState.map((e, i) => {
				if (index === i) {
					return { ...e, value: !e.value };
				}
				return e;
			});
		});
	};

	return {
		skillsOptions,
		onSkillsChange,
		filteredSkills,
	};
};
