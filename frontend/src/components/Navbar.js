import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">DiogoFLIX</Link>
        
        <ul className="navbar-nav">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/add-movie' ? 'active' : ''}>
            <Link to="/add-movie">Add Movie</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;