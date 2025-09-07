import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Code, Globe, Smartphone, Database } from 'lucide-react';

const Portfolio = ({ scrollToSection }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const projectRef = useRef(null);
  const gridRef = useRef(null);
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

    const refs = [headerRef, filtersRef, projectRef, gridRef, ctaRef];
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

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'transport', name: 'Transportation' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Falcon Bus Service Booking System',
      category: 'web',
      image: '/api/placeholder/600/400',
      description: 'A comprehensive bus booking and management platform featuring automated booking processes, real-time scheduling, and a user-friendly interface for both passengers and administrators.',
      technologies: ['Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
      metrics: ['Fully Automated Booking', 'Reactive User Interface', 'Real-time Updates'],
      client: 'Falcon Bus Service',
      year: '2025',
    },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'web': return Globe;
      case 'transport': return Database;
      default: return Code;
    }
  };

  return (
    <section className="section-padding bg-gray-50 dark:bg-dark-900">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef}
          data-animate="header"
          className={`text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ${
            isVisible.header 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Explore our featured project showcasing how we've helped Falcon Bus Service transform their 
            booking operations with modern technology and user-centered design.
          </p>
        </div>

        {/* Category Filter */}
        <div 
          ref={filtersRef}
          data-animate="filters"
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
            isVisible.filters 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 -translate-x-8 scale-95'
          }`}
        >
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setCurrentSlide(0);
                }}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-navy-700 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Projects Showcase */}
        {filteredProjects.length > 0 && (
          <div 
            ref={projectRef}
            data-animate="project"
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible.project 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main Project Display */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Project Image */}
                <div className="relative h-64 lg:h-auto bg-gradient-to-br from-navy-600 to-webstrat-600 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <Code className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold mb-2">{filteredProjects[currentSlide].title}</h3>
                    <p className="text-gray-200">{filteredProjects[currentSlide].client}</p>
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                    {filteredProjects[currentSlide].year}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {filteredProjects[currentSlide].title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {filteredProjects[currentSlide].description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {filteredProjects[currentSlide].technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-navy-100 dark:bg-navy-900/50 text-navy-700 dark:text-navy-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Results</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {filteredProjects[currentSlide].metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg text-center"
                        >
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {filteredProjects.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-dark-800/90 hover:bg-white dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-dark-800/90 hover:bg-white dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Slide Indicators */}
            {filteredProjects.length > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-navy-700 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div 
          ref={ctaRef}
          data-animate="cta"
          className={`mt-20 text-center transition-all duration-1000 delay-800 ${
            isVisible.cta 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-90'
          }`}
        >
          <div className="bg-gradient-to-r from-navy-600 to-webstrat-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your Next Project?
            </h3>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let's discuss your business needs and create a custom solution that drives results. 
              From web applications to automation systems, we're here to help.
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-navy-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// export default Portfolio;
