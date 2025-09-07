import React, { useEffect, useRef, useState } from 'react';

const Clients = ({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState({});
  const ctaRef = useRef(null);

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

    const refs = [ctaRef];
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

  return (
    <section className="section-padding bg-gray-50 dark:bg-dark-900">
      <div className="container-custom">
        {/* Get Started Section */}
        <div 
          ref={ctaRef}
          data-animate="cta"
          className={`bg-gradient-to-r from-navy-600 to-webstrat-600 rounded-xl p-8 text-white text-center transition-all duration-1000 delay-1200 ${
            isVisible.cta 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-90 rotate-1'
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Digital Journey?
          </h3>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join Falcon Bus Service and experience the difference that quality software development 
            and dedicated support can make for your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-gray-200">Client Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-gray-200">Support Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">2025</div>
              <div className="text-gray-200">Founded & Growing</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white text-navy-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              Get A Quote
            </button>
            <button 
              className="border-2 border-white text-white hover:bg-white hover:text-navy-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
