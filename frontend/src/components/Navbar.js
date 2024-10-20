// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import searchData from "./searchData"; // Import search data
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
    setMessage("You have been logged out.");
    setTimeout(() => setMessage(null), 3000);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Toggle services dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown and menu when a link is clicked
  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = searchData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  // Navigate to selected search result
  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setFilteredResults([]);
    setMenuOpen(false);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // Navigate directly to a specific page based on search
      const exactMatch = searchData.find(
        (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
      );
      if (exactMatch) {
        handleResultClick(exactMatch.path);
      } else {
        // If no exact match, navigate to first filtered result
        if (filteredResults.length > 0) {
          handleResultClick(filteredResults[0].path);
        }
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">Clean Master</Link>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/offers" onClick={() => setMenuOpen(false)}>
              Offers
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="services-dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
              Services
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/services/residential"
                    onClick={handleDropdownLinkClick}
                  >
                    Residential Cleaning
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/commercial"
                    onClick={handleDropdownLinkClick}
                  >
                    Commercial Cleaning
                  </Link>
                </li>
                <li>
                  <Link to="/services/window" onClick={handleDropdownLinkClick}>
                    Window Cleaning
                  </Link>
                </li>
                <li>
                  <Link to="/services/carpet" onClick={handleDropdownLinkClick}>
                    Carpet Cleaning
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/post-construction"
                    onClick={handleDropdownLinkClick}
                  >
                    Post-Construction Cleaning
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>
              Book Service
            </Link>
          </li>

          {/* User Authentication Links */}
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </li>
              {user && user.isAdmin && (
                <li>
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}

          {/* Close Button for Mobile Menu */}
          <li className="close-button">
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </li>

          {/* Search Bar */}
          <li className="navbar-search">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" disabled={!searchQuery.trim()}>
                Search
              </button>
            </form>
            {filteredResults.length > 0 && (
              <ul className="search-results">
                {filteredResults.map((item) => (
                  <li key={item.path}>
                    <button onClick={() => handleResultClick(item.path)}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Hamburger Menu Button for Mobile */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </nav>

      {/* Success Message Alert */}
      {message && <div className="message-box">{message}</div>}
    </>
  );
}

export default Navbar;
