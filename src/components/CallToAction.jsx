
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section className="cta-section py-5 bg-primary text-white">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Ready to Start Learning?</h2>
        <p className="lead mb-4">Join thousands of students advancing their careers</p>
        <Link to="/signup" className="btn btn-light btn-lg me-2">
          Get Started
        </Link>
        <Link to="/courses" className="btn btn-outline-light btn-lg">
          Browse Courses
        </Link>
      </div>
    </section>
  );
}

export default CallToAction;
