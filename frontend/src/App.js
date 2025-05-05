import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieForm from './components/MovieForm';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/add-movie" element={<MovieForm />} />
            <Route path="/edit-movie/:id" element={<MovieForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;