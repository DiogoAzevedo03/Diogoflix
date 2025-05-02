import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Diogoflix Movie</h1>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;