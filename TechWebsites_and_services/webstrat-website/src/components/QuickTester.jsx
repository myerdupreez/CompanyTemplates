import React, { useState } from 'react';

// Sample questions for quick testing
const quickTests = [
  'What services do you offer?',
  'How much does a website cost?',
  'Can you build mobile apps?',
  'Do you work with AI?',
  'What technologies do you use?',
  'How long does it take?',
  'Can I get a free consultation?',
  'Where are you located?',
  'How can I contact you?',
  'I want to start a project'
];

export default function QuickTester() {
  const [responses, setResponses] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Simulate the chatbot response function (same as in main component)
  const getBotReply = (userMsg) => {
    const text = userMsg.toLowerCase().trim();
    
    const webStratResponses = {
      services: 'We offer comprehensive software solutions: Custom Web Development, AI-Powered Customer Support, Mobile Apps, E-commerce Solutions...',
      web: 'We specialize in modern web development using React, Next.js, Vue.js frameworks...',
      pricing: 'Our pricing is transparent and project-based: Basic Website: R15,000-R30,000, Business Website: R30,000-R60,000...',
      // Add more responses as needed
      fallback: 'I can help with information about our services, pricing, technologies, and getting started with your project.'
    };

    // Simple keyword matching for demo
    if (text.includes('service')) return webStratResponses.services;
    if (text.includes('price') || text.includes('cost')) return webStratResponses.pricing;
    if (text.includes('website') || text.includes('web')) return webStratResponses.web;
    
    return webStratResponses.fallback;
  };

  const runQuickTest = async () => {
    setIsRunning(true);
    setResponses([]);
    
    for (let i = 0; i < quickTests.length; i++) {
      const question = quickTests[i];
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      
      const response = getBotReply(question);
      setResponses(prev => [...prev, { question, response, index: i + 1 }]);
    }
    
    setIsRunning(false);
  };

  return (
    <div style={{ 
      maxWidth: 800, 
      margin: '20px auto', 
      padding: 20,
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 30
      }}>
        <h2 style={{ color: '#1e40af', marginBottom: 15 }}>
          Quick Chatbot Test
        </h2>
        <button
          onClick={runQuickTest}
          disabled={isRunning}
          style={{
            background: isRunning ? '#9ca3af' : '#1e40af',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: 16,
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunning ? 'Running Tests...' : 'Run Quick Test'}
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: 15 
      }}>
        {responses.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 15,
              background: 'white'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 10
            }}>
              <span style={{
                background: '#1e40af',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 'bold',
                marginRight: 10
              }}>
                Test {item.index}
              </span>
              <span style={{ fontWeight: 'bold', color: '#059669' }}>
                Q: {item.question}
              </span>
            </div>
            <div style={{
              background: '#f8fafc',
              padding: 10,
              borderRadius: 6,
              fontSize: 14,
              lineHeight: 1.4
            }}>
              <strong style={{ color: '#1e40af' }}>A:</strong> {item.response}
            </div>
          </div>
        ))}
      </div>

      {responses.length > 0 && (
        <div style={{
          marginTop: 20,
          padding: 15,
          background: '#f0f9ff',
          borderRadius: 8,
          textAlign: 'center'
        }}>
          <strong>Test Complete!</strong> {responses.length} responses generated
        </div>
      )}
    </div>
  );
}
