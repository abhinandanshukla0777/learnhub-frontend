
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';
import { enrollInCourse } from '../api';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [enrollMessage, setEnrollMessage] = useState('');
  const [enrollError, setEnrollError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`${API_BASE}/api/courses/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Course not found');
        return res.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [id]);

  const handleEnroll = async () => {
    setEnrollMessage('');
    setEnrollError('');
    setEnrolling(true);
    try {
      // Always use course._id if available, fallback to id
      const courseId = course._id || course.id;
      const result = await enrollInCourse(courseId);
      console.log('Enroll API response:', result);
      if (result && (result._id || result.message === 'Already enrolled')) {
        setEnrollMessage('Enrolled successfully!');
      } else {
        setEnrollError(result.message || JSON.stringify(result) || 'Failed to enroll');
      }
    } catch (err) {
      setEnrollError(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <div className="container py-5 mt-5 text-center"><h2>Loading...</h2></div>;
  }

  if (error || !course) {
    return (
      <div className="container py-5 mt-5 text-center">
        <h2>Course not found</h2>
        <p>The course you're looking for doesn't exist.</p>
        <Link to="/courses" className="btn btn-primary mt-3">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="course-header bg-light">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="mb-3">{course.title}</h1>
              <p className="lead">{course.description}</p>
              <div className="d-flex align-items-center mb-3 gap-3">
                <span className="badge rounded-pill bg-primary">{course.category}</span>
                <span><FaStar className="text-warning me-1" /> {course.rating}</span>
                <span><FaUsers className="me-1" /> {course.students} students</span>
                <span><FaClock className="me-1" /> {course.duration}</span>
              </div>
              <p>Created by <strong>{course.instructor && typeof course.instructor === 'object' ? (course.instructor.name || course.instructor.email) : (course.instructor || 'Unknown Instructor')}</strong></p>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <img 
                  src={`${course.image}?auto=format&fit=crop&w=500`} 
                  className="card-img-top" 
                  alt={course.title} 
                />
                <div className="card-body text-center">
                  <h4 className="card-title mb-3">${course.price}</h4>
                  {isLoggedIn ? (
                    <>
                      <button className="btn btn-primary w-100 mb-2" onClick={handleEnroll} disabled={enrolling}>{enrolling ? 'Enrolling...' : 'Enroll Now'}</button>
                      {enrollMessage && <p className="text-success mt-2">{enrollMessage}</p>}
                      {enrollError && <p className="text-danger mt-2">{enrollError}</p>}
                    </>
                  ) : (
                    <p className="text-danger">Please log in to enroll.</p>
                  )}
                  <p className="card-text text-muted small">30-Day Money-Back Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-5">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </li>
        </ul>
        
        {activeTab === 'overview' && (
          <div>
            <h3>About this course</h3>
            <p>This comprehensive course will take you from beginner to advanced level. You'll learn all the essential concepts, techniques, and best practices related to {course.title}.</p>
            
            <h4 className="mt-4">What you'll learn</h4>
            <div className="row">
              <div className="col-md-6">
                <ul>
                  <li>Core concepts and fundamentals</li>
                  <li>Practical, hands-on projects</li>
                  <li>Industry-standard tools and techniques</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul>
                  <li>Best practices and advanced strategies</li>
                  <li>Real-world problem solving</li>
                  <li>Career guidance and job preparation</li>
                </ul>
              </div>
            </div>
            
            <h4 className="mt-4">Requirements</h4>
            <ul>
              <li>Basic computer knowledge</li>
              <li>No prior experience in {course.category} needed</li>
              <li>Willingness to learn and practice</li>
            </ul>
          </div>
        )}
        
        {activeTab === 'curriculum' && (
          <div>
            <h3>Course Content</h3>
            <p>This course includes 10 sections with over 50 lectures and hands-on exercises.</p>
            
            <div className="accordion mt-4" id="courseContent">
              {[1, 2, 3].map(section => (
                <div className="accordion-item" key={section}>
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#section${section}`}
                    >
                      Section {section}: {section === 1 ? 'Introduction' : section === 2 ? 'Fundamentals' : 'Advanced Topics'}
                    </button>
                  </h2>
                  <div id={`section${section}`} className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Lecture 1: Getting Started
                          <span className="badge bg-primary rounded-pill">15 min</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Lecture 2: Core Concepts
                          <span className="badge bg-primary rounded-pill">22 min</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          Lecture 3: Practical Exercise
                          <span className="badge bg-primary rounded-pill">18 min</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <h3>Student Reviews</h3>
            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                <h2 className="mb-0">{course.rating}</h2>
                <div className="text-warning">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(course.rating) ? 'text-warning' : 'text-muted'} />
                  ))}
                </div>
                <p className="text-muted">{course.students} reviews</p>
              </div>
              <div className="flex-grow-1">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="d-flex align-items-center mb-1">
                    <div className="text-muted me-2">{rating} stars</div>
                    <div className="progress flex-grow-1" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar bg-warning" 
                        role="progressbar" 
                        style={{ 
                          width: 
                            rating === 5 ? '70%' : 
                            rating === 4 ? '20%' : 
                            rating === 3 ? '5%' : 
                            rating === 2 ? '3%' : '2%' 
                        }} 
                      ></div>
                    </div>
                    <div className="ms-2 text-muted small">
                      {
                        rating === 5 ? '70%' : 
                        rating === 4 ? '20%' : 
                        rating === 3 ? '5%' : 
                        rating === 2 ? '3%' : '2%'
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-top pt-4">
              {[1, 2, 3].map(review => (
                <div key={review} className="mb-4 pb-4 border-bottom">
                  <div className="d-flex mb-3">
                    <img 
                      src={`https://randomuser.me/api/portraits/${review % 2 === 0 ? 'women' : 'men'}/${20 + review}.jpg`} 
                      alt="Reviewer" 
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />
                    <div>
                      <h5 className="mb-0">
                        {review === 1 ? 'John Smith' : review === 2 ? 'Emily Johnson' : 'Robert Chen'}
                      </h5>
                      <div className="text-warning">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < (review === 3 ? 4 : 5) ? 'text-warning' : 'text-muted'} size={12} />
                        ))}
                        <span className="text-muted ms-2">2 months ago</span>
                      </div>
                    </div>
                  </div>
                  <p>
                    {review === 1 
                      ? "Excellent course! I learned so much and the instructor explained complex topics in a way that's easy to understand." 
                      : review === 2 
                        ? "The projects were practical and relevant to real-world scenarios. Highly recommend for anyone wanting to advance in this field." 
                        : "Good course overall, but some sections could have been more in-depth. Still, I learned a lot of valuable skills."
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
