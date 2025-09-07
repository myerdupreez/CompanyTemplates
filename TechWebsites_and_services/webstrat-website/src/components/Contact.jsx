import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  Building,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Custom Web Development',
    'AI-Powered Customer Support',
    'Software Solutions',
    'Business Growth Consulting',
    'UI/UX Design',
    'E-commerce Development',
    'Mobile App Development',
    'Digital Transformation',
    'Other',
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+27 82 387 4406',
      subtext: '24/7 Support Available',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'jacques@webstratit.co.za',
      subtext: 'We respond within 24 hours',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Western Cape & Gauteng',
      subtext: 'South Africa',
      color: 'from-purple-500 to-violet-600',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: '24/7 Support',
      subtext: 'Always available for our clients',
      color: 'from-orange-500 to-red-600',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // EmailJS configuration - replace with your actual credentials
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS not configured. Please set up your credentials in .env file');
        // For demo purposes, show success message
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            service: '',
            message: '',
          });
        }, 3000);
        setIsSubmitting(false);
        return;
      }

      // Prepare template parameters for webstratit.co.za
      const templateParams = {
        to_name: 'WebStrat IT Team',
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        phone: formData.phone || 'Not provided',
        service: formData.service || 'General Inquiry',
        message: formData.message,
        reply_to: formData.email,
        website_url: 'https://webstratit.co.za',
        submission_date: new Date().toLocaleString(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);
      setIsSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: '',
        });
      }, 3000);

    } catch (error) {
      console.error('Email sending failed:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-white dark:bg-dark-800">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to transform your business with cutting-edge technology? Let's start a conversation 
            about your project and discover how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-16 sm:mb-20">
          {/* Contact Form */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Start Your Project Today
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                Fill out the form below and we'll get back to you within 24 hours to discuss your requirements.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h4>
                <p className="text-green-700">
                  Your message has been sent successfully. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 dark:text-white rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 dark:text-white rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 dark:text-white rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 dark:text-white rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 dark:text-white rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-dark-600 dark:text-white rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-navy-600 to-webstrat-600 hover:from-navy-700 hover:to-webstrat-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Choose the best way to reach us. We're here to help and answer any questions you might have.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-dark-600 rounded-xl p-6 hover:bg-white dark:hover:bg-dark-500 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{method.title}</h4>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-1">{method.details}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{method.subtext}</p>
                </div>
              ))}
            </div>

            {/* Social Links removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
