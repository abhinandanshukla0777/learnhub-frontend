import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBook, FaSun, FaMoon, FaBars } from 'react-icons/fa';

function NavBar({ darkMode, toggleDarkMode }) {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    // Listen for login/logout events from other tabs and custom event in this tab
    const handleStorage = () => {
      console.log('[NavBar] storage event: token is', localStorage.getItem('token'));
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    const handleAuthChanged = () => {
      console.log('[NavBar] authChanged event: token is', localStorage.getItem('token'));
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('authChanged', handleAuthChanged);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('authChanged', handleAuthChanged);
    };
  }, []);

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaBook className="me-2" />LearnHub
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setExpanded(!expanded)}
          aria-controls="navbarNav" 
          aria-expanded={expanded ? "true" : "false"} 
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div className={`navbar-collapse ${expanded ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/courses" onClick={closeNavbar}>
                Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" onClick={closeNavbar}>
                Contact
              </NavLink>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={closeNavbar}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup" onClick={closeNavbar}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/mycourses" onClick={closeNavbar}>
                    My Courses
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile" onClick={closeNavbar}>
                    My Profile
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <button 
                onClick={toggleDarkMode} 
                className="btn btn-link nav-link" 
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
