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
  movieId: string;
  movie_title: string;
  img: string;
  trailer: string;
  genres: Array<string>;
  description: string;
  price: number;
  movie_date: Date;
  time_start: string;
  available_sits: Array<string>;
  taken_sits: Array<string>;
}

export interface VerificationEmail {
  subject: string;
  text: string;
}

export interface FilteredMovieObj {
  key: string;
  value: Array<Output>;
  data?: Movies;
}

export interface Output {
  movie_date: string;
  time_start: Date;
  movieId: string;
}
