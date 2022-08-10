export interface IEducationAndExperienceTemplate {
  info: string;
  dateStart: string;
  dateEnd: string;
  error: boolean;
}

export interface ITextareaWithDatesMainState {
  education: IEducationAndExperienceTemplate[];
  experience: IEducationAndExperienceTemplate[];
}

export type OnChangeObjectKeys = keyof ITextareaWithDatesMainState;

export interface ITextareaWithDatesOnChange {
  key: OnChangeObjectKeys;
  index: number;
  item: IEducationAndExperienceTemplate;
}
