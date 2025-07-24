
import { FaLaptop, FaPeopleCarry, FaAward } from 'react-icons/fa';

function FeaturesSection() {
  return (
    <section className="features-section py-5 bg-light" id="features">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="fw-bold">Why Choose LearnHub?</h2>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-card text-center p-4">
              <FaLaptop className="feature-icon" />
              <h4>Learn Anywhere</h4>
              <p>Access courses on any device, anytime</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card text-center p-4">
              <FaPeopleCarry className="feature-icon" />
              <h4>Expert Instructors</h4>
              <p>Learn from industry professionals</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card text-center p-4">
              <FaAward className="feature-icon" />
              <h4>Certification</h4>
              <p>Get recognized certificates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
