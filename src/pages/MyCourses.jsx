import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEnrolledCourses } from '../api';
import CourseCard from '../components/CourseCard';

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    fetchEnrolledCourses()
      .then(data => {
        if (Array.isArray(data)) {
          setEnrollments(data);
        } else if (data && data.message) {
          setError(data.message);
        } else {
          setError('Failed to fetch enrolled courses');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch enrolled courses');
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    if (!loading && (error || !Array.isArray(enrollments))) {
      navigate('/login');
    }
  }, [loading, error, enrollments, navigate]);

  if (loading) {
    return <div className="container py-5 mt-5 text-center"><h2>Loading...</h2></div>;
  }

  if (!Array.isArray(enrollments)) {
    return null; // Don't render anything if not valid
  }

  return (
    <div className="container py-5 mt-5">
      <h2 className="mb-4 text-center">My Courses</h2>
      {enrollments.length === 0 ? (
        <p className="text-center">You are not enrolled in any courses yet.</p>
      ) : (
        <div className="row">
          {enrollments.map(enrollment => (
            enrollment.course && <CourseCard key={enrollment._id} course={enrollment.course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses; 