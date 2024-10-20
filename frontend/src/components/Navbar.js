import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import searchData from "./searchData"; // Importera searchData
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
    setMessage("Du har loggats ut.");
    setTimeout(() => setMessage(null), 3000);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  // Funktion för att hantera sökförändringar
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

  // Funktion för att navigera till vald sida
  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setFilteredResults([]);
    setMenuOpen(false);
  };

  // Funktion för att hantera formulärinsändning (valfritt)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      // Om du vill navigera direkt till en specifik sida baserat på sökningen
      const exactMatch = searchData.find(
        (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
      );
      if (exactMatch) {
        handleResultClick(exactMatch.path);
      } else {
        // Om ingen exakt matchning, navigera till första filtrerade resultat
        if (filteredResults.length > 0) {
          handleResultClick(filteredResults[0].path);
        }
      }
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Clean Master</Link>
        </div>
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
          <li className="close-button">
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </li>

          {/* Sökrutan */}
          <li className="navbar-search">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Sök..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" disabled={!searchQuery.trim()}>
                Sök
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
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </nav>
      {message && <div className="message-box">{message}</div>}
    </>
  );
}

export default Navbar;
