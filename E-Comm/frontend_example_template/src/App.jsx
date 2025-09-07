// This file is part of the FalconBusService frontend application.
/**
 * Main App Component
 * 
 * Sets up the React Query client and renders the main application.
 * This is the root component that handles:
 * - React Query configuration for API calls
 * - Toast notifications setup
 * - Main routing and layout
 * - Navigation between different views
 */

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import RoutesList from './components/RoutesList';
import ScheduleSelection from './components/ScheduleSelection';
import BookingForm from './components/BookingForm';
import TermsAndConditions from './components/TermsAndConditions';
import ErrorBoundary from './components/ErrorBoundary';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  // Debug logging
  console.log('🚀 App starting...');
  console.log('🌍 Environment:', {
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    dev: import.meta.env.DEV
  });

  // Navigation state
  const [currentView, setCurrentView] = useState('home'); // 'home', 'routes', 'schedules', 'booking', 'terms'
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Navigation handlers with scroll-to-top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewRoutes = () => {
    setCurrentView('routes');
    scrollToTop();
  };

  const handleViewTerms = () => {
    setCurrentView('terms');
    scrollToTop();
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setCurrentView('schedules');
    scrollToTop();
  };

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setCurrentView('booking');
    scrollToTop();
  };

  const handleBookingComplete = () => {
    // After successful booking, reset to home or show confirmation
    setCurrentView('home');
    setSelectedRoute(null);
    setSelectedSchedule(null);
    scrollToTop();
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedRoute(null);
    setSelectedSchedule(null);
    scrollToTop();
  };

  const handleBackToRoutes = () => {
    setCurrentView('routes');
    setSelectedRoute(null);
    scrollToTop();
  };

  const handleBackToSchedules = () => {
    setCurrentView('schedules');
    setSelectedSchedule(null);
    scrollToTop();
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'routes':
        return <RoutesList onRouteSelect={handleRouteSelect} />;
      case 'schedules':
        return (
          <ScheduleSelection
            selectedRoute={selectedRoute}
            onBack={handleBackToRoutes}
            onSelectSchedule={handleScheduleSelect}
          />
        );
      case 'terms':
        return <TermsAndConditions onBack={handleBackToHome} />;
      case 'booking':
        return (
          <BookingForm
            selectedSchedule={selectedSchedule}
            onBack={handleBackToSchedules}
            onBookingComplete={handleBookingComplete}
          />
        );
      default:
        return <Home onViewRoutes={handleViewRoutes} onViewTerms={handleViewTerms} />;
    }
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-white">
          {/* Header - only show on non-home pages */}
          {currentView !== 'home' && (
            <header className="bg-black text-white shadow-sm border-b border-gray-800">
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div 
                    className="flex items-center space-x-3 cursor-pointer group"
                    onClick={handleBackToHome}
                  >
                    <img 
                      src="/logo.png" 
                      alt="Falcon Bus Service Logo" 
                      className="h-16 w-auto transition-all duration-500 hover:scale-125 hover:rotate-6 group-hover:animate-pulse"
                    />
                    <div className="transition-transform duration-300 group-hover:translate-x-2">
                      <h1 className="text-xl font-bold animate-fade-in">
                        Falcon Bus Service
                      </h1>
                      <p className="text-sm text-gray-300 animate-fade-in animation-delay-200">
                        & Beyers Busdiens
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-6">
                    <button
                      onClick={handleBackToHome}
                      className="text-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Home
                    </button>
                    <button
                      onClick={handleViewRoutes}
                      className="text-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Routes
                    </button>
                    <button
                      onClick={handleViewTerms}
                      className="text-sm text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                    >
                      Terms
                    </button>
                    <div className="text-sm text-gray-300 animate-pulse">
                      <span className="font-semibold text-red-400">Emergency:</span> +27 82 999 8888
                    </div>
                    <div className="text-sm text-gray-300 animate-pulse animation-delay-500">
                      <span className="font-semibold text-green-400">WhatsApp:</span> +27 82 123 4567
                    </div>
                  </div>
                </div>
              </div>
            </header>
          )}

          {/* Main Content */}
          <main>
            {renderCurrentView()}
          </main>

          {/* Footer - only show on non-home pages */}
          {currentView !== 'home' && (
            <footer className="bg-gray-900 text-white py-8 mt-16">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Falcon Bus Service</h3>
                    <p className="text-gray-300 text-sm">
                      & Beyers Busdiens - Connecting South African cities with comfort, safety, and reliability.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>📧 info@falconbuslines.co.za</p>
                      <p>📞 +27 11 123 4567</p>
                      <p>💬 WhatsApp: +27 82 123 4567</p>
                      <p>🚨 Emergency: +27 82 999 8888</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Operating Hours</h3>
                    <p className="text-gray-300 text-sm">
                      Monday - Sunday<br />
                      6:00 AM - 10:00 PM
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        <span className="text-sm text-gray-300">Online Booking Available 24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
                  <p>&copy; 2025 Falcon Bus Service & Beyers Busdiens. All rights reserved.</p>
                </div>
              </div>
            </footer>
          )}
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}export default App;
