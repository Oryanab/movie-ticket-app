import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './child-components/Navbar';
import Movie from './child-components/Movies';
import ThankYouPage from './child-components/ThankYouPage';
import SingleMoviePage from './child-components/SingleMoviePage';
import TicketPanel from './child-components/TicketPanel';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../Redux/Types/storeTypes';
import { getMoviesList } from '../Redux/Actions/moviesReducerActions';
import { Movies } from '../Redux/Types/generalTypes';

export const App: React.FC = () => {
  const Dispatch = useDispatch();
  const movies: Movies[] = useSelector((state: State) => state.moviesList);
  useEffect(() => {
    Dispatch(getMoviesList());
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {movies.map(movie => (
          <Route key={movie.movieId} path={`/tickets/${movie.movieId}`} element={<SingleMoviePage />} />
        ))}
        <Route path="/ticket-panel" element={<TicketPanel />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/" element={<Movie />} />
      </Routes>
    </Router>
  );
};
