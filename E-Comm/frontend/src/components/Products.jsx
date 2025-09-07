import { useState } from 'react';
import React from 'react';
import { AnimatedSection } from '../utils/scrollAnimations.jsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Products = ({ onNavigateToShop, onAddToCart }) => {
  const [clickedButton, setClickedButton] = useState(null);
  // Best-selling products only
  const bestSellerProducts = [
    { id: 1, name: 'Original Hot Sauce', heat: 'Medium', price: 89, displayPrice: 'R89', image: '/original_hotsauce.png', bestseller: true },
    { id: 4, name: 'Carolina Reaper Sauce', heat: 'Extreme', price: 120, displayPrice: 'R120', image: '/carolina_reaper.png', bestseller: true },
    { id: 6, name: 'Sugar Rush Peach Sauce', heat: 'Medium', price: 85, displayPrice: 'R85', image: '/sugar_rush_epeach.png', bestseller: true },
    { id: 7, name: 'Dried Chilli Powder', heat: 'Hot', price: 45, displayPrice: 'R45', image: '/dried_chilli_powder.png', bestseller: true },
    { id: 11, name: 'Fresh Jalapeños', heat: 'Medium', price: 25, displayPrice: 'R25/kg', image: '/jalapeno.png', unit: 'per kg', bestseller: true },
    { id: 14, name: 'Red Habaneros', heat: 'Very Hot', price: 85, displayPrice: 'R85/kg', image: '/red_habanero.png', unit: 'per kg', bestseller: true }
  ];

  const getHeatColor = (heat) => {
    switch (heat) {
      case 'None': return 'text-green-600 bg-green-100';
      case 'Mild': return 'text-yellow-600 bg-yellow-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Hot': return 'text-red-600 bg-red-100';
      case 'Very Hot': return 'text-red-700 bg-red-200';
      case 'Extra Hot': return 'text-red-800 bg-red-300';
      case 'Extreme': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-in-up" className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our <span className="text-red-600">Best Sellers</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover our most popular chilli products, loved by customers across South Africa
          </p>
        </AnimatedSection>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellerProducts.map((product, index) => (
            <AnimatedSection 
              key={product.id} 
              animation="fade-in-up" 
              delay={index * 150}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-200 relative group transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105">
              <div className="relative bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-64 md:h-80 object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 transform transition-all duration-300 group-hover:scale-110">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getHeatColor(product.heat)} animate-bounce-slow`}>
                    {product.heat}
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <span className="text-xl sm:text-2xl font-bold text-red-600">{product.displayPrice}</span>
                  <button 
                    className={`w-full sm:w-auto text-white px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-500 transform hover:scale-105 hover:shadow-lg min-h-[44px] ${
                      clickedButton === product.id 
                        ? 'bg-green-600 scale-110 shadow-2xl animate-bounce' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    onClick={() => {
                      if (onAddToCart) {
                        setClickedButton(product.id);
                        onAddToCart(product);
                        setTimeout(() => setClickedButton(null), 1200);
                      }
                    }}
                  >
                    {clickedButton === product.id ? '✅ Added to Cart!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedSection animation="fade-in-up" delay={800} className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-8">
            <h3 className="text-3xl font-bold mb-4">Want to See More?</h3>
            <p className="text-xl mb-6">Browse our complete collection of premium chilli products</p>
            <button 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300"
              onClick={() => onNavigateToShop && onNavigateToShop()}
            >
              View All Products
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Products;
