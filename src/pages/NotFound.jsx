
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <FaExclamationTriangle className="text-warning mb-4" style={{ fontSize: '5rem' }} />
          <h1 className="display-4 mb-4">404 - Page Not Found</h1>
          <p className="lead mb-4">
            Oops! The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            <FaHome className="me-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
