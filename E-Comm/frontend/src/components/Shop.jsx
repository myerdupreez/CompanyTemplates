import { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { AnimatedSection } from '../utils/scrollAnimations.jsx';

const Shop = ({ onAddToCart, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [clickedButton, setClickedButton] = useState(null);

  const products = [
    // Hot Sauces
    { id: 1, name: 'Original Hot Sauce', category: 'sauces', heat: 'Medium', price: 89, rating: 4.8, image: '/original_hotsauce.png', description: 'Our signature original hot sauce with a perfect balance of heat and flavor.' },
    { id: 2, name: 'Mild Hot Sauce', category: 'sauces', heat: 'Mild', price: 65, rating: 4.6, image: '/Mild_hotsauce.png', description: 'Gentle heat perfect for those who prefer milder flavors.' },
    { id: 3, name: 'Fermented Pepper Mash', category: 'sauces', heat: 'Hot', price: 95, rating: 4.7, image: '/fermented_pepper_mash.png', description: 'Complex fermented flavors with a rich, deep heat.' },
    { id: 4, name: 'Carolina Reaper Sauce', category: 'sauces', heat: 'Extreme', price: 120, rating: 4.5, image: '/carolina_reaper.png', description: 'The ultimate heat experience - handle with extreme care!' },
    { id: 5, name: 'Ghost Pepper Sauce', category: 'sauces', heat: 'Very Hot', price: 110, rating: 4.4, image: '/ghost_pepper.png', description: 'Legendary ghost pepper heat with incredible flavor.' },
    { id: 6, name: 'Sugar Rush Peach Sauce', category: 'sauces', heat: 'Medium', price: 85, rating: 4.9, image: '/sugar_rush_epeach.png', description: 'Sweet and fruity with a pleasant medium heat level.' },
    
    // Chilli Powder
    { id: 7, name: 'Dried Chilli Powder', category: 'powder', heat: 'Hot', price: 45, rating: 4.3, image: '/dried_chilli_powder.png', description: 'Premium dried chilli powder for cooking.' },
    { id: 8, name: 'Carolina Reaper Powder', category: 'powder', heat: 'Extreme', price: 85, rating: 4.2, image: '/carolina_reaper.png', description: 'Extreme heat powder - use with extreme caution!' },
    { id: 9, name: 'Ghost Pepper Powder', category: 'powder', heat: 'Very Hot', price: 75, rating: 4.5, image: '/ghost_pepper.png', description: 'Ghost pepper powder adds serious heat to any dish.' },
    { id: 10, name: 'Habanero Powder Mix', category: 'powder', heat: 'Hot', price: 55, rating: 4.8, image: '/red_habanero.png', description: 'Habanero powder with complex fruity heat profile.' },
    
    // Fresh Chillies
    { id: 11, name: 'Fresh Jalapeños', category: 'fresh', heat: 'Medium', price: 25, rating: 4.1, image: '/jalapeno.png', description: 'Fresh jalapeño peppers per kg.', unit: 'per kg' },
    { id: 12, name: 'Green Thai Chillies', category: 'fresh', heat: 'Hot', price: 65, rating: 4.4, image: '/Green_Thai_chillis.png', description: 'Small but mighty - perfect for authentic heat.', unit: 'per kg' },
    { id: 13, name: 'Orange Habaneros', category: 'fresh', heat: 'Very Hot', price: 85, rating: 4.6, image: '/Orange_habanero.png', description: 'Fresh orange habanero peppers with fruity heat.', unit: 'per kg' },
    { id: 14, name: 'Red Habaneros', category: 'fresh', heat: 'Very Hot', price: 85, rating: 4.6, image: '/red_habanero.png', description: 'Fresh red habanero peppers with intense heat.', unit: 'per kg' },
    { id: 15, name: 'Yellow Habaneros', category: 'fresh', heat: 'Very Hot', price: 85, rating: 4.6, image: '/Yellow_habanero.png', description: 'Fresh yellow habanero peppers with citrusy heat.', unit: 'per kg' },
    { id: 16, name: 'Carolina Reapers', category: 'fresh', heat: 'Extreme', price: 150, rating: 4.9, image: '/carolina_reaper.png', description: 'The world\'s hottest pepper - handle with extreme care!', unit: 'per kg' },
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'sauces', label: 'Hot Sauces' },
    { value: 'powder', label: 'Chilli Powder' },
    { value: 'fresh', label: 'Fresh Chillies' }
  ];

  const getHeatColor = (heat) => {
    switch (heat) {
      case 'Mild': return 'text-yellow-600 bg-yellow-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Hot': return 'text-red-600 bg-red-100';
      case 'Very Hot': return 'text-red-700 bg-red-200';
      case 'Extra Hot': return 'text-red-800 bg-red-300';
      case 'Extreme': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AnimatedSection animationClass="slide-in-down">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  <ArrowLeft size={20} />
                  <span>Back to Home</span>
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Our Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <AnimatedSection animationClass="fade-in-up" delay={200}>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                      selectedCategory === category.value
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <AnimatedSection 
              key={product.id} 
              animationClass="fade-in-up" 
              delay={400 + (index * 100)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-contain"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getHeatColor(product.heat)}`}>
                      {product.heat}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-red-600">R{product.price}</span>
                      {product.unit && (
                        <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (onAddToCart) {
                          setClickedButton(product.id);
                          onAddToCart(product);
                          setTimeout(() => setClickedButton(null), 1200);
                        }
                      }}
                      className={`text-white px-4 py-2 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                        clickedButton === product.id 
                          ? 'bg-green-600 scale-110 shadow-2xl animate-bounce' 
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {clickedButton === product.id ? '✅ Added to Cart!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <AnimatedSection animationClass="fade-in" delay={400}>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default Shop;
