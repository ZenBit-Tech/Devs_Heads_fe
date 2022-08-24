import { ChangeEvent, useState } from 'react';
import { RadioChangeEvent } from 'antd';
import { ISkill } from 'components/jobPost/interfaces/interfaces';

const skillsMock = [
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
const errors = {
	titleError: false,
	categoryError: false,
	skillsError: false,
	durationError: false,
	fromHourRateError: false,
	toHourRateError: false,
	descriptionError: false,
};

export const useOnDataChange = () => {
	const categoryOptions = [
		{ id: 1, value: 'Legal' },
		{ id: 2, value: 'IT' },
		{ id: 3, value: 'Sales' },
		{ id: 4, value: 'Finance' },
		{ id: 5, value: 'Construction' },
		{ id: 6, value: 'Accounting' },
		{ id: 7, value: 'Design' },
		{ id: 8, value: 'Security' },
		{ id: 9, value: 'Healthcare' },
		{ id: 10, value: 'Marketing' },
	];

	const [skillsOptions, setSkillsOptions] = useState<ISkill[]>(skillsMock);

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

	const [title, setTitle] = useState<string>('');
	const [titleError, setTitleError] = useState(false);
	const onTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (e.currentTarget.value.length > 50) {
			setTitleError(true);
		} else {
			setTitle(e.currentTarget.value);
			setTitleError(false);
		}
	};

	const [category, setCategory] = useState<string>(categoryOptions[0].value);
	const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.currentTarget.value);
	};

	const [duration, setDuration] = useState<string>('0-1 month');
	const onDurationChange = (e: RadioChangeEvent) => {
		setDuration(e.target.value);
	};

	const [fromHourRate, setFromHourRate] = useState<number>(0);
	const [fromHourRateError, setFromHourRateError] = useState<boolean>(false);
	const onFromHourRateChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (+e.currentTarget.value < 0) {
			setFromHourRateError(true);
		} else {
			setFromHourRate(+e.currentTarget.value);
			setFromHourRateError(false);
		}
	};

	const [toHourRate, setToHourRate] = useState<number>(0);
	const [toHourRateError, setToHourRateError] = useState<boolean>(false);
	const onToHourRateChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (+e.currentTarget.value < 0) {
			setToHourRateError(true);
		} else {
			setToHourRate(+e.currentTarget.value);
			setToHourRateError(false);
		}
	};

	const [description, setDescription] = useState<string>('');
	const [descriptionError, setDescriptionError] = useState(false);
	const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (e.currentTarget.value.length > 200) {
			setDescriptionError(true);
		} else {
			setDescription(e.currentTarget.value);
			setDescriptionError(false);
		}
	};

	const [onSubmitErrors, setOnSubmitErrors] = useState(errors);
	const onSubmit = async () => {
		const filteredSkills = skillsOptions.filter(s => s.value);

		if (!title) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, titleError: true };
			});
		}

		if (title) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, titleError: false };
			});
		}

		if (!fromHourRate) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, fromHourRateError: true };
			});
		}

		if (fromHourRate) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, fromHourRateError: false };
			});
		}

		if (!toHourRate) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, toHourRateError: true };
			});
		}

		if (toHourRate) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, toHourRateError: false };
			});
		}

		if (filteredSkills.length < 3) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, skillsError: true };
			});
		}

		if (filteredSkills.length >= 3) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, skillsError: false };
			});
		}

		if (!description) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, descriptionError: true };
			});
		}

		if (description) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, descriptionError: false };
			});
		}
	};

	return {
		skillsOptions,
		onSkillsChange,
		title,
		titleError,
		onTitleChange,
		category,
		categoryOptions,
		onCategoryChange,
		duration,
		onDurationChange,
		description,
		descriptionError,
		onDescriptionChange,
		fromHourRate,
		fromHourRateError,
		onFromHourRateChange,
		toHourRate,
		toHourRateError,
		onToHourRateChange,
		onSubmitErrors,
		onSubmit,
	};
};
