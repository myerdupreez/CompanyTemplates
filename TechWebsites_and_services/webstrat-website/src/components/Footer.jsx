import React from 'react';
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Heart
} from 'lucide-react';
import logoImage from '../assets/logo.png';

const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Custom Web Development', href: '#services' },
        { name: 'AI-Powered Customer Support', href: '#services' },
        { name: 'Software Solutions', href: '#services' },
        { name: 'Business Growth Consulting', href: '#services' },
        { name: 'UI/UX Design', href: '#services' },
        { name: 'E-commerce Development', href: '#services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#about' },
        { name: 'Contact Us', href: '#contact' },
  // { name: 'Case Studies', href: '#portfolio' },
  // { name: 'Testimonials', href: '#testimonials' },
  // { name: 'Our Clients', href: '#clients' },
      ],
    },
    {
      title: 'Industries',
      links: [
        { name: 'Transportation', href: '#clients' },
        { name: 'E-commerce & Retail', href: '#clients' },
        { name: 'Technology Startups', href: '#clients' },
        { name: 'Small Businesses', href: '#clients' },
        { name: 'Service Industries', href: '#clients' },
        { name: 'Consulting', href: '#clients' },
      ],
    },
  ];



  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative">
                <img 
                  src={logoImage} 
                  alt="Webstrat Logo" 
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-navy-600 to-webstrat-600 rounded-lg items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="text-xl sm:text-2xl font-bold">WebStrat IT</h3>
                <p className="text-gray-400 text-xs sm:text-sm">IT Solutions</p>
              </div>
            </div>

            <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
              Empowering businesses through innovative software solutions and AI-powered customer support. 
              We transform ideas into powerful digital experiences that drive measurable growth.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400">
                <Mail className="w-5 h-5 text-webstrat-400" />
                <span>jacques@webstratit.co.za</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400">
                <Phone className="w-5 h-5 text-webstrat-400" />
                <span>+27 82 387 4406</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-webstrat-400" />
                <span>Western Cape & Gauteng, South Africa</span>
              </div>
            </div>

            {/* Social Links removed as requested */}
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-bold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="text-gray-300 dark:text-gray-400 hover:text-webstrat-400 transition-colors duration-300 text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

  {/* Newsletter Section removed as requested */}

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>
                © {currentYear} webstratIT. All rights reserved. Built with{' '}
                <Heart className="inline w-4 h-4 text-red-500 mx-1" />
                and cutting-edge technology.
              </p>
            </div>

            {/* Legal Links removed as requested */}

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-gray-800 dark:bg-dark-700 hover:bg-webstrat-600 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

  {/* Trust Badges removed as requested */}
    </footer>
  );
};

export default Footer;
