import { t } from 'i18next';
import { checkList } from 'components/freelancerJobs/constants';
import { Column, Li, CheckLabel, Span } from 'components/freelancerJobs/freelancerPage.styles';

interface Props {
	radio: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtons = (props: Props) => {
	const { handleChange, radio } = props;
	return (
		<div>
			<Column>
				<ul>
					<Li>{`${t('JobPostPage.shortDuration')}`}</Li>
					<Li>{`${t('JobPostPage.mediumDuration')}`}</Li>
					<Li>{`${t('JobPostPage.longDuration')}`}</Li>
				</ul>
			</Column>
			<Column>
				<CheckLabel>
					{checkList.map((item: string, index: number) => (
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
			</Column>
		</div>
	);
};

export default RadioButtons;
