import { useState } from 'react';
import { ISkill, JobSubmitForm } from 'components/jobPost/interfaces';
import { useSendData } from 'components/jobPost/dataSend';
import { useAppSelector } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'redux/store';
import { PostJobPage } from 'constants/routes';

export const selection = [
	{ value: 'Legal', label: 'Legal' },
	{ value: 'IT', label: 'IT' },
	{ value: 'Sales', label: 'Sales' },
	{ value: 'Finance', label: 'Finance' },
	{ value: 'Construction', label: 'Construction' },
	{ value: 'Accounting', label: 'Accounting' },
	{ value: 'Design', label: 'Design' },
	{ value: 'Security', label: 'Security' },
	{ value: 'Healthcare', label: 'Healthcare' },
	{ value: 'Marketing', label: 'Marketing' },
];

export const skillsMock = [
	{ name: 'Business analysis', value: false },
	{ name: 'Consulting', value: false },
	{ name: 'Estimate', value: false },
	{ name: 'Recruiting', value: false },
	{ name: 'SMM', value: false },
	{ name: 'Copyrighting', value: false },
	{ name: 'UI/UX', value: false },
	{ name: 'Administration', value: false },
	{ name: 'Taxation', value: false },
	{ name: 'Coaching', value: false },
	{ name: 'Full stack', value: false },
	{ name: 'Quality control', value: false },
	{ name: 'Communication', value: false },
	{ name: 'JavaScript', value: false },
	{ name: 'QA Automation', value: false },
	{ name: 'ReactJS', value: false },
	{ name: 'Python', value: false },
	{ name: 'Game dev', value: false },
	{ name: 'Flutter', value: false },
	{ name: 'Node.js', value: false },
	{ name: 'DevOps', value: false },
	{ name: 'Scrum Master', value: false },
	{ name: 'Agile Coach', value: false },
	{ name: 'Project Manager', value: false },
];

export const useOnDataChange = () => {
	const { sendData, sendUpdatedData } = useSendData();

	const navigate = useNavigate();

	const { user } = useAppSelector<RootState>(state => state);
	const userId = user.id;

	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsMock);

	const filteredSkills = skillsOptions.filter(s => s.value);

	const skills = filteredSkills.map(({ value, ...rest }) => {
		return rest;
	});

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

	const onSubmit = async (data: JobSubmitForm) => {
		if (skills.length >= 3) {
			const newData = {
				...data,
				userId,
				skills,
			};
			sendData(newData);
			navigate(`${PostJobPage}`);
		} else {
			return;
		}
	};

	const handleUpdate = async (data: JobSubmitForm) => {
		if (skills.length >= 3) {
			const newData = {
				...data,
				userId,
				skills,
			};
			sendUpdatedData(newData);
			navigate('/post-job');
		} else {
			return;
		}
	};

	return {
		skillsOptions,
		onSkillsChange,
		skills,
		onSubmit,
		handleUpdate,
	};
};
