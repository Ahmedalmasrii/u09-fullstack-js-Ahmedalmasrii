import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
    setMessage("You have successfully logged out."); // Log out message
    setTimeout(() => setMessage(null), 3000); // Remove message after 3 seconds
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
    setMenuOpen(false); // Close both dropdown and menu after selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.services-dropdown') && !event.target.closest('.navbar-links')) {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Clean Master</Link>
        </div>
        <ul className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/offers" onClick={() => setMenuOpen(false)}>Offers</Link>
          </li>
          <li className="services-dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
              Services
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/services/residential" onClick={handleDropdownLinkClick}>Residential Cleaning</Link></li>
                <li><Link to="/services/commercial" onClick={handleDropdownLinkClick}>Commercial Cleaning</Link></li>
                <li><Link to="/services/window" onClick={handleDropdownLinkClick}>Window Cleaning</Link></li>
                <li><Link to="/services/carpet" onClick={handleDropdownLinkClick}>Carpet Cleaning</Link></li>
                <li><Link to="/services/post-construction" onClick={handleDropdownLinkClick}>Post-Construction Cleaning</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </li>
          )}
          {/* Close Button */}
          <li className="close-button">
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </li>
        </ul>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </nav>
      {message && <div className="message-box">{message}</div>} {/* Message box */}
    </>
  );
}

export default Navbar;
