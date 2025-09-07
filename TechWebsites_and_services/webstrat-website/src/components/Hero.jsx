import React from 'react';
import { ArrowRight, Code, Server, Shield, Zap, ChevronDown, Briefcase, Database, Globe, Monitor, Cpu, Wifi, Cloud } from 'lucide-react';

const Hero = ({ scrollToSection }) => {
  const handleScroll = () => {
    scrollToSection('about');
  };

  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-webstrat-900 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-webstrat-900"></div>
        
        {/* Dynamic Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-webstrat-500/20 to-navy-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-l from-webstrat-400/15 to-transparent rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-32 left-1/4 w-64 h-64 bg-gradient-to-t from-navy-500/20 to-webstrat-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        
        {/* Tech Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="currentColor" />
                <path d="M0,50 L20,50 M30,50 L70,50 M80,50 L100,50" stroke="currentColor" strokeWidth="1" />
                <path d="M50,0 L50,20 M50,30 L50,70 M50,80 L50,100" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
        
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-webstrat-400/30 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy-300/20 to-transparent animate-pulse animation-delay-600"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-webstrat-300/25 to-transparent animate-pulse animation-delay-1200"></div>
          
          {/* Additional subtle lines */}
          <div className="absolute top-1/6 left-0 w-full h-px bg-gradient-to-r from-transparent via-webstrat-500/15 to-transparent animate-pulse animation-delay-400"></div>
          <div className="absolute top-5/6 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy-400/15 to-transparent animate-pulse animation-delay-1400"></div>
          
          {/* Long diagonal lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/3 left-0 w-4/5 h-px bg-gradient-to-r from-webstrat-400/20 via-webstrat-400/10 to-transparent animate-pulse animation-delay-800 transform rotate-12 origin-left"></div>
            <div className="absolute bottom-1/3 right-0 w-3/4 h-px bg-gradient-to-l from-navy-300/15 via-navy-300/8 to-transparent animate-pulse animation-delay-1600 transform -rotate-12 origin-right"></div>
          </div>
          
          {/* Vertical accent lines */}
          <div className="absolute top-0 left-1/5 w-px h-2/3 bg-gradient-to-b from-transparent via-webstrat-400/15 to-transparent animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/3 right-1/5 w-px h-1/2 bg-gradient-to-b from-transparent via-navy-300/12 to-transparent animate-pulse animation-delay-600"></div>
        </div>
        
        {/* Floating Tech Elements */}
        <div className="absolute top-32 right-1/4 w-16 h-16 border border-webstrat-400/30 rounded-lg animate-float animation-delay-400 transform rotate-12"></div>
        <div className="absolute bottom-40 left-1/3 w-12 h-12 border-2 border-navy-300/40 rounded-full animate-pulse animation-delay-800"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-webstrat-500/20 rounded-sm animate-float animation-delay-1600 transform -rotate-45"></div>
        
        {/* Additional geometric patterns */}
        <div className="absolute top-1/3 left-1/5 w-10 h-10 border border-webstrat-300/25 rounded transform rotate-45 animate-float animation-delay-600"></div>
        <div className="absolute bottom-1/4 right-1/5 w-6 h-6 border-2 border-navy-400/30 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-2/3 left-2/3 w-14 h-14 border-l-2 border-t-2 border-webstrat-400/20 animate-float animation-delay-200"></div>
        
        {/* Additional tech elements */}
        <div className="absolute top-1/5 right-1/3 w-8 h-20 border-r border-webstrat-300/15 animate-pulse animation-delay-800"></div>
        <div className="absolute bottom-1/5 left-1/4 w-16 h-2 bg-gradient-to-r from-transparent via-navy-400/20 to-transparent animate-pulse animation-delay-1200"></div>
        <div className="absolute top-3/5 right-1/6 w-12 h-12 border border-webstrat-400/20 rounded-lg transform rotate-12 animate-float animation-delay-400"></div>
        
        {/* Corner accent elements */}
        <div className="absolute top-24 left-1/3 w-6 h-6 border-l-2 border-b-2 border-navy-300/25 animate-pulse animation-delay-600"></div>
        <div className="absolute bottom-32 right-1/4 w-8 h-8 border-r-2 border-t-2 border-webstrat-400/25 animate-float animation-delay-1400"></div>
        
        {/* Small connector dots */}
        <div className="absolute top-2/5 left-1/6 w-2 h-2 bg-webstrat-500/30 rounded-full animate-pulse animation-delay-500"></div>
        <div className="absolute bottom-2/5 right-1/7 w-1 h-1 bg-navy-300/40 rounded-full animate-pulse animation-delay-900"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-webstrat-400/25 rounded-full animate-pulse animation-delay-1300"></div>
        
        {/* Matrix-style dots */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-8 h-full p-8">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white rounded-full animate-pulse"
                style={{ animationDelay: `${i * 200}ms`, animationDuration: '3s' }}
              />
            ))}
          </div>
        </div>
      </div>

  <div className="relative z-20 container-custom h-full flex items-start justify-center pt-4 sm:pt-8 md:pt-12 lg:pt-16 px-4 sm:px-6 lg:px-8" style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start max-w-7xl w-full">
          {/* Content */}
          <div className="text-white space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 animate-fade-in-up relative z-30">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-2 text-webstrat-400" />
              <span className="text-xs sm:text-sm md:text-base font-medium">Leading Software Solutions Provider</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight font-tech">
                <span className="block text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2 sm:mb-2 md:mb-3 lg:mb-4">Transform Your</span>
                <span className="block text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-blue-400 leading-[1.5]">Digital Future</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl mt-2 sm:mt-3 md:mt-4 lg:mt-6">
                <span className="text-xl sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 font-light leading-relaxed">WebStrat IT delivers cutting-edge software solutions that propel your business into the digital age. From custom web development to AI-powered customer support systems, we're your strategic technology partner for measurable growth.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-1 sm:pt-2 md:pt-3 lg:pt-4 relative z-40">
              <button
                onClick={() => scrollToSection('services')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-lg font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group min-h-[44px] touch-manipulation relative z-50 cursor-pointer"
              >
                Explore Our Services
                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative animate-fade-in-up animation-delay-400 mt-4 sm:mt-6 md:mt-8 ml-0 sm:ml-4 md:ml-8 pointer-events-none">
            {/* Main Tech Illustration */}
            <div className="relative">
              {/* Central Hub */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-auto bg-gradient-to-br from-webstrat-500 to-navy-600 rounded-full flex items-center justify-center shadow-2xl animate-float">
                <Code className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 text-white" />
              </div>
              
              {/* Orbiting Elements - responsive orbital pattern */}
                {/* SVG lines from hub edge to selected icons */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Hub center: (200,200), lines start even further from hub edge */}
                  {/* To Server (bottom right) */}
                  <line x1="360" y1="360" x2="420" y2="420" stroke="#38bdf8" strokeWidth="2" opacity="0.18" />
                  {/* To Cpu (top far left) */}
                  <line x1="40" y1="40" x2="10" y2="80" stroke="#38bdf8" strokeWidth="2" opacity="0.18" />
                  {/* To Monitor (very low center) */}
                  <line x1="200" y1="380" x2="200" y2="440" stroke="#38bdf8" strokeWidth="2" opacity="0.18" />
                  {/* To Shield (bottom left) */}
                  <line x1="40" y1="360" x2="0" y2="400" stroke="#38bdf8" strokeWidth="2" opacity="0.18" />
                  {/* To Cloud (bottom far right) */}
                  <line x1="380" y1="380" x2="440" y2="440" stroke="#38bdf8" strokeWidth="2" opacity="0.18" />
                  {/* To Briefcase (lower middle right) */}
                  <line x1="340" y1="340" x2="270" y2="320" stroke="#38bdf8" strokeWidth="2" opacity="0.18" />
                  {/* Additional long lines for more dynamic effect */}
                  <line x1="200" y1="200" x2="200" y2="0" stroke="#38bdf8" strokeWidth="2" opacity="0.12" />
                  <line x1="200" y1="200" x2="400" y2="200" stroke="#38bdf8" strokeWidth="2" opacity="0.12" />
                  <line x1="200" y1="200" x2="0" y2="200" stroke="#38bdf8" strokeWidth="2" opacity="0.12" />
                  <line x1="200" y1="200" x2="200" y2="400" stroke="#38bdf8" strokeWidth="2" opacity="0.12" />
                  <line x1="200" y1="200" x2="350" y2="50" stroke="#38bdf8" strokeWidth="2" opacity="0.12" />
                  <line x1="200" y1="200" x2="50" y2="350" stroke="#38bdf8" strokeWidth="2" opacity="0.12" />
                </svg>
                {/* SVG lines connecting hub to icons (further from hub, non-overlapping) */}
              <div className="absolute inset-0">
                {/* Server Icon - furthest right and lowest */}
                {/* Server Icon - repositioned higher for mobile */}
                <div className="absolute bottom-16 sm:bottom-36 md:bottom-48 right-0 transform translate-y-2 sm:translate-y-16 md:translate-y-24 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-navy-700 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                  <Server className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-webstrat-400" />
                </div>
                
                {/* Server Icon - moved down a bit, tilted slightly right */}
                <div className="absolute bottom-2 sm:bottom-6 md:bottom-10 left-12 sm:left-16 md:left-24 transform -translate-x-2 translate-y-12 sm:translate-y-16 md:translate-y-20 rotate-6 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-navy-700 rounded-lg flex items-center justify-center shadow-lg animate-pulse animation-delay-600">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white" />
                </div>
                
                {/* Code Icon - moved very much up */}
                <div className="absolute top-2 sm:top-4 md:top-6 right-8 sm:right-12 md:right-16 transform -translate-x-1/2 -translate-y-8 sm:-translate-y-12 md:-translate-y-16 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-navy-800 rounded-lg flex items-center justify-center shadow-lg animate-pulse animation-delay-1000">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-webstrat-400" />
                </div>
                
                {/* Briefcase Icon - moved to middle area with tilt */}
                <div className="absolute bottom-0 right-1/3 transform -translate-x-1/2 translate-y-10 sm:translate-y-15 md:translate-y-20 -rotate-12 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-navy-800 rounded-lg flex items-center justify-center shadow-lg animate-pulse animation-delay-800">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 text-webstrat-400" />
                </div>
                
                {/* Additional Floating Elements - scattered around */}
                <div className="absolute top-8 sm:top-12 md:top-16 left-4 sm:left-6 md:left-8 transform -translate-x-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-lg animate-float animation-delay-400"></div>
                <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-6 sm:left-8 md:left-12 transform translate-x-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-lg animate-float animation-delay-800"></div>
                
                {/* Lower positioned tech icons - moved much lower and scattered */}
                
                {/* Monitor Icon - repositioned higher for mobile */}
                {/* Monitor Icon - repositioned to avoid overlap with hub on mobile */}
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-navy-700 rounded-lg flex items-center justify-center shadow-lg animate-pulse animation-delay-1600">
                  <Monitor className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-webstrat-400" />
                </div>
                {/* Move monitor icon further down for all views */}
                <style>{`
                  @media (max-width: 639px) {
                    .monitor-mobile {
                      bottom: -32px !important;
                    }
                  }
                  @media (min-width: 640px) and (max-width: 1023px) {
                    .monitor-mobile {
                      bottom: 40px !important;
                    }
                  }
                  @media (min-width: 1024px) {
                    .monitor-mobile {
                      bottom: 60px !important;
                    }
                  }
                `}</style>
                
                <div className="absolute bottom-32 sm:bottom-40 md:bottom-44 left-2 transform translate-y-8 sm:translate-y-12 md:translate-y-16 -rotate-15 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-navy-800 rounded-lg flex items-center justify-center shadow-lg animate-float animation-delay-1800">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-webstrat-400" />
                </div>
                
                <div className="absolute bottom-24 sm:bottom-28 md:bottom-32 left-1/8 transform -translate-x-1/2 translate-y-28 sm:translate-y-36 md:translate-y-44 rotate-18 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-navy-700 rounded-lg flex items-center justify-center shadow-lg animate-pulse animation-delay-2000">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-webstrat-400" />
                </div>
                
                <div className="absolute bottom-1 sm:bottom-3 md:bottom-5 right-2 transform translate-y-64 sm:translate-y-76 md:translate-y-84 -rotate-25 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-navy-800 rounded-lg flex items-center justify-center shadow-lg animate-float animation-delay-2200">
                  <Cloud className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Connection Lines - responsive scaling */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path
                  d="M200,50 Q300,100 350,200 Q300,300 200,350 Q100,300 50,200 Q100,100 200,50"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-50 dark:from-dark-700 to-transparent z-5"></div>
    </section>
  );
};

export default Hero;
