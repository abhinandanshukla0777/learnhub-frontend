
import { FaCheckCircle } from 'react-icons/fa';

function About() {
  return (
    <div className="container py-5 mt-5">
      <div className="row mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h1 className="mb-4">About LearnHub</h1>
          <p className="lead">Transforming Education Through Technology</p>
          <p>
            LearnHub is a premier online learning platform dedicated to providing high-quality educational 
            content to students worldwide. Our mission is to make quality education accessible to everyone,
            regardless of their location or background.
          </p>
          <p>
            Founded in 2018, LearnHub has grown to become one of the leading e-learning platforms with over
            10,000 students enrolled in various courses across different disciplines. Our team of expert
            instructors brings real-world experience and academic excellence to deliver practical knowledge
            that helps students advance their careers.
          </p>
          <div className="mt-4">
            <h4>Our Core Values</h4>
            <div className="d-flex align-items-center mb-2">
              <FaCheckCircle className="text-success me-2" />
              <span><strong>Excellence</strong> - Delivering high-quality education</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaCheckCircle className="text-success me-2" />
              <span><strong>Accessibility</strong> - Making learning available to everyone</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaCheckCircle className="text-success me-2" />
              <span><strong>Innovation</strong> - Embracing new technologies and teaching methods</span>
            </div>
            <div className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-2" />
              <span><strong>Community</strong> - Building a supportive learning environment</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800" 
            alt="Team working together" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-5">Our Journey</h2>
          <div className="timeline position-relative">
            <div className="row mb-5">
              <div className="col-md-6 text-md-end">
                <h4>2018</h4>
                <p>LearnHub was founded with a mission to democratize education</p>
              </div>
              <div className="col-md-6">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500" 
                  alt="Founding team" 
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-6">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500" 
                  alt="Growth phase" 
                  className="img-fluid rounded shadow-sm"
                />
              </div>
              <div className="col-md-6">
                <h4>2020</h4>
                <p>Expanded our course offerings and reached 5,000 students milestone</p>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-md-6 text-md-end">
                <h4>2022</h4>
                <p>Introduced advanced learning technology and interactive features</p>
              </div>
              <div className="col-md-6">
                <img 
                  src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=500" 
                  alt="Technology expansion" 
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500" 
                  alt="Present day" 
                  className="img-fluid rounded shadow-sm"
                />
              </div>
              <div className="col-md-6">
                <h4>2023 - Present</h4>
                <p>Growing globally with partnerships across educational institutions and industry leaders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h2>Meet Our Team</h2>
          <p className="mb-5">The passionate individuals behind LearnHub's success</p>
        </div>
        {[
          {
            name: 'Dr. Sarah Johnson',
            role: 'Founder & CEO',
            image: 'https://randomuser.me/api/portraits/women/23.jpg',
            bio: 'Ph.D. in Education Technology with 15+ years of experience in e-learning'
          },
          {
            name: 'Michael Chen',
            role: 'Chief Technology Officer',
            image: 'https://randomuser.me/api/portraits/men/54.jpg',
            bio: 'Former Google engineer with expertise in building scalable educational platforms'
          },
          {
            name: 'Emma Williams',
            role: 'Head of Content',
            image: 'https://randomuser.me/api/portraits/women/33.jpg',
            bio: 'Curriculum development specialist with background in instructional design'
          }
        ].map((member, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 text-center">
              <img 
                src={member.image} 
                className="card-img-top rounded-circle mx-auto mt-4"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                alt={member.name}
              />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-subtitle text-primary mb-2">{member.role}</p>
                <p className="card-text">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
