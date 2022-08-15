export interface IEducationAndExperienceTemplate {
  info: string;
  dateStart: Date;
  dateEnd: Date;
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
