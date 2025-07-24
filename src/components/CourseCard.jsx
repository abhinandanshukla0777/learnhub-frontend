import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function CourseCard({ course }) {
  // Format student count (e.g., 1500 -> 1.5k)
  const formatStudentCount = (count) => {
    return count >= 1000 ? `${(count/1000).toFixed(1)}k` : count;
  };

  // Truncate long descriptions
  const truncateDescription = (description, maxLength = 100) => {
    return description.length > maxLength ? 
      `${description.substring(0, maxLength)}...` : 
      description;
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img 
          src={`${course.image}?auto=format&fit=crop&w=500`} 
          className="card-img-top" 
          alt={course.title} 
        />
        <div className="card-body">
          <div className="d-flex justify-content-between mb-2">
            <span className="badge bg-primary">{course.category}</span>
            <span className="text-warning">
              <FaStar className="me-1" /> {course.rating} ({formatStudentCount(course.students)})
            </span>
          </div>
          <h5 className="card-title">{course.title}</h5>
          <p className="card-text">{truncateDescription(course.description)}</p>
        </div>
        <div className="card-footer bg-transparent">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">₹{course.price ? course.price : 'Free'}</span>
            <span>{course.duration}</span>
            <Link to={`/courses/${course._id || course.id}`} className="btn btn-sm btn-primary">
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
