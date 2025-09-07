import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Laptop } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import logoImage from '../assets/logo.png';

const Header = ({ scrollToSection, currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasClickedTheme, setHasClickedTheme] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
  // { name: 'Portfolio', id: 'portfolio' },
  // { name: 'Clients', id: 'clients' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/25 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark-800/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700' 
          : 'bg-transparent'
      }`}
      style={{ height: '80px' }}
    >
      <div className="container-custom h-full">
        <div className="flex items-center justify-between h-full py-4">
          {/* Logo */}
          <div 
            className="flex items-start space-x-3 cursor-pointer group mt-2 relative"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Webstrat Logo" 
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 transition-all duration-300 group-hover:scale-110 drop-shadow-lg hover:drop-shadow-xl"
                style={{ backgroundColor: 'transparent' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 bg-gradient-to-br from-navy-600 to-webstrat-600 rounded-lg items-center justify-center transition-all duration-300 group-hover:scale-110 drop-shadow-lg hover:drop-shadow-xl">
                <Code className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
              </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-full -ml-2 sm:-ml-1.5 md:-ml-1 lg:ml-0 transition-transform duration-300 group-hover:translate-x-1 min-w-max">
              <h1 className={`text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold transition-colors duration-300 leading-tight whitespace-nowrap font-tech ${
                isScrolled ? 'text-navy-800 dark:text-white' : 'text-white'
              }`}>
                <div className="flex flex-col">
                  <span className="block leading-tight">Webstrat IT<br/>Solutions</span>
                </div>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm lg:text-base font-medium transition-all duration-300 relative group ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-navy-700 dark:hover:text-navy-300' 
                    : 'text-gray-200 hover:text-white'
                } ${
                  currentSection === item.id ? 'font-bold' : ''
                }`}
              >
                {item.name}
                <span 
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-navy-700 dark:bg-navy-300' : 'bg-white'
                  }`}
                />
              </button>
            ))}
            {/* Theme Toggle */}
            <div className="relative" onClick={() => setHasClickedTheme(true)}>
              <ThemeToggle />
              
              {/* Bouncing pointer text */}
              {!hasClickedTheme && (
                <div className="absolute -bottom-8 -right-2 animate-bounce hidden lg:block">
                  <div className="bg-navy-600 dark:bg-navy-400 text-white dark:text-navy-900 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                    Try me! ↖
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="btn-primary"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Theme Toggle for Mobile */}
            <div onClick={() => setHasClickedTheme(true)}>
              <ThemeToggle />
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700' 
                  : 'text-white hover:bg-white/10 dark:hover:bg-white/20'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-800 shadow-lg border-t border-gray-200 dark:border-dark-700 animate-fade-in z-50">
            <nav className="py-3 sm:py-4 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 hover:text-navy-700 dark:hover:text-navy-300 transition-colors duration-300 min-h-[48px] touch-manipulation ${
                    currentSection === item.id ? 'bg-navy-50 dark:bg-navy-900/50 text-navy-700 dark:text-navy-300 font-semibold' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              <div className="px-4 sm:px-6 pt-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="btn-primary w-full justify-center text-base sm:text-lg py-3 sm:py-4"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
