export interface Students {
  name: string;
  gender: Gender;
  age: number;
  dateOfBirth: Date;
  address: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum studentsReducerActionTypes {
  GET_STUDENTS = 'GET_STUDENTS',
}

export interface getStudentsAction {
  type: studentsReducerActionTypes.GET_STUDENTS;
  payload: Students[];
}

export type studentsReducerActions = getStudentsAction;
