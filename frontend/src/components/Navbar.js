// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Clean Master</Link>
      </div>
      <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/offers">Offers</Link>
        </li>
        <li
          className="services-dropdown"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <Link to="/services">Services</Link>
          {dropdownOpen && (
            <ul
              className="dropdown-menu"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <li><Link to="/services/residential">Residential Cleaning</Link></li>
              <li><Link to="/services/commercial">Commercial Cleaning</Link></li>
              <li><Link to="/services/window">Window Cleaning</Link></li>
              <li><Link to="/services/carpet">Carpet Cleaning</Link></li>
              <li><Link to="/services/post-construction">Post-Construction Cleaning</Link></li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
}

export default Navbar;
