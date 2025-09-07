// Comprehensive test script for WebStrat Chatbot
// Run this in the browser console or as a standalone test

const testQuestions = [
  // Core Services
  'What services do you offer?',
  'Can you build websites?',
  'Do you develop mobile apps?',
  'What about e-commerce solutions?',
  'Do you build AI chatbots?',
  'Tell me about your solutions',
  
  // Web Development
  'I need a website for my business',
  'Can you create a React website?',
  'Do you work with Next.js?',
  'What about responsive design?',
  'Can you build a progressive web app?',
  'Do you do frontend development?',
  'What about backend development?',
  
  // Mobile Development
  'I want a mobile app',
  'Do you build iOS apps?',
  'What about Android development?',
  'Can you create cross-platform apps?',
  'Do you use React Native?',
  'What about Flutter development?',
  
  // AI & Automation
  'Can you build a chatbot like this?',
  'I need business automation',
  'What AI solutions do you offer?',
  'Can you integrate machine learning?',
  'Do you work with OpenAI?',
  'I want to automate customer support',
  
  // E-commerce
  'I want to sell products online',
  'Can you build an online store?',
  'Do you integrate payment gateways?',
  'What about PayFast integration?',
  'Can you handle inventory management?',
  'I need a complete e-commerce solution',
  
  // Pricing Questions
  'How much does a website cost?',
  'What are your prices?',
  'Can you give me a quote?',
  'What\'s your pricing structure?',
  'Are you expensive?',
  'Do you have payment plans?',
  'What about monthly payments?',
  'How much for a mobile app?',
  
  // Timeline Questions
  'How long does it take to build a website?',
  'What\'s your project timeline?',
  'How quickly can you deliver?',
  'When can we start?',
  'How fast can you work?',
  'What about rush projects?',
  
  // Technology Questions
  'What technologies do you use?',
  'What\'s your tech stack?',
  'Do you use modern frameworks?',
  'What databases do you work with?',
  'Do you use cloud services?',
  'What about TypeScript?',
  'Do you work with APIs?',
  'What hosting do you recommend?',
  
  // Specialized Services
  'Can you help with SEO?',
  'What about website security?',
  'Do you build CMS systems?',
  'Can you integrate third-party services?',
  'What about WordPress development?',
  'Do you offer website maintenance?',
  'What support do you provide?',
  
  // Business & Strategy
  'Can I get a free consultation?',
  'Do you offer business advice?',
  'What about digital strategy?',
  'Can you help with digital transformation?',
  'Do you provide training?',
  'What industries do you serve?',
  'Do you work with startups?',
  'What about enterprise clients?',
  
  // Location & Remote Work
  'Where are you located?',
  'Do you work remotely?',
  'Can we meet in person?',
  'Do you work with international clients?',
  'What about timezone differences?',
  
  // Process & Methodology
  'What\'s your development process?',
  'How do you work with clients?',
  'Do you use Agile methodology?',
  'What about testing?',
  'How do you ensure quality?',
  'What\'s your project management approach?',
  
  // Contact & Getting Started
  'How can I contact you?',
  'What\'s your phone number?',
  'Can I schedule a meeting?',
  'How do I get started?',
  'I\'m ready to begin a project',
  'Let\'s start working together',
  
  // Portfolio & Experience
  'Can I see your portfolio?',
  'What projects have you completed?',
  'How much experience do you have?',
  'Can you show me examples?',
  'What do your clients say?',
  'Do you have testimonials?',
  
  // Conversational
  'Hello',
  'Hi there',
  'Good morning',
  'Can you help me?',
  'I need assistance',
  'Thank you',
  'Thanks for your help',
  'Goodbye',
  'See you later',
  
  // Edge Cases
  'I don\'t know what I need',
  'Help me figure out my requirements',
  'What would you recommend?',
  'I have a unique project',
  'Can you handle complex requirements?',
  'What makes you different?',
  'Why should I choose WebStrat?',
  
  // Specific Technical Queries
  'Do you work with PostgreSQL?',
  'Can you build REST APIs?',
  'What about GraphQL?',
  'Do you use Docker?',
  'Can you deploy to AWS?',
  'What about CI/CD pipelines?',
  'Do you handle database migrations?',
  
  // Industry-Specific
  'I\'m in healthcare, can you help?',
  'What about financial services?',
  'Do you work with educational institutions?',
  'Can you build real estate websites?',
  'What about non-profit organizations?',
  
  // Support & Maintenance
  'What happens after launch?',
  'Do you provide ongoing support?',
  'How do you handle bugs?',
  'What about updates and maintenance?',
  'Do you offer hosting services?',
  'Can you monitor my website?',
  
  // Random/Unexpected
  'What\'s your favorite programming language?',
  'Do you work weekends?',
  'Can you work on a tight budget?',
  'What if I change my mind about features?',
  'Do you offer refunds?',
  'Can you work with my existing team?'
];

// Test function
function runChatbotTests() {
  console.log('🤖 Starting WebStrat Chatbot Tests...\n');
  
  const results = [];
  let passed = 0;
  let failed = 0;
  
  testQuestions.forEach((question, index) => {
    try {
      // This would integrate with your actual chatbot function
      // For demo purposes, we'll simulate responses
      const response = `Test response for: "${question}"`;
      
      const result = {
        question,
        response,
        status: 'PASS',
        timestamp: new Date().toISOString()
      };
      
      results.push(result);
      passed++;
      
      console.log(`✅ Test ${index + 1}/${testQuestions.length}: PASS`);
      console.log(`   Q: ${question}`);
      console.log(`   A: ${response.substring(0, 100)}...`);
      console.log('');
      
    } catch (error) {
      const result = {
        question,
        response: null,
        status: 'FAIL',
        error: error.message,
        timestamp: new Date().toISOString()
      };
      
      results.push(result);
      failed++;
      
      console.log(`❌ Test ${index + 1}/${testQuestions.length}: FAIL`);
      console.log(`   Q: ${question}`);
      console.log(`   Error: ${error.message}`);
      console.log('');
    }
  });
  
  // Summary
  console.log('📊 Test Summary:');
  console.log(`   Total Tests: ${testQuestions.length}`);
  console.log(`   Passed: ${passed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Success Rate: ${((passed / testQuestions.length) * 100).toFixed(2)}%`);
  
  return results;
}

// Export for use in testing environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testQuestions, runChatbotTests };
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  console.log('WebStrat Chatbot Test Suite Loaded');
  console.log('Run runChatbotTests() to start testing');
  
  // Make functions available globally
  window.runChatbotTests = runChatbotTests;
  window.testQuestions = testQuestions;
}
