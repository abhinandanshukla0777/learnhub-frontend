
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import CourseCard from '../components/CourseCard';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToAction from '../components/CallToAction';
import { fetchCourses } from '../api';

function Home() {
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(data => {
      setFilteredCourses(data.slice(0, 3));
    });
  }, []);
  
  const handleSearch = (searchTerm) => {
    fetchCourses().then(courses => {
      if (!searchTerm) {
        setFilteredCourses(courses.slice(0, 3));
        return;
      }
      const term = searchTerm.toLowerCase().trim();
      const filtered = courses.filter(course => 
        (course.title && course.title.toLowerCase().includes(term)) || 
        (course.category && course.category.toLowerCase().includes(term)) ||
        (course.description && course.description.toLowerCase().includes(term))
      );
      setFilteredCourses(filtered.slice(0, 3));
    });
  };

  return (
    <div>
      <HeroSection handleSearch={handleSearch} />
      <StatsSection />
      {/* Featured Courses */}
      <section className="courses-section py-5" id="courses">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="fw-bold">Featured Courses</h2>
            <p>Most popular courses this month</p>
          </div>
          <div className="row">
            {filteredCourses.map(course => (
              <CourseCard key={course._id || course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/courses" className="btn btn-outline-primary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
}

export default Home;
