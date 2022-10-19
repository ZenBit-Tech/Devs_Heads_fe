import { ChangeEvent, useState } from 'react';
import { RadioChangeEvent } from 'antd';
import {
	IProfileEdit,
	ISkill,
	ITextareaWithDatesMainState,
	ITextareaWithDatesOnChange,
	OnChangeObjectKeys,
} from '../interfaces/interfaces';
import { useSendData } from './use-send-data';
import { defaultProfilePhoto } from 'constants/links';
import { EnglishLevelEnum } from 'enum/english-level-enum';
import { useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';

const textareaMock = {
	education: [
		{
			info: '',
			dateStart: new Date(),
			dateEnd: new Date(),
			error: false,
		},
	],
	experience: [
		{
			info: '',
			dateStart: new Date(),
			dateEnd: new Date(),
			error: false,
		},
	],
};
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
	positionError: false,
	priceError: false,
	descriptionError: false,
	skillsError: false,
	educationError: false,
	experienceError: false,
};

export const useOnDataChange = () => {
	const { sendData } = useSendData();

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

	const [file, setFile] = useState<Blob>();
	const [file64, setFile64] = useState<string>(defaultProfilePhoto);
	const { user } = useAppSelector<RootState>(state => state);
	const onChangePhotoHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				setFile64(reader.result);
			}
		};
		const newFile = e.target.files && e.target.files[0];
		if (newFile) {
			setFile(newFile);
			reader.readAsDataURL(newFile);
		}
	};
	const onPhotoDelete = () => {
		setFile(undefined);
		setFile64(defaultProfilePhoto);
	};
	const [textAreaWithDatesState, setTextAreaWithDatesState] =
		useState<ITextareaWithDatesMainState>(textareaMock);
	const onChangeTextareaWithDates = (args: ITextareaWithDatesOnChange) => {
		setTextAreaWithDatesState(prevState => {
			const newState = { ...prevState };
			newState[args.key][args.index] = args.item;
			return newState;
		});
	};
	const addField = (key: OnChangeObjectKeys) => {
		setTextAreaWithDatesState(prevState => {
			const newState = { ...prevState };
			newState[key].push({
				info: '',
				dateStart: new Date(),
				dateEnd: new Date(),
				error: false,
			});
			return newState;
		});
	};

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

	const [englishOption, setEnglishOption] = useState<EnglishLevelEnum>(
		EnglishLevelEnum.PRE_INTERMEDIATE,
	);
	const onEnglishOptionChange = ({ target: { value } }: RadioChangeEvent) => {
		setEnglishOption(value);
	};

	const [position, setPosition] = useState<string>('');
	const [positionError, setPositionError] = useState(false);
	const onPositionChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length > 25) {
			setPositionError(true);
		} else {
			setPosition(e.currentTarget.value);
			setPositionError(false);
		}
	};

	const [category, setCategory] = useState<string>(categoryOptions[0].value);
	const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCategory(e.currentTarget.value);
	};

	const [price, setPrice] = useState<number | undefined>(0);
	const [priceError, setPriceError] = useState<boolean>(false);
	const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (+e.currentTarget.value < 0) {
			setPriceError(true);
		} else {
			setPrice(+e.currentTarget.value);
			setPriceError(false);
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
		const filteredEducation = textAreaWithDatesState.education.filter(e => !!e.info);
		const filteredExperience = textAreaWithDatesState.experience.filter(e => !!e.info);

		if (!position) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, positionError: true };
			});
		}

		if (position) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, positionError: false };
			});
		}

		if (!price) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, priceError: true };
			});
		}

		if (price) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, priceError: false };
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

		if (filteredEducation.length === 0) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, educationError: true };
			});
		}

		if (filteredEducation.length > 0) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, educationError: false };
			});
		}

		if (filteredExperience.length === 0) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, experienceError: true };
			});
		}

		if (filteredExperience.length > 0) {
			setOnSubmitErrors(prevState => {
				return { ...prevState, experienceError: false };
			});
		}
		const objToSend: IProfileEdit = {
			profilePhoto: file64,
			position: position,
			category: category,
			wage: price,
			userId: user.id,
			skills: filteredSkills,
			englishLevel: englishOption,
			description: description,
			education: filteredEducation,
			experience: filteredExperience,
		};
		if (Object.values(onSubmitErrors).filter(Boolean).length === 0) {
			await sendData(objToSend);
		}
	};

	return {
		skillsOptions,
		onSkillsChange,
		textAreaWithDatesState,
		onChangeTextareaWithDates,
		addField,
		englishOption,
		onEnglishOptionChange,
		position,
		onPositionChange,
		category,
		onCategoryChange,
		onPriceChange,
		price,
		description,
		onDescriptionChange,
		onChangePhotoHandler,
		file,
		file64,
		categoryOptions,
		onPhotoDelete,
		positionError,
		descriptionError,
		priceError,
		onSubmitErrors,
		onSubmit,
	};
};
