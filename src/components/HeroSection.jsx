import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function HeroSection({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <header className="hero-section" id="home">
      <div className="container text-center py-5">
        <h1 className="fw-bold mb-4">Learn Without Limits</h1>
        <p className="lead mb-5">Access 5,000+ courses from industry experts</p>
        <form className="search-box mx-auto mb-4" onSubmit={onSubmit}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button type="submit" className="btn btn-primary">
            <FaSearch />
          </button>
        </form>
        <div>
          <Link to="/courses" className="btn btn-primary btn-lg me-2">
            Start Learning
          </Link>
          <Link to="/courses" className="btn btn-outline-light btn-lg">
            View Courses
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
