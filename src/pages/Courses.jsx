
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { fetchCourses } from '../api';
import { FaSearch } from 'react-icons/fa';

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses().then(data => {
      setAllCourses(data);
      setFilteredCourses(data);
    });
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      const filtered = allCourses.filter(course => 
        course.category && course.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(allCourses);
    }
  }, [searchParams, allCourses]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setFilteredCourses(allCourses);
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    const filtered = allCourses.filter(course => 
      (course.title && course.title.toLowerCase().includes(term)) || 
      (course.category && course.category.toLowerCase().includes(term)) ||
      (course.description && course.description.toLowerCase().includes(term))
    );
    setFilteredCourses(filtered);
  };

  const categories = [...new Set(allCourses.map(course => course.category).filter(Boolean))];

  const filterByCategory = (category) => {
    setSearchParams({ category: category.toLowerCase() });
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm('');
    setFilteredCourses(allCourses);
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="mb-4">All Courses</h1>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSearch} className="d-flex">
            <input 
              type="text" 
              className="form-control me-2" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2">
            <button 
              onClick={clearFilters}
              className="btn btn-sm btn-outline-secondary"
            >
              All Categories
            </button>
            {categories.map((category, index) => (
              <button 
                key={index} 
                onClick={() => filterByCategory(category)}
                className={`btn btn-sm ${searchParams.get('category')?.toLowerCase() === category.toLowerCase() 
                  ? 'btn-primary' 
                  : 'btn-outline-primary'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard key={course._id || course.id} course={course} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h3>No courses found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button 
              onClick={clearFilters}
              className="btn btn-primary mt-3"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
