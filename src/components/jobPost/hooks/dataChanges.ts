import { useState } from 'react';

export interface ISkill {
	id: number;
	label: string;
	value: boolean;
}

export const skillsMock = [
	{ id: 0, label: 'Business analysis', value: false },
	{ id: 1, label: 'Consulting', value: false },
	{ id: 2, label: 'Estimate', value: false },
	{ id: 3, label: 'Recruiting', value: false },
	{ id: 4, label: 'SMM', value: false },
	{ id: 5, label: 'Copyrighting', value: false },
	{ id: 6, label: 'UI/UX', value: false },
	{ id: 7, label: 'Administration', value: false },
	{ id: 8, label: 'Taxation', value: false },
	{ id: 9, label: 'Coaching', value: false },
	{ id: 10, label: 'Full stack', value: false },
	{ id: 11, label: 'Quality control', value: false },
	{ id: 12, label: 'Communication', value: false },
	{ id: 13, label: 'JavaScript', value: false },
	{ id: 14, label: 'QA Automation', value: false },
	{ id: 15, label: 'ReactJS', value: false },
	{ id: 16, label: 'Python', value: false },
	{ id: 17, label: 'Game dev', value: false },
	{ id: 18, label: 'Flutter', value: false },
	{ id: 19, label: 'Node.js', value: false },
	{ id: 20, label: 'DevOps', value: false },
	{ id: 21, label: 'Scrum Master', value: false },
	{ id: 22, label: 'Agile Coach', value: false },
	{ id: 23, label: 'Project Manager', value: false },
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
