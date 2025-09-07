import { AnimatedSection } from '../utils/scrollAnimations.jsx';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-red-600">KadiPore Chilli Farms</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <AnimatedSection animation="fade-in-up" delay={200}>
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-600 hover-lift">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
                <p className="text-gray-700 leading-relaxed">
                  Since our inception in November 2016, KadiPore Chilli Farms has been dedicated to ensuring customer satisfaction above all else. Our commitment to excellence has driven our growth and shaped us into the business we are today.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={400}>
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-600 hover-lift">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  From our humble beginnings of making hot sauces at home, we've maintained our passion for crafting quality products. At KadiPore, we prioritize our customers, striving to provide exceptional products and services at all times.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={600}>
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-600 hover-lift">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Promise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every product is handcrafted with care using only the finest locally grown chillies. We believe in small batch production to ensure consistent quality and unique flavors that will ignite your taste buds.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Images */}
          <AnimatedSection animation="fade-in-up" delay={800} className="space-y-6">
            <div className="relative overflow-hidden rounded-lg shadow-xl group">
              <img 
                src="/original_hotsauce.png" 
                alt="KadiPore Hot Sauce Products" 
                className="w-full h-[32rem] object-contain transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-white font-semibold p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Artisanal Hot Sauces</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="/dried_chilli_powder.png" 
                  alt="Chilli Powder Processing" 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <p className="text-white text-sm font-semibold p-2">Chilli Powders</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="/carolina_reaper.png" 
                  alt="Fresh Chillies" 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <p className="text-white text-sm font-semibold p-2">Fresh Chillies</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats */}
        <AnimatedSection animation="fade-in-up" delay={1000} className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">9+</div>
            <div className="text-gray-700 font-medium">Years of Excellence</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
            <div className="text-gray-700 font-medium">Local Ingredients</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-700 font-medium">Happy Customers</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
            <div className="text-gray-700 font-medium">Product Varieties</div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
