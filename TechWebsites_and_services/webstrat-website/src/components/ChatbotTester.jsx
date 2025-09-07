import React, { useState } from 'react';

// Test scenarios for the WebStrat chatbot
const testScenarios = [
  {
    category: 'Services',
    tests: [
      'What services do you offer?',
      'Can you build websites?',
      'Do you do web development?',
      'What kind of solutions do you provide?',
      'Tell me about your services',
      'What do you do?',
      'How can you help my business?'
    ]
  },
  {
    category: 'Web Development',
    tests: [
      'Can you build a website for me?',
      'What web technologies do you use?',
      'Do you work with React?',
      'Can you create a modern website?',
      'I need a responsive website',
      'What about Next.js development?',
      'Do you do frontend development?'
    ]
  },
  {
    category: 'AI & Automation',
    tests: [
      'Do you build chatbots?',
      'Can you create AI solutions?',
      'I need automated customer support',
      'What about artificial intelligence?',
      'Can you build smart systems?',
      'Do you work with AI?',
      'I want to automate my business'
    ]
  },
  {
    category: 'Mobile Apps',
    tests: [
      'Can you build mobile apps?',
      'Do you develop for iOS and Android?',
      'I need a mobile application',
      'What about React Native?',
      'Can you create cross-platform apps?',
      'Do you build apps?',
      'Mobile app development services?'
    ]
  },
  {
    category: 'E-commerce',
    tests: [
      'Can you build an online store?',
      'I need an e-commerce website',
      'Do you create shopping websites?',
      'Can you help me sell online?',
      'What about payment integration?',
      'I want to start selling online',
      'E-commerce solutions?'
    ]
  },
  {
    category: 'Pricing',
    tests: [
      'How much does it cost?',
      'What are your prices?',
      'Can you give me a quote?',
      'What\'s your pricing?',
      'How much for a website?',
      'What\'s your budget range?',
      'Are you expensive?'
    ]
  },
  {
    category: 'Timeline',
    tests: [
      'How long does it take?',
      'What\'s your timeline?',
      'When can you start?',
      'How quickly can you deliver?',
      'Project duration?',
      'Time to complete?',
      'How fast can you work?'
    ]
  },
  {
    category: 'Technology',
    tests: [
      'What technologies do you use?',
      'What\'s your tech stack?',
      'Do you use modern frameworks?',
      'What databases do you work with?',
      'Cloud services?',
      'What programming languages?',
      'Technology recommendations?'
    ]
  },
  {
    category: 'Support',
    tests: [
      'Do you provide ongoing support?',
      'What about maintenance?',
      'Help after launch?',
      'Ongoing updates?',
      'Technical support?',
      'Do you fix bugs?',
      'Long-term support?'
    ]
  },
  {
    category: 'Contact & Getting Started',
    tests: [
      'How can I contact you?',
      'What\'s your phone number?',
      'Can I schedule a consultation?',
      'How do I get started?',
      'I\'m ready to begin',
      'Let\'s start a project',
      'How to reach you?'
    ]
  },
  {
    category: 'Location & Portfolio',
    tests: [
      'Where are you located?',
      'Can I see your portfolio?',
      'Show me your previous work',
      'What projects have you done?',
      'Examples of your work?',
      'Case studies?',
      'Do you work remotely?'
    ]
  },
  {
    category: 'Process & Consultation',
    tests: [
      'What\'s your development process?',
      'How do you work?',
      'Can I get a free consultation?',
      'Tell me about your methodology',
      'How do projects work?',
      'What\'s the process like?',
      'Free meeting?'
    ]
  },
  {
    category: 'Edge Cases',
    tests: [
      'Hello',
      'Hi there',
      'Help me',
      'I don\'t know what I need',
      'Random question',
      'Tell me something',
      'What else?'
    ]
  }
];

