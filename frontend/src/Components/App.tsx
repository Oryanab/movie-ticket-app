import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Counter from './Examples/Counter';
import Student from './Examples/Student';
import Navbar from './child-components/Navbar';
import Movie from './child-components/Movies';
import { movies } from '../Utils/movieUtils';

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/student" element={<Student />} />
        <Route path="/counter" element={<Counter />} />
        {/* {movies.map(movie => (
          <Route path={`/`} element={<Movie />} />
        ))} */}
        <Route path="/" element={<Movie />} />
      </Routes>
    </Router>
  );
};
