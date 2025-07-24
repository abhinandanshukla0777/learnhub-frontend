import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Developer",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      text: "LearnHub transformed my career. The courses are practical and well-structured!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "The best investment I've made in my professional development."
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "The instructors are top-notch and the content is always up-to-date with industry standards."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((activeIndex + 1) % testimonials.length);
  };

  return (
    <section className="testimonials-section py-5" id="testimonials">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2 className="fw-bold">Student Testimonials</h2>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-slide">
                <div className="testimonial text-center">
                  <img 
                src={testimonials[activeIndex].image} 
                    className="rounded-circle mb-3" 
                alt={testimonials[activeIndex].name} 
                  />
              <p className="lead">"{testimonials[activeIndex].text}"</p>
              <h5>{testimonials[activeIndex].name}</h5>
              <p>{testimonials[activeIndex].role}</p>
              </div>
          </div>
          <button 
            className="carousel-control-prev" 
            type="button" 
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          <button 
            className="carousel-control-next" 
            type="button"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
