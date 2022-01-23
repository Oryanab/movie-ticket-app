// Student Interface
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
