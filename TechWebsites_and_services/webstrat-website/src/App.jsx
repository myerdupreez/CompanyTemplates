// Main application entry point for Webstrat website
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
// import Portfolio from './components/Portfolio';
// import Testimonials from './components/Testimonials';
// import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WebStratChatbot from './components/WebStratChatbot';
import ChatbotTester from './components/ChatbotTester';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showTester, setShowTester] = useState(false);

  // Check URL for testing mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'chatbot') {
      setShowTester(true);
    }

    // Add keyboard shortcut for testing (Ctrl+Shift+T)
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        setShowTester(true);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const scrollToSection = (sectionId) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show chatbot tester if requested
  if (showTester) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-white">
          <div style={{ 
            padding: 20, 
            textAlign: 'center',
            borderBottom: '1px solid #e5e7eb',
            background: '#f8fafc'
          }}>
            <h1 style={{ color: '#1e40af', marginBottom: 10 }}>
              WebStrat Chatbot Testing Suite
            </h1>
            <button
              onClick={() => setShowTester(false)}
              style={{
                background: '#1e40af',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                cursor: 'pointer',
                marginRight: 10
              }}
            >
              Back to Website
            </button>
            <button
              onClick={() => window.open('/', '_blank')}
              style={{
                background: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              Open Website in New Tab
            </button>
          </div>
          <ChatbotTester />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-navy-900 transition-colors duration-300">
        <Header scrollToSection={scrollToSection} currentSection={currentSection} />
        
        <main className="relative">
          <section id="home" className="relative">
            <Hero scrollToSection={scrollToSection} />
          </section>
          
          <section id="about" className="scroll-mt-20">
            <About scrollToSection={scrollToSection} />
          </section>
          
          <section id="services" className="scroll-mt-20">
            <Services scrollToSection={scrollToSection} />
          </section>
          
          {/* <section id="portfolio" className="scroll-mt-20">
            <Portfolio scrollToSection={scrollToSection} />
          </section> */}
          
            {/* <section id="testimonials" className="scroll-mt-20">
              <Testimonials />
            </section>
            <section id="clients" className="scroll-mt-20">
              <Clients scrollToSection={scrollToSection} />
            </section> */}
          
          <section id="contact" className="scroll-mt-20">
            <Contact />
          </section>
        </main>
        
        <Footer scrollToSection={scrollToSection} />
        
        {/* Testing Access Info - Only visible in development */}
        {window.location.hostname === 'localhost' && (
          <div style={{
            position: 'fixed',
            bottom: 100,
            left: 20,
            background: '#1e40af',
            color: 'white',
            padding: '8px 12px',
            borderRadius: 6,
            fontSize: 12,
            zIndex: 999,
            opacity: 0.7
          }}>
            Press Ctrl+Shift+T for Chatbot Testing
          </div>
        )}
        
        <WebStratChatbot />
      </div>
    </ThemeProvider>
  );
}

export default App;
