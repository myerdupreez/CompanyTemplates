import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = ({ currentView, onNavigation, onScrollToSection, cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    if (currentView === 'home') {
      onScrollToSection(section);
    } else {
      onNavigation('home');
      setTimeout(() => onScrollToSection(section), 100);
    }
    setIsMobileMenuOpen(false);
  };

  const handleShopClick = () => {
    onNavigation('shop');
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    onNavigation('cart');
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigation('home');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <img 
              src="/logo.jpeg" 
              alt="KadiPore Chilli Farms Logo" 
              className="h-16 w-auto transition-all duration-300 hover:scale-110"
            />
            <div className="transition-transform duration-300 group-hover:translate-x-1">
              <h1 className="text-xl font-bold text-red-500">
                KadiPore
              </h1>
              <p className="text-sm text-gray-300">
                Chilli Farms
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className="text-sm font-medium hover:text-red-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-sm font-medium hover:text-red-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </button>
            <button
              onClick={handleShopClick}
              className="text-sm font-medium hover:text-red-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-sm font-medium hover:text-red-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Where to Find Us
            </button>
            <button
              onClick={() => handleNavClick('testimonials')}
              className="text-sm font-medium hover:text-red-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Testimonials
            </button>
            <button
              onClick={handleCartClick}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-colors duration-300 relative"
            >
              <ShoppingCart size={20} />
              <span className="text-sm font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left text-sm font-medium hover:text-red-400 transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left text-sm font-medium hover:text-red-400 transition-colors duration-300"
              >
                About
              </button>
              <button
                onClick={handleShopClick}
                className="text-left text-sm font-medium hover:text-red-400 transition-colors duration-300"
              >
                Shop
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className="text-left text-sm font-medium hover:text-red-400 transition-colors duration-300"
              >
                Where to Find Us
              </button>
              <button
                onClick={() => handleNavClick('testimonials')}
                className="text-left text-sm font-medium hover:text-red-400 transition-colors duration-300"
              >
                Testimonials
              </button>
              <button
                onClick={handleCartClick}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition-colors duration-300 w-fit relative"
              >
                <ShoppingCart size={20} />
                <span className="text-sm font-medium">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
