import Movie from '../../schemas/moviesSchema';

export const returnAvailableSeats = () => {
  let AvailableSeats = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let num = 1; num < 10; num++) {
    for (let char of letters) {
      AvailableSeats.push(`${num}${char}`);
    }
  }
  return AvailableSeats;
};

export const updateMovieSeats = async (action: string, seats: Array<string>, movie_id: string) => {
  switch (action) {
    case 'add':
      try {
        for (let seat of seats) {
          await Movie.findOneAndUpdate({ movieId: movie_id }, { $push: { taken_sits: seat } });
          await Movie.findOneAndUpdate({ movieId: movie_id }, { $pull: { available_sits: seat } });
        }
      } catch (err) {
        throw err;
      }
      break;
    case 'remove':
      try {
        for (let seat of seats) {
          await Movie.findOneAndUpdate({ movieId: movie_id }, { $pull: { taken_sits: seat } });
          await Movie.findOneAndUpdate({ movieId: movie_id }, { $push: { available_sits: seat } });
        }
      } catch (err) {
        throw err;
      }
      break;
    default:
      return;
  }
};
