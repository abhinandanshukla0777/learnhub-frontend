
import { Link } from 'react-router-dom';
import { FaBook, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer py-4" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5><FaBook className="me-2" />LearnHub</h5>
            <p>Empowering learners worldwide with quality education.</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li><Link to="/courses?category=web">Web Development</Link></li>
              <li><Link to="/courses?category=data">Data Science</Link></li>
              <li><Link to="/courses?category=business">Business</Link></li>
              <li><Link to="/courses?category=design">Design</Link></li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><FaEnvelope className="me-2" /> contact@learnhub.com</li>
              <li><FaPhone className="me-2" /> +91-9368816981</li>
              <li><FaMapMarkerAlt className="me-2" /> Phagwara, Punjab</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <p className="mb-0">&copy; {currentYear} LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
