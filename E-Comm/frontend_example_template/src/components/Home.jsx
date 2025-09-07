/**
 * Home Component
 * 
 * Main landing page for Falcon Bus Service & Beyers Busdiens
 * Displays company information, services, and credentials
 */

import { MapPin, Clock, Shield, Users, Award, Phone, Mail, Calendar } from 'lucide-react';

const Home = ({ onViewRoutes, onViewTerms }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Logo on the left */}
            <div className="flex-shrink-0 mb-6 sm:mb-8 md:mb-0 md:mr-12">
              <img 
                src="/logo.png" 
                alt="Falcon Bus Service Logo" 
                className="h-48 sm:h-64 md:h-96 w-auto mx-auto md:mx-0 md:-ml-8 transition-all duration-500 hover:scale-110 animate-pulse hover:animate-none"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div 
                className="text-6xl sm:text-9xl hidden animate-bounce"
              >
                🚌
              </div>
            </div>
            
            {/* Content on the right */}
            <div className="flex-1 md:ml-12 text-center md:text-left max-w-2xl">
              {/* Company Names */}
              <div className="mb-6 sm:mb-8 animate-fade-in-up">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                  FALCON
                </h1>
                <div className="text-lg sm:text-xl md:text-2xl text-red-500 font-semibold mb-2">
                  Bus Service
                </div>
                <div className="text-xs sm:text-sm text-gray-400 italic leading-relaxed">
                  & Beyers Busdiens / Bus Service Amalgamated
                </div>
              </div>

              {/* Value Proposition */}
              <div className="mb-8 animate-fade-in-up animation-delay-200">
                <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed">
                  Your trusted partner for 
                  <span className="text-red-500 font-semibold"> safe</span>,
                  <span className="text-red-500 font-semibold"> comfortable</span>, and
                  <span className="text-red-500 font-semibold"> affordable</span> journeys
                </p>
              </div>

              {/* Routes Display */}
              <div className="mb-8 animate-fade-in-up animation-delay-400">
                <h3 className="text-red-500 font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="text-red-500 text-lg">📍</span>
                  Our Routes
                </h3>
                <div className="space-y-4">
                  {/* Route 1 */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 border-l-4 border-red-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-500" />
                        <span className="text-white font-medium">Phalaborwa ↔ Tzaneen ↔ Pretoria</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Wed • Fri • Sun</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Route 2 */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 border-l-4 border-red-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-500" />
                        <span className="text-white font-medium">Pretoria ↔ Potchefstroom</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Fri • Sun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="animate-fade-in-up animation-delay-600">
                <button
                  onClick={onViewRoutes}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-10 py-5 rounded-xl text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-red-400 hover:border-red-300"
                >
                  <div className="flex items-center gap-3">
                    <span>View Routes & Book Now</span>
                    <span>→</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              We provide reliable transportation services across key routes in South Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Group Excursions */}
            <div className="bg-black text-white rounded-lg p-6 text-center border-2 border-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-gray-800 group animate-fade-in-up animation-delay-200">
              <Users className="w-12 h-12 text-white mx-auto mb-4 group-hover:animate-spin-slow transition-all duration-300" />
              <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-200">Group Excursions</h3>
              <p className="text-gray-300 group-hover:text-gray-100">
                Excursions for groups in and around Gauteng, available during days and evenings.
              </p>
            </div>

            {/* Discounts */}
            <div className="bg-gray-200 rounded-lg p-6 text-center border-2 border-gray-300 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-black group animate-slide-in-right">
              <Award className="w-12 h-12 text-black mx-auto mb-4 group-hover:animate-gentle-bounce transition-all duration-300" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-black">Special Discounts</h3>
              <p className="text-gray-600 mb-2 group-hover:text-gray-800">R40 discount available for:</p>
              <ul className="text-sm text-gray-600 space-y-1 group-hover:text-gray-800">
                <li className="hover:animate-shake">• Scholars (13 years & younger)</li>
                <li className="hover:animate-shake">• Students (with student card)</li>
                <li className="hover:animate-shake">• Pensioners (with ID)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Falcon-Inspired Design */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        {/* Subtle Background Elements - Falcon Wing Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-gray-300 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-red-500 rounded-full animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            {/* Enhanced title with falcon theme */}
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-red-500 bg-clip-text text-transparent">
              Why Choose Falcon Bus Service?
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6">
              Precision, Power, and Reliability - The Falcon Way
            </p>
            
            {/* Elegant divider */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content with falcon theme */}
            <div className="space-y-8">
              <div className="border-l-4 border-red-500 bg-gray-800/30 p-6 rounded-r-lg backdrop-blur-sm">
                <p className="text-lg text-gray-200 leading-relaxed">
                  Falcon Bus Service connect the world for U between Phalaborwa, Tzaneen, 
                  Haenertsburg via Polokwane to Pretoria and back on Friday's and Sunday's.
                </p>
              </div>
              
              <div className="border-l-4 border-gray-400 bg-gray-800/30 p-6 rounded-r-lg backdrop-blur-sm">
                <p className="text-lg text-gray-200 leading-relaxed">
                  We offer R40 discount for Scholars (13 years & younger), Students (Provide student card), 
                  and Pensioners (Provide ID). We also do excursions for groups in and around Gauteng, 
                  days and evenings.
                </p>
              </div>
              
              {/* Professional call to action */}
              <div className="pt-4">
                <button
                  onClick={onViewRoutes}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300 border border-red-400"
                >
                  BOOK YOUR JOURNEY NOW
                </button>
              </div>
            </div>

            {/* Right side - Elegant feature cards */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-500 p-3 rounded-full shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-red-500">Precision Scheduling</h4>
                    <p className="text-gray-300">Swift departures on Wednesdays, Fridays, and Sundays</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-300 p-3 rounded-full shadow-lg">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-gray-300">Premium Savings</h4>
                    <p className="text-gray-300">Exceptional value for students, scholars, and pensioners</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">Elite Group Services</h4>
                    <p className="text-gray-300">Tailored excursions and group transportation excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom section with falcon branding */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-800/50 to-black/50 border border-red-500/30 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-red-500 mb-4 flex items-center justify-center">
                🦅 <span className="mx-3">Decades of Excellence in Flight</span> 🦅
              </h3>
              <p className="text-lg text-gray-200 max-w-4xl mx-auto">
                Like a falcon's unwavering focus, we deliver precision, speed, and reliability 
                on every journey across South Africa's landscapes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Fleet Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Modern Fleet
            </h2>
            <p className="text-xl text-gray-600">
              Experience comfort and safety in our well-maintained buses
            </p>
          </div>

          {/* Main GIF Display */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 max-w-4xl mx-auto">
              <img 
                src="/bus_gif.gif" 
                alt="Falcon Bus Service Fleet in Motion"
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
          </div>

          {/* Three Bus Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bus Image 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <img 
                src="/bus1.jpg" 
                alt="Falcon Bus"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Bus Image 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <img 
                src="/interior.jpg" 
                alt="Falcon Bus Interior"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Bus Image 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <img 
                src="/exterior.jpg" 
                alt="Falcon Bus Exterior"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Safety Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Safety & Credentials
            </h2>
            <p className="text-xl text-gray-600">
              Your safety and comfort are our top priorities
            </p>
            {/* Small red accent divider */}
            <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Drivers */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-transparent group-hover:border-red-500 transition-all duration-300">
                <Users className="w-8 h-8 text-black group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-red-500 transition-colors duration-300">Professional Drivers</h3>
              <p className="text-gray-600 text-sm">
                Drivers are employed according to driving experience and age. Full background 
                checks and police clearance are conducted on all our drivers.
              </p>
            </div>

            {/* Driver Training */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-transparent group-hover:border-red-500 transition-all duration-300">
                <Award className="w-8 h-8 text-white group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-red-500 transition-colors duration-300">Qualified Drivers</h3>
              <p className="text-gray-600 text-sm">
                Our drivers strive to ensure a professional image consistent with our value of service. 
                All drivers are well spoken and carry special driving permits and valid PDP's.
              </p>
            </div>

            {/* Vehicle Safety */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-transparent group-hover:border-red-500 transition-all duration-300">
                <Shield className="w-8 h-8 text-black group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-red-500 transition-colors duration-300">24/7 Monitoring</h3>
              <p className="text-gray-600 text-sm">
                All vehicles are fitted with the latest tracking systems and are monitored 24/7 
                for your safety and peace of mind.
              </p>
            </div>

            {/* Vehicle Maintenance */}
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-transparent group-hover:border-red-500 transition-all duration-300">
                <Clock className="w-8 h-8 text-white group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-red-500 transition-colors duration-300">Well-Maintained Fleet</h3>
              <p className="text-gray-600 text-sm">
                All our vehicles are serviced regularly with daily inspections. 
                Vehicles are fully insured and covered with Public Liability Insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions Link Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Important Information
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Before booking your journey, please review our terms and conditions
            </p>
            <button
              onClick={onViewTerms}
              className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📋 View Terms and Conditions
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Travel with Us?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Book your journey today and experience safe, comfortable, and affordable travel
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={onViewRoutes}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-red-400"
            >
              View Routes & Book Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
            {/* Company Info */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300">
              <div className="mb-4">
                <img 
                  src="/logo.png" 
                  alt="Falcon Bus Service Logo" 
                  className="h-12 w-auto mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mb-3"
                />
                <h3 className="font-bold text-white text-lg mb-2">Falcon Bus Service</h3>
                <h4 className="font-semibold text-gray-300 mb-3">& Beyers Busdiens</h4>
                <p className="text-gray-400 text-sm">Connecting South African cities with comfort, safety, and reliability.</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h3 className="font-bold text-white text-lg mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">📧 info@falconbuslines.co.za</p>
                <p className="text-gray-300">📞 +27 11 123 4567</p>
                <p className="text-gray-300">💬 WhatsApp: +27 82 123 4567</p>
                <p className="text-red-400">🚨 Emergency: +27 82 999 8888</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h3 className="font-bold text-white text-lg mb-4">Operating Hours</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300 font-semibold">Monday - Sunday</p>
                <p className="text-gray-300">6:00 AM - 10:00 PM</p>
                <div className="mt-3 pt-3 border-t border-gray-600">
                  <p className="text-red-400 font-semibold">Online Booking Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
