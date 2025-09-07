import { Truck, Phone, ShoppingBag, MapPin, Clock, Shield, Camera } from 'lucide-react';
import React from 'react';
import { AnimatedSection } from '../utils/scrollAnimations.jsx';

const Services = () => {
  const services = [
    {
      icon: Phone,
      title: 'Customer Support',
      description: 'Frequently utilized by most of our customers, this service has been essential to success on many occasions. When it comes to all of our services, you can count on us to take care of your every need. We pride ourselves on our exceptional customer service and guarantee you\'ll love working with our team.',
      features: ['24/7 Support', 'Expert Advice', 'Product Recommendations']
    },
    {
      icon: Truck,
      title: 'Delivery',
      description: 'This is one of our most popular services available. Personal or courier delivery to your door. It\'s made a big difference for many of our customers, and is provided with the highest level of excellence. With this service, we ensure all details are simple, seamless and handled in a timely manner.',
      features: ['Same Day Delivery', 'Nationwide Shipping', 'Temperature Controlled']
    },
    {
      icon: ShoppingBag,
      title: 'Online Shopping',
      description: 'We want all of our customers to experience an impressive level of professionalism when working with KadiPore Chilli Farms. All of our services, especially this one, exist to make your life easier and stress-free. You can trust us to supply you with the best products, as well as top-quality customer service.',
      features: ['Easy Ordering', 'Secure Payments', 'Order Tracking']
    },
    {
      icon: Camera,
      title: 'Visit Our Farm',
      description: 'Experience the passion behind our products with a farm tour. See firsthand how we grow and harvest our premium chillies, learn about our sustainable farming practices, and discover the dedication that goes into every bottle of our hot sauce.',
      features: ['Guided Farm Tours', 'Chilli Tasting Sessions', 'Meet the Farmers'],
      buttons: [
        { text: 'Book a Tour', style: 'primary' },
        { text: 'Get Directions', style: 'secondary' }
      ]
    }
  ];

  const locations = [
    {
      name: 'Johannesburg Farmers Market',
      address: 'Bryanston Organic Market, Saturdays 9AM-3PM',
      icon: MapPin
    },
    {
      name: 'Cape Town Store',
      address: 'V&A Waterfront Food Market, Daily 10AM-8PM',
      icon: MapPin
    },
    {
      name: 'Durban Outlet',
      address: 'Gateway Shopping Centre, Mon-Sun 9AM-9PM',
      icon: MapPin
    },
    {
      name: 'Online Store',
      address: 'Available 24/7 for nationwide delivery',
      icon: Clock
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-red-600">Services</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're committed to providing exceptional service in everything we do
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <AnimatedSection 
              key={index} 
              animation="fade-in-up" 
              delay={200 + (index * 200)}
            >
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div className="bg-red-600 text-white p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <Shield size={16} className="text-red-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              {service.buttons && (
                <div className="space-y-3">
                  {service.buttons.map((button, buttonIndex) => (
                    <button
                      key={buttonIndex}
                      onClick={() => {
                        if (button.text === 'Book a Tour') {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        } else if (button.text === 'Get Directions') {
                          window.open('https://maps.google.com/?q=123+Chilli+Valley+Road,+Magaliesburg,+Gauteng+1791,+South+Africa', '_blank');
                        }
                      }}
                      className={`w-full py-2 px-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                        button.style === 'primary'
                          ? 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Where to Find Us */}
        <AnimatedSection animation="fade-in-up" delay={600} className="bg-white rounded-lg shadow-lg p-8">
          <AnimatedSection animation="fade-in-up" delay={800} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Where to <span className="text-blue-600">Find Us</span>
            </h3>
            <p className="text-gray-600 text-lg">
              Visit our locations or shop online for the freshest chilli products
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <AnimatedSection 
                key={index} 
                animation="fade-in-up" 
                delay={1000 + (index * 150)}
              >
                <div className="border border-gray-200 rounded-lg p-6 hover:border-red-300 transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                      <location.icon size={20} />
                    </div>
                    <h4 className="font-bold text-gray-900">{location.name}</h4>
                  </div>
                  <p className="text-gray-600 text-sm">{location.address}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection animation="fade-in-up" delay={200} className="mt-20">
          <AnimatedSection animation="fade-in-up" delay={400} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What Our <span className="text-red-600">Customers Say</span>
            </h3>
            <p className="text-gray-600 text-lg">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="fade-in-up" delay={600}>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-red-600 text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-4">
                  "The best hot sauce I've ever tasted! The Ghost Pepper Extreme is incredible - just the right amount of heat with amazing flavor."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    JM
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Mitchell</p>
                    <p className="text-gray-600 text-sm">Johannesburg</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={800}>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-blue-600 text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-4">
                  "Amazing customer service and the freshest chillies. I order online regularly and delivery is always prompt and professional."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    SP
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Patel</p>
                    <p className="text-gray-600 text-sm">Cape Town</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-up" delay={1000}>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-red-600 text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-4">
                  "KadiPore's chilli powder transformed my cooking. The quality is outstanding and the variety means I can find the perfect spice level every time."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    DK
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">David Khumalo</p>
                    <p className="text-gray-600 text-sm">Durban</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