// Simulate the chatbot response logic
function getBotReply(userMsg) {
  const text = userMsg.toLowerCase().trim();
  
  const webStratResponses = {
    services: 'We offer comprehensive software solutions:\n\n• Custom Web Development (React, Next.js, Vue)\n• AI-Powered Customer Support Systems\n• Mobile App Development\n• E-commerce Solutions\n• Business Growth Consulting\n• Digital Transformation\n• UI/UX Design\n• Software Integration\n\nWhich service interests you most?',
    web: 'We specialize in modern web development using cutting-edge technologies:\n\n• React, Next.js, Vue.js frameworks\n• Responsive design for all devices\n• SEO optimization\n• Fast loading times\n• Modern UI/UX design\n• CMS integration\n\nWe build websites that drive business growth.',
    ai: 'Our AI-powered solutions include:\n\n• Intelligent customer support chatbots\n• Automated response systems\n• Business process automation\n• Custom AI integrations\n• Machine learning solutions\n\nThese systems improve efficiency and customer satisfaction.',
    mobile: 'We develop high-quality mobile applications:\n\n• Native iOS and Android apps\n• Cross-platform solutions (React Native, Flutter)\n• Progressive Web Apps (PWAs)\n• App Store optimization\n• Backend integration\n\nYour app will work seamlessly across all devices.',
    ecommerce: 'Complete e-commerce solutions:\n\n• Custom online stores\n• Payment gateway integration\n• Inventory management\n• Order processing systems\n• Multi-platform selling\n• Analytics and reporting\n\nWe help you sell more online.',
    pricing: 'Our pricing is project-based and depends on:\n\n• Project scope and complexity\n• Timeline requirements\n• Technology stack\n• Ongoing support needs\n\nContact us at +27 82 387 4406 or through our contact form for a detailed quote tailored to your needs.',
    timeline: 'Typical project timelines:\n\n• Simple websites: 2-4 weeks\n• Custom web applications: 4-8 weeks\n• Mobile apps: 6-12 weeks\n• E-commerce platforms: 4-10 weeks\n• Enterprise solutions: 8-16 weeks\n\nWe provide accurate timelines after understanding your specific requirements.',
    tech: 'We work with modern, proven technologies:\n\n• Frontend: React, Next.js, Vue.js, TypeScript\n• Backend: Node.js, Python, PHP\n• Databases: PostgreSQL, MongoDB, MySQL\n• Cloud: AWS, Netlify, Vercel, Railway\n• AI/ML: OpenAI, custom models\n• Mobile: React Native, Flutter\n\nWe choose the best tech stack for your project.',
    support: 'We provide comprehensive support:\n\n• Ongoing maintenance and updates\n• Bug fixes and security patches\n• Feature enhancements\n• Performance optimization\n• 24/7 monitoring options\n• Training for your team\n\nYour success is our priority.',
    consultation: 'Yes! We offer free initial consultations:\n\n• Requirements analysis\n• Technology recommendations\n• Project planning\n• Cost estimation\n• Timeline discussion\n\nContact us to schedule your consultation today.',
    portfolio: 'We\'ve successfully delivered:\n\n• Business websites and portals\n• E-commerce platforms\n• Custom web applications\n• Mobile applications\n• AI-powered solutions\n• System integrations\n\nContact us to see examples relevant to your industry.',
    location: 'We\'re based in South Africa (Western Cape & Gauteng) but serve clients globally:\n\n• Remote collaboration\n• Flexible timezone support\n• Video conferencing\n• Project management tools\n• Regular updates and communication\n\nDistance is no barrier to great results.',
    process: 'Our proven development process:\n\n1. Discovery & Requirements Gathering\n2. Planning & Technical Design\n3. Development & Testing\n4. Client Review & Feedback\n5. Deployment & Launch\n6. Ongoing Support & Maintenance\n\nWe keep you involved throughout the entire journey.',
    contact: 'Get in touch with us:\n\n• Phone: +27 82 387 4406\n• Email: jacques@webstratit.co.za\n• Contact form on this website\n• Business hours: Available 24/7\n\nWe respond within 24 hours to all inquiries.',
    start: 'Ready to start your project? Here\'s how:\n\n1. Contact us via phone or form\n2. Schedule a free consultation\n3. Discuss your requirements\n4. Receive a detailed proposal\n5. Begin development\n\nLet\'s transform your business with technology!',
    fallback: 'I can help with information about:\n\n• Our services and solutions\n• Pricing and project timelines\n• Technologies we use\n• Support and maintenance\n• Getting started with your project\n• Scheduling consultations\n\nWhat would you like to know more about?'
  };

  // Intent patterns for WebStrat services
  const intentPatterns = [
    { pattern: /what.*service|service.*offer|what.*do.*you.*do/i, category: 'services' },
    { pattern: /web.*development|website.*develop|build.*website/i, category: 'web' },
    { pattern: /ai.*support|chatbot|artificial.*intelligence/i, category: 'ai' },
    { pattern: /mobile.*app|app.*development|ios.*android/i, category: 'mobile' },
    { pattern: /ecommerce|e-commerce|online.*store|shop.*online/i, category: 'ecommerce' },
    { pattern: /how.*much.*cost|price|pricing|budget|quote/i, category: 'pricing' },
    { pattern: /how.*long|timeline|time.*take|duration/i, category: 'timeline' },
    { pattern: /technology|tech.*stack|framework|language|database/i, category: 'tech' },
    { pattern: /support|maintenance|after.*launch/i, category: 'support' },
    { pattern: /process|how.*work|methodology/i, category: 'process' },
    { pattern: /consultation|consult|meeting|discuss/i, category: 'consultation' },
    { pattern: /contact|phone|email|reach.*you/i, category: 'contact' },
    { pattern: /get.*started|start.*project|begin/i, category: 'start' },
    { pattern: /portfolio|example|work.*done|previous.*project/i, category: 'portfolio' },
    { pattern: /location|where.*located|office/i, category: 'location' }
  ];

  // Check intent patterns
  for (const { pattern, category } of intentPatterns) {
    if (pattern.test(text)) {
      return webStratResponses[category] || webStratResponses.fallback;
    }
  }

  return webStratResponses.fallback;
}

