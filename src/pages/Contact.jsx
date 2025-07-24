
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Contact form submitted:', formData);
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Hide success message after 4 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
      }, 1500);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="mb-3">Contact Us</h1>
          <p className="lead">Have questions or feedback? We'd love to hear from you.</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title mb-4">Get In Touch</h4>
              <div className="d-flex mb-3">
                <div className="me-3 text-primary">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">contact@learnhub.com</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="me-3 text-primary">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h5 className="mb-1">Phone</h5>
                  <p className="mb-0">+91-9368816981</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="me-3 text-primary">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h5 className="mb-1">Address</h5>
                  <p className="mb-0">
                    LearnHub Headquarters<br />
                    123 Education Lane<br />
                    Phagwara, Punjab<br />
                    India - 144401
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Send a Message</h4>
              
              {showSuccess && (
                <div className="alert alert-success" role="alert">
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter message subject"
                  />
                  {errors.subject && (
                    <div className="invalid-feedback">{errors.subject}</div>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="ratio ratio-21x9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.8972976609297!2d75.69558251495608!3d31.2546575811454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f5e9c89e20d%3A0x5f334f98d6f654a9!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1629271702622!5m2!1sen!2sin" 
                  width="600" 
                  height="450" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy"
                  title="LearnHub Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
