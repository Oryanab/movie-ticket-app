import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Counter from './Examples/Counter';
import Student from './Examples/Student';
import Navbar from './child-components/Navbar';
export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/student" element={<Student />} />
        <Route path="/counter" element={<Counter />} />
        <Route
          path="/"
          element={
            <>
              <h1>homepage</h1>
            </>
          }
        />
      </Routes>
    </Router>
  );
};
