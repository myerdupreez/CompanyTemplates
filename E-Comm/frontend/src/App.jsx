// This file is part of the KadiPore Chilli Farms frontend application.
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
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Shop from './components/Shop';
import Cart from './components/Cart';
import ErrorBoundary from './components/ErrorBoundary';
import CustomChatbotWidget from './CustomChatbotWidget';

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
  console.log('🌶️ KadiPore Chilli Farms starting...');
  console.log('🌍 Environment:', {
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    dev: import.meta.env.DEV
  });

  // Navigation state
  const [currentView, setCurrentView] = useState('home'); // 'home', 'shop', 'cart'
  const [cartItems, setCartItems] = useState([]);

  // Navigation handlers
  const handleNavigation = (view) => {
    setCurrentView(view);
    if (view !== 'cart') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to section for home page navigation
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart handlers
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'shop':
        return <Shop onAddToCart={addToCart} onBack={() => handleNavigation('home')} />;
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onBack={() => handleNavigation('home')}
          />
        );
      default:
        return (
          <div>
            <Hero />
            <About />
            <Products 
              onNavigateToShop={() => handleNavigation('shop')} 
              onAddToCart={addToCart}
            />
            <Services />
            <Contact />
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-white">
          <Header
            currentView={currentView}
            onNavigation={handleNavigation}
            onScrollToSection={scrollToSection}
            cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          />

          {/* Main Content */}
          <main>
            {renderCurrentView()}
          </main>

          <Footer />

          {/* Chatbot Widget */}
          <CustomChatbotWidget />
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
