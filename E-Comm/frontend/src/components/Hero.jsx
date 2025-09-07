import { useState, useEffect } from 'react';
import { AnimatedSection } from '../utils/scrollAnimations.jsx';

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const heroTexts = [
    "Experience the bold flavors of KadiPore's small batch hot sauce.",
    "Handcrafted in South Africa with fresh, locally grown chillies.",
    "Each batch uniquely flavored for a distinct taste profile.",
    "Join us in celebrating authentic, homemade hot sauce.",
    "From our farm to your table, we deliver uncompromising quality.",
    "Passionate about creating the perfect balance of heat and flavor.",
    "Discover the art of traditional chilli farming and sauce making.",
    "Supporting local agriculture while bringing you exceptional products.",
    "Every bottle tells the story of South African heritage and craftsmanship.",
    "Committed to sustainable farming practices and natural ingredients."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection animation="fade-in-up" delay={0}>
          <img 
            src="/logo.jpeg" 
            alt="KadiPore Chilli Farms Logo" 
            className="h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96 w-auto mx-auto mb-4 sm:mb-6 md:mb-8"
          />
        </AnimatedSection>

        {/* Hero Text - Multiple Lines */}
        <AnimatedSection animation="fade-in-up" delay={300} className="mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6">
            <AnimatedSection animation="slide-in-left" delay={500}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight">
                Experience the <span className="text-red-400 animate-pulse-slow">Bold Flavors</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-right" delay={700}>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-semibold leading-relaxed">
                of KadiPore's <span className="text-red-400">Small Batch</span> Hot Sauce
              </h2>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-in" delay={900}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed">
                Handcrafted in <span className="text-blue-300 font-medium">South Africa</span> with fresh, locally grown chillies
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-in" delay={1100}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-300 font-medium italic">
                Join us in celebrating <span className="text-white">authentic, homemade</span> hot sauce
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Key Points */}
        <AnimatedSection animation="fade-in-up" delay={1300} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <AnimatedSection animation="fade-in-up" delay={1500}>
            <div className="relative bg-gradient-to-br from-black/70 to-red-900/20 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-l-4 border-red-400 hover:border-red-300 transition-all duration-300 group hover:transform hover:-translate-y-1 shadow-lg shadow-red-500/20">
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <h3 className="text-white font-bold mb-3">
                <span className="block text-lg sm:text-xl lg:text-2xl leading-tight">Small Batch</span>
                <span className="block text-sm sm:text-base lg:text-lg font-semibold text-red-400">Quality</span>
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">Handcrafted with care for exceptional taste</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={1700}>
            <div className="relative bg-gradient-to-br from-black/70 to-red-900/20 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-red-400 hover:border-red-300 transition-all duration-300 group hover:transform hover:-translate-y-1 shadow-lg shadow-red-500/20">
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <h3 className="text-white font-bold mb-3">
                <span className="block text-2xl leading-tight">Locally</span>
                <span className="block text-lg font-semibold text-red-400">Grown</span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed italic">Fresh South African chillies from our farms</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-up" delay={1900}>
            <div className="relative bg-gradient-to-br from-black/70 to-red-900/20 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-red-400 hover:border-red-300 transition-all duration-300 group hover:transform hover:-translate-y-1 shadow-lg shadow-red-500/20">
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <h3 className="text-white font-bold mb-3">
                <span className="block text-2xl leading-tight">Unique</span>
                <span className="block text-lg font-semibold text-red-400">Flavors</span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed italic">Distinct taste profiles to ignite your palate</p>
            </div>
          </AnimatedSection>
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection animation="fade-in-up" delay={2100} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Our Products
          </button>
          <button 
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Story
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;