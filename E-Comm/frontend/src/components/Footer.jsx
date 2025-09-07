import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpeg" 
                alt="KadiPore Chilli Farms Logo" 
                className="h-16 sm:h-20 w-auto"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-red-400">KadiPore</h3>
                <p className="text-xs sm:text-sm text-gray-300">Chilli Farms</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Handcrafting premium chilli products in South Africa since 2016. 
              Experience the passion in every drop.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
                <Twitter size={20} />
              </a>
              <a 
                href="https://wa.me/27827494295?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20KadiPore%20Chilli%20Farms%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Products
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Hot Sauces
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Chilli Powder
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Fresh Chillies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Gift Sets
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  Bulk Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-red-400 mt-1" />
                <div className="text-gray-300">
                  <p>123 Chilli Valley Road</p>
                  <p>Magaliesburg, Gauteng 1791</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-red-400" />
                <p className="text-gray-300">+27 11 456 7890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-red-400" />
                <p className="text-gray-300">info@kadiporechillifarms.co.za</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold text-red-400 mb-2">Operating Hours</h5>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 3:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-400 text-sm">
                &copy; 2025 KadiPore Chilli Farms. All rights reserved.
              </p>
              <span className="text-gray-600 hidden md:inline">•</span>
              <a 
                href="https://www.webstratit.co.za" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300"
              >
                Powered by Webstrat IT
              </a>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors duration-300">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
