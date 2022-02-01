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
