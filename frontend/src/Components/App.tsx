import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Counter from './Examples/Counter';
import Student from './Examples/Student';
import Navbar from './child-components/Navbar';
import Movie from './child-components/Movies';
import SingleMoviePage from './child-components/SingleMoviePage';
import { movies } from '../Utils/movieUtils';
import TicketPanel from './child-components/TicketPanel';

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/student" element={<Student />} />
        <Route path="/counter" element={<Counter />} />
        {movies.map(movie => (
          <Route key={movie.movieId} path={`/tickets/${movie.movieId}`} element={<SingleMoviePage />} />
        ))}
        <Route path="/ticket-panel" element={<TicketPanel />} />
        <Route path="/" element={<Movie />} />
      </Routes>
    </Router>
  );
};
