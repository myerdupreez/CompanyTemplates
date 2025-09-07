import React, { useEffect, useRef, useState } from 'react';
import { Users, Target, Award, Lightbulb, Globe, TrendingUp } from 'lucide-react';

const About = ({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState({});
  const headerRef = useRef(null);
  const storyRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

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

    const refs = [headerRef, storyRef, statsRef, valuesRef, teamRef];
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

  const stats = [
    { number: '2025', label: 'Founded', icon: Award },
    { number: '1+', label: 'Successful Projects', icon: Target },
    { number: '1+', label: 'Happy Clients', icon: Users },
    { number: '2', label: 'Expert Team Members', icon: Globe },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We leverage creativity and technology to deliver modern solutions that drive business growth.',
    },
    {
      icon: Users,
      title: 'Client-Centered',
      description: 'Your goals shape every decision we make. We partner with clients, not just provide services.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'From design to execution, we uphold the highest standards in every project we deliver.',
    },
    {
      icon: TrendingUp,
      title: 'Results-Driven',
      description: 'Our focus is on measurable outcomes that grow businesses and deliver real value.',
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-dark-700 relative overflow-hidden pt-8 pb-16 md:pb-20 lg:pb-24">
      <div className="container-custom relative z-20">
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            About <span className="gradient-text">WebStrat IT</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Founded in 2025 with a vision to bridge the gap between technology and business success, 
            WebStrat IT is South Africa's emerging leader in custom software solutions and AI-powered business growth.
          </p>
        </div>

        <div className="space-y-20">
          {/* Story Section - Full Width Hero Style */}
          <div 
            ref={storyRef}
            data-animate="story"
            className={`transition-all duration-1000 delay-300 ${
              isVisible.story 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-r from-navy-600 to-webstrat-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/5 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-24 sm:translate-x-24 md:-translate-y-32 md:translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-white/5 rounded-full translate-y-12 -translate-x-12 sm:translate-y-18 sm:-translate-x-18 md:translate-y-24 md:-translate-x-24"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">Our Story</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                  <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed">
                    <p>
                      WebStrat IT was founded in 2025 by two passionate technologists, <strong>Jacques (Founder & CEO)</strong> and <strong>Myer (Co-founder & CTO)</strong>, 
                      with a powerful belief: technology should empower businesses to achieve measurable growth, not complicate operations.
                    </p>
                    <p>
                      Based across Western Cape and Gauteng, South Africa, we specialize in designing and developing high-quality, 
                      user-focused software solutions with advanced AI-powered customer support systems.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 w-full">
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-bold mb-4 text-white">Our Promise</h4>
                        <p className="text-lg font-medium leading-relaxed text-white/90">
                          Though we're a new company, our commitment to <span className="text-blue-200 font-semibold">excellence</span>, <span className="text-blue-200 font-semibold">innovation</span>, and <span className="text-blue-200 font-semibold">client-centered partnerships</span> positions us as South Africa's emerging consulting solutions partner.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision - Side by Side Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-600 p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-webstrat-500 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                To design and develop high-quality, user-focused software solutions that drive growth, with the option to 
                integrate advanced AI-powered customer support systems for businesses that want to enhance customer experience and efficiency.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-navy-50 to-webstrat-50 dark:from-navy-900/30 dark:to-webstrat-900/30 p-10 rounded-2xl border border-navy-200 dark:border-navy-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-webstrat-500 to-navy-500 rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                To become South Africa's go-to consulting solutions partner, known for combining exceptional design, 
                advanced software solutions, and business insight — delivering measurable results for every client.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div 
            ref={statsRef}
            data-animate="stats"
            className={`transition-all duration-1000 delay-600 ${
              isVisible.stats 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="bg-gray-100 dark:bg-dark-600 rounded-3xl p-10 md:p-12">
              {/* Team Section */}
              <div className="bg-white dark:bg-dark-500 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <Users className="w-16 h-16 mx-auto mb-4 text-webstrat-600" />
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Meet Our Founding Team</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Two passionate professionals dedicated to your success
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <div className="bg-gradient-to-br from-navy-500 to-webstrat-500 rounded-xl p-6 text-white text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8" />
                    </div>
                    <h5 className="font-bold text-xl mb-1">Jacques</h5>
                    <p className="text-blue-100 mb-3">Founder & CEO</p>
                    <p className="text-sm text-blue-200">jacques@webstratit.co.za</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-webstrat-500 to-navy-500 rounded-xl p-6 text-white text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8" />
                    </div>
                    <h5 className="font-bold text-xl mb-1">Myer</h5>
                    <p className="text-blue-100 mb-3">Co-founder & CTO</p>
                    <p className="text-sm text-blue-200">myer@webstratit.co.za</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div 
          ref={valuesRef}
          data-animate="values"
          className={`space-y-12 transition-all duration-1000 delay-900 ${
            isVisible.values 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
        >
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-dark-600 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-navy-100 to-webstrat-100 dark:from-navy-800 dark:to-webstrat-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-navy-600 group-hover:to-webstrat-600 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-navy-600 dark:text-navy-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-navy-600 to-webstrat-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-gray-200 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful companies who trust webstratIT with their digital transformation journey.
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-navy-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
