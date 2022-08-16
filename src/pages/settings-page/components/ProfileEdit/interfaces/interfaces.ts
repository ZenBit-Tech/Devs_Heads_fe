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
export interface ISkill {
  label: string;
  value: boolean;
}
export interface IProfileEdit {
  profilePhoto?: Blob;
  position: string;
  category: string;
  wage: number;
  skills: ISkill[];
  englishLevel: string;
  description: string;
  education: IEducationAndExperienceTemplate[];
  experience: IEducationAndExperienceTemplate[];
}
