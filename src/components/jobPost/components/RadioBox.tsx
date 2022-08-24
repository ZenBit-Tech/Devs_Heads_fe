import { Radio, RadioChangeEvent, Space } from 'antd';
import { t } from 'i18next';

interface Props {
	onChange: (event: RadioChangeEvent) => void;
	value: string;
}

const RadioBox = (props: Props) => {
	return (
		<Radio.Group onChange={props.onChange} value={props.value}>
			<Space direction="vertical">
				<Radio value={'0-1 month'}>{`${t('JobPostPage.shortMonthDuration')}`}</Radio>
				<Radio value={'1-6 months'}>{`${t('JobPostPage.mediumMonthDuration')}`}</Radio>
				<Radio value={'6+ months'}>{`${t('JobPostPage.longMonthDuration')}`}</Radio>
			</Space>
		</Radio.Group>
	);
};

export default RadioBox;
