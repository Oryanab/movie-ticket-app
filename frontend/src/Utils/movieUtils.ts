import { Movies, FilteredMovieObj, Output } from '../Redux/Types/generalTypes';

export const returnAvailableSeats = () => {
  const AvailableSeats = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let num = 1; num < 11; num++) {
    for (const char of letters) {
      AvailableSeats.push(`${num}${char}`);
    }
  }
  return AvailableSeats;
};

export const movies: Array<Movies> = [
  {
    movieId: 'njdsfdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('02/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'njsfdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('02/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('02/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title1',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title3',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('03/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
  {
    movieId: 'jdfbdhdf',
    movie_title: 'movie_title',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    genres: ['comedy', 'fantasy'],
    description:
      "For the first time in the cinematic history of Spider-Man, our friendly neighborhood hero's identity is revealed, bringing his Super Hero responsibilities into conflict with his normal life and putting those he cares about most at risk. When he enlists Doctor Strange’s help to restore his secret, the spell tears a hole in their world, releasing the most powerful villains who’ve ever fought a Spider-Man in any universe. Now, Peter will have to overcome his greatest challenge yet, which will not only forever alter his own future but the future of the Multiverse.",
    price: 45,
    movie_date: new Date('01/12/22'),
    time_start: '18:00',
    available_sits: returnAvailableSeats(),
    taken_sits: [],
  },
];

const collapseDuplicatedMovies = (movies: Movies[]) => {
  const output: any = {};
  movies.forEach(val => {
    const key = val.movie_title;
    const value = val.movie_date;
    const value2 = val.time_start;
    const value3 = val.movieId;
    output[key] = output[key] || [];
    output[key] = output[key].concat({ movie_date: value, time_start: value2, movieId: value3 });
  });

  return output;
};

// Function return all an object unique movies by name
export const createUniqueMovieItemArray = (movies: Movies[]) => {
  const collapsedDuplicatedMovies: any = collapseDuplicatedMovies(movies);
  const uniqueMovieItemList = Object.keys(collapsedDuplicatedMovies).map((val: string) => {
    return {
      key: val,
      value: collapsedDuplicatedMovies[val],
      data: movies.find(movie => movie.movie_title === val),
    };
  });
  return uniqueMovieItemList;
};

//This Only Check For 1 Movie
const collapseDuplicatedMovieDates = (uniqueMovieItem: FilteredMovieObj) => {
  const output: any = {};
  uniqueMovieItem.value.forEach((val: Output) => {
    const key = val.movie_date;
    const value = val.time_start;
    const value2 = val.movieId;
    output[key] = output[key] || [];
    output[key] = output[key].concat({ time_start: value, movieId: value2 });
  });
  return output;
};

export const createUniqueMovieDateArray = (uniqueMovieItem: FilteredMovieObj) => {
  const collapsedDuplicatedMovieDates = collapseDuplicatedMovieDates(uniqueMovieItem);
  const uniqueMovieDateArray = Object.keys(collapsedDuplicatedMovieDates).map(val => {
    return {
      key: val,
      value: collapsedDuplicatedMovieDates[val],
    };
  });

  return uniqueMovieDateArray;
};

/* 
    USAGE: 
    (fn) uniqueMovieArray -> return a unique lists of movies
    (fn) createUniqueMovieDateArray -> return a list of every showing

    const uniqueMovieArray = createUniqueMovieItemArray(movies);
    console.log(uniqueMovieArray);

    for (const i of uniqueMovieArray) {
    console.log(createUniqueMovieDateArray(i));
    }

*/
const uniqueMovieArray = createUniqueMovieItemArray(movies);
console.log(uniqueMovieArray);

for (const i of uniqueMovieArray) {
  console.log(createUniqueMovieDateArray(i));
}

export const singleMovie = {
  _id: '61f6ac2aa9dda0b87d4bce3d',
  movieId: '89e441b8-98ca-4456-91e9-180b1d1fefa3',
  movie_title: 'title1',
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdPsGJEBxBev7gKo_EMp0Pgk7Q7su_xTUxf3vo8dE9S_CiG2Z',
  trailer: 'trailer1',
  genres: [],
  description: 'description1',
  price: '68',
  movie_date: '2022-01-11T22:00:00.000Z',
  time_start: '18:00',
  available_sits: [
    '1a',
    '1b',
    '1c',
    '1d',
    '1e',
    '1f',
    '1g',
    '1h',
    '2a',
    '2h',
    '3a',
    '3b',
    '3c',
    '3d',
    '3e',
    '3f',
    '3g',
    '3h',
    '4a',
    '4b',
    '4c',
    '4d',
    '4e',
    '4f',
    '4g',
    '4h',
    '5a',
    '5b',
    '5c',
    '5d',
    '5e',
    '5f',
    '5g',
    '5h',
    '6a',
    '6b',
    '6c',
    '6d',
    '6e',
    '6f',
    '6g',
    '6h',
    '7a',
    '7b',
    '7c',
    '7d',
    '7e',
    '7f',
    '7g',
    '7h',
    '8a',
    '8b',
    '8f',
    '8g',
    '8h',
    '9a',
    '9b',
    '9c',
    '9d',
    '9e',
    '9f',
    '9g',
    '9h',
    '10a',
    '10b',
    '10c',
    '10d',
    '10e',
    '10f',
    '10g',
    '10h',
    '8c',
    '8d',
    '8e',
  ],
  taken_sits: ['2b', '2c', '2d', '2e', '2f', '2g'],
};
