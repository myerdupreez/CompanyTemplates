import React from 'react';
import { 
  Code, 
  Cpu, 
  Shield, 
  Smartphone, 
  Database, 
  Globe, 
  Zap, 
  Settings,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = ({ scrollToSection }) => {
  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'Tailored software solutions built to meet your specific business requirements and scale with your growth.',
      features: ['Web Applications', 'Desktop Software', 'API Development', 'Legacy System Modernization'],
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      icon: Cpu,
      title: 'Embedded Systems & IoT',
      description: 'Advanced embedded programming and IoT solutions for smart devices, sensors, and connected systems.',
      features: ['Microcontroller Programming', 'IoT Device Development', 'Sensor Integration', 'Real-time Systems'],
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
    {
      icon: Globe,
      title: 'Web Design & SEO',
      description: 'Creative web design combined with search engine optimization to boost your online presence and rankings.',
      features: ['Responsive Web Design', 'SEO Optimization', 'Content Strategy', 'Performance Analytics'],
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Modern, responsive web applications with robust backend systems and seamless user experiences.',
      features: ['Full-Stack Development', 'API Development', 'Database Design', 'Custom Web Apps'],
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that engage users and drive business growth.',
      features: ['iOS Development', 'Android Development', 'React Native', 'Flutter Apps'],
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      icon: Database,
      title: 'Data Analytics & BI',
      description: 'Transform your data into actionable insights with advanced analytics and business intelligence.',
      features: ['Data Warehousing', 'Business Intelligence', 'Machine Learning', 'Data Visualization'],
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
    },
    {
      icon: Zap,
      title: 'AI & Machine Learning',
      description: 'Leverage artificial intelligence to automate processes and unlock new business opportunities.',
      features: ['AI Consulting', 'ML Model Development', 'Automation Solutions', 'Predictive Analytics'],
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
    },
    {
      icon: Settings,
      title: 'IT Consulting & Support',
      description: 'Strategic IT guidance and ongoing support to optimize your technology infrastructure.',
      features: ['IT Strategy', 'System Integration', '24/7 Support', 'Infrastructure Management'],
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Analysis',
      description: 'We begin by understanding your business needs, challenges, and objectives through comprehensive analysis.',
    },
    {
      step: '02',
      title: 'stratIT & Planning',
      description: 'Our experts develop a customized strategy and detailed project plan tailored to your requirements.',
    },
    {
      step: '03',
      title: 'Development & Implementation',
      description: 'Using agile methodologies, we build and implement solutions with regular updates and feedback loops.',
    },
    {
      step: '04',
      title: 'Testing & Optimization',
      description: 'Rigorous testing ensures quality, performance, and security before deployment to production.',
    },
    {
      step: '05',
      title: 'Launch & Support',
      description: 'We ensure smooth deployment and provide ongoing support to maximize your solution\'s success.',
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-dark-800">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive IT solutions designed to accelerate your digital transformation 
            and drive sustainable business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-dark-600 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              {/* Header */}
              <div className={`${service.bgColor} p-4 sm:p-5 md:p-6 relative`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold ${service.textColor} mb-2 leading-tight`}>
                  {service.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 dark:bg-dark-600 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">
              Our Process
            </h3>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery and exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-gradient-to-r from-navy-600 to-webstrat-600 text-white rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl mx-auto mb-3 sm:mb-4 shadow-lg">
                  {step.step}
                </div>

                {/* Connector Line (except for last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 sm:top-7 md:top-8 lg:top-9 left-1/2 w-full h-0.5 bg-gradient-to-r from-navy-300 to-webstrat-300 transform translate-x-6 sm:translate-x-7 md:translate-x-8 lg:translate-x-9"></div>
                )}

                {/* Content */}
                <div className="text-center">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-r from-navy-600 to-webstrat-600 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-white text-navy-700 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg font-bold text-sm sm:text-base md:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-h-[44px] touch-manipulation"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