export default function ChatbotTester() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState('');

  const runTests = async (category) => {
    setIsRunning(true);
    setTestResults([]);
    
    const tests = category ? 
      testScenarios.find(s => s.category === category)?.tests || [] :
      testScenarios.flatMap(s => s.tests);
    
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      setCurrentTest(test);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = getBotReply(test);
      const result = {
        input: test,
        output: response,
        category: category || testScenarios.find(s => s.tests.includes(test))?.category || 'Unknown',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setTestResults(prev => [...prev, result]);
    }
    
    setCurrentTest('');
    setIsRunning(false);
  };

  const runAllTests = () => runTests('');
  const runCategoryTests = (category) => runTests(category);

  return (
    <div style={{ 
      padding: 20, 
      maxWidth: 1200, 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#1e40af',
        marginBottom: 30
      }}>
        WebStrat Chatbot Testing Suite
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: 20, 
        marginBottom: 30,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={runAllTests}
          disabled={isRunning}
          style={{
            background: '#1e40af',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: 16,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.6 : 1
          }}
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </button>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px 16px',
            fontSize: 16,
            borderRadius: 8,
            border: '1px solid #d1d5db'
          }}
        >
          <option value="">Select Category</option>
          {testScenarios.map(scenario => (
            <option key={scenario.category} value={scenario.category}>
              {scenario.category}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => runCategoryTests(selectedCategory)}
          disabled={isRunning || !selectedCategory}
          style={{
            background: selectedCategory ? '#059669' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: 16,
            cursor: (isRunning || !selectedCategory) ? 'not-allowed' : 'pointer'
          }}
        >
          Test Category
        </button>
      </div>

      {currentTest && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: 8,
          padding: 16,
          marginBottom: 20,
          textAlign: 'center'
        }}>
          <strong>Currently Testing:</strong> {currentTest}
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gap: 20, 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
      }}>
        {testResults.map((result, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 20,
              background: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15
            }}>
              <span style={{
                background: '#1e40af',
                color: 'white',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 'bold'
              }}>
                {result.category}
              </span>
              <span style={{ fontSize: 12, color: '#6b7280' }}>
                {result.timestamp}
              </span>
            </div>
            
            <div style={{ marginBottom: 15 }}>
              <strong style={{ color: '#059669' }}>Input:</strong>
              <p style={{ 
                margin: '5px 0', 
                padding: 10, 
                background: '#f0fdf4',
                borderRadius: 6,
                border: '1px solid #bbf7d0'
              }}>
                {result.input}
              </p>
            </div>
            
            <div>
              <strong style={{ color: '#1e40af' }}>Response:</strong>
              <p style={{ 
                margin: '5px 0', 
                padding: 10, 
                background: '#eff6ff',
                borderRadius: 6,
                border: '1px solid #bfdbfe',
                whiteSpace: 'pre-line',
                fontSize: 14,
                lineHeight: 1.5
              }}>
                {result.output}
              </p>
            </div>
          </div>
        ))}
      </div>

      {testResults.length > 0 && (
        <div style={{
          marginTop: 30,
          padding: 20,
          background: '#f8fafc',
          borderRadius: 12,
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: 15 }}>Test Summary</h3>
          <p><strong>Total Tests:</strong> {testResults.length}</p>
          <p><strong>Categories Tested:</strong> {[...new Set(testResults.map(r => r.category))].join(', ')}</p>
          <p><strong>Completion Time:</strong> {testResults.length > 0 ? testResults[testResults.length - 1].timestamp : 'N/A'}</p>
        </div>
      )}
    </div>
  );
}
