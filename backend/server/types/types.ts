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

export interface Tickets {
  full_name: String;
  secret_key: String;
  movie_id: String;
  email: String;
  movie_title: String;
  seats: Array<string>;
  price: Number;
  movie_date: Date;
  time_start: String;
  purchase_date: Date;
}

export interface Movies {
  movieId: String;
  movie_title: String;
  img: String;
  trailer: String;
  genres: Array<string>;
  description: String;
  price: Number;
  movie_date: Date;
  time_start: String;
  available_sits: Array<string>;
  taken_sits: Array<string>;
}

export interface VerificationEmail {
  subject: string;
  text: string;
}

declare global {
  namespace Express {
    export interface Request {
      verified: boolean;
      process_token: string;
    }
  }
}
