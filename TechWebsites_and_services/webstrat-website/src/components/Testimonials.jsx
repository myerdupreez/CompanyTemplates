import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User, Building, Calendar } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const headerRef = useRef(null);
  const testimonialRef = useRef(null);
  const statsRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.animate]: true
          }));
        }
      });
    }, observerOptions);

    const refs = [headerRef, testimonialRef, statsRef];
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Falcon Bus Service',
      position: 'Transportation Company',
      company: 'Falcon Bus Service',
      avatar: '/api/placeholder/80/80',
      rating: 5,
      content: 'WebStrat IT delivered an exceptional booking and management system that transformed how we handle our bus services. The platform is user-friendly, efficient, and has significantly improved our customer experience. We are extremely satisfied with their professional approach and technical expertise.',
      project: 'Bus Booking & Management System',
      date: '2025',
      industry: 'Transportation',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="section-padding bg-white dark:bg-dark-800">
      <div className="container-custom">
        {/* Section Header */}
        <div 
          ref={headerRef}
          data-animate="header"
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible.header 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Hear what our clients have to say about their 
            experience working with Webstrat and the results they've achieved.
          </p>
        </div>

        {/* Main Testimonial Display */}
        {testimonials.length > 0 && (
          <div 
            ref={testimonialRef}
            data-animate="testimonial"
            className={`relative max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300 ${
              isVisible.testimonial 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 -translate-x-12 scale-95'
            }`}
          >
          <div className="bg-gradient-to-r from-navy-50 to-webstrat-50 dark:from-navy-900/30 dark:to-webstrat-900/30 rounded-xl p-6 md:p-8 relative overflow-hidden">
            {/* Background Quote */}
            <Quote className="absolute top-4 right-4 w-24 h-24 text-navy-100 dark:text-navy-800 opacity-30" />
            
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex space-x-1">
                  {testimonials[currentTestimonial] && renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed text-center mb-8 font-medium">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-navy-400 to-webstrat-400 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>

                {/* Details */}
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-navy-700 dark:text-navy-300 font-semibold">
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>

                {/* Project Info */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    <Building className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentTestimonial].industry}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentTestimonial].date}</span>
                  </div>
                  <p className="text-sm font-semibold text-navy-700 dark:text-navy-300">
                    Project: {testimonials[currentTestimonial].project}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-dark-700 hover:bg-gray-50 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-navy-700 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
