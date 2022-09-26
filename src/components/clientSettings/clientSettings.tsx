import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import {
	checkList,
	Data,
	ICountry,
	initial,
	initialCountry,
	selection,
	ValidationSchema,
} from 'components/clientSettings/data';
import {
	CheckLabel,
	Column,
	Container,
	SaveButton,
	CancelButton,
	MainTitle,
	P,
	Span,
	Title,
	Div,
	Input,
	TextArea,
	MinColumn,
	MaxColumn,
	ButtonBlock,
	Button,
	Img,
} from 'components/clientSettings/clentSettings.styles';
import countryList from 'react-select-country-list';
import { FormEvent, useMemo, useState } from 'react';
import editIcon from 'image/icon-pencil.png';
import ChangePassword from 'pages/setting-page-client/change-password/ChangePassword';

const settings = 'settings';
const password = 'password';

const ClientSettings = () => {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<Data>({
		resolver: yupResolver(ValidationSchema),
	});
	const [active, setActive] = useState<{ [name: string]: string }>({ [settings]: settings });
	const [website, setWebsiteValue] = useState<string>('');
	const [industry, setIndustryValue] = useState<ICountry>(initialCountry);
	const [quantity, setQuantityValue] = useState<string>('');
	const options = useMemo(() => countryList().getData(), []);

	const websiteChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWebsiteValue(event.target.value);
	};

	const quantityHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuantityValue(event.target.value);
	};

	const handleChangeActive = (e: FormEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		setActive({ [target.id]: target.id });
	};
	const cancelHandler = () => {
		setWebsiteValue('');
		setIndustryValue(initialCountry);
		setQuantityValue('');
		reset(initial);
	};

	const onSubmit = (data: Data) => {
		const NewData = {
			...data,
			website,
			industry,
			quantity,
		};
	};

	return (
		<Container>
			<MinColumn>
				<ButtonBlock>
					<Button className={active?.settings ? 'defaultActive' : ''} onClick={handleChangeActive}>
						<span id={settings}>{`${t('ClientSettings.settings')}`}</span>
					</Button>
					<Button className={active?.password ? 'defaultActive' : ''} onClick={handleChangeActive}>
						<span id={password}>{`${t('ClientSettings.password')}`}</span>
					</Button>
				</ButtonBlock>
			</MinColumn>
			<MaxColumn>
				{active?.settings === settings && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<MainTitle>
							{`${t('ClientSettings.title')}`}
							<button>
								<Img src={editIcon}></Img>
							</button>
						</MainTitle>
						<div>
							<Column>
								<Title>{`${t('ClientSettings.name')}`}</Title>
								<Input
									type="text"
									{...register('name')}
									className={`form-control ${errors.name ? 'is-invalid' : ''}`}
								/>
							</Column>
							<Column>
								<Title>{`${t('ClientSettings.email')}`}</Title>
								<Input type="text" />
							</Column>
							{errors.name && <P>{errors.name?.message}</P>}
							<Div>
								<Title>{`${t('ClientSettings.country')}`}</Title>
								<Controller
									name="country"
									control={control}
									render={({ field }) => {
										return (
											<Select
												{...field}
												options={options}
												className={`${errors.country ? 'is-invalid' : ''}`}
											/>
										);
									}}
								/>
								{errors.country && <P>{errors.country.value?.message}</P>}
							</Div>
						</div>
						<Div>
							<Title>{`${t('ClientSettings.website')}`}</Title>
							<Input type="text" onChange={websiteChangeHandler} value={website} />
						</Div>
						<Column>
							<Title>{`${t('ClientSettings.industry')}`}</Title>
							<Select
								options={selection}
								onChange={choice => setIndustryValue(choice as ICountry)}
								value={industry}
							/>
						</Column>
						<Column>
							<div>
								<Title>{`${t('ClientSettings.quantity')}`}</Title>
								<CheckLabel>
									{checkList.map((item: string, index: number) => (
										<div key={index}>
											<input
												value={item}
												type="radio"
												name="gender"
												onChange={quantityHandleChange}
												checked={item === quantity}
											/>
											<Span>{item}</Span>
										</div>
									))}
								</CheckLabel>
							</div>
						</Column>
						<Div>
							<Title>{`${t('ClientSettings.description')}`}</Title>
							<TextArea
								{...register('description')}
								className={`${errors.description ? 'is-invalid' : ''}`}
							/>
							{errors.description && <P>{errors.description?.message}</P>}
						</Div>
						<div style={{ display: 'flex' }}>
							<SaveButton type="submit">{`${t('ClientSettings.save')}`}</SaveButton>
							<CancelButton onClick={cancelHandler}>{`${t('ClientSettings.cancel')}`}</CancelButton>
						</div>
					</form>
				)}
				{active?.password === password && <ChangePassword />}
			</MaxColumn>
		</Container>
	);
};

export default ClientSettings;
