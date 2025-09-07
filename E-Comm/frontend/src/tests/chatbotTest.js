// Chatbot Testing Script for KadiPore Chilli Farms
// This script tests all chatbot responses to ensure accuracy

import { chilliChatbotConfig } from '../chatbotConfig.js';

// Test cases organized by category
const testCases = [
  // Product & Catalog Tests
  {
    category: 'Products',
    input: 'What products do you sell?',
    expectedKeywords: ['hot sauce', 'chilli powder', 'fresh chillies', 'R89', 'R65', 'R120'],
    description: 'Should return comprehensive product list with prices'
  },
  {
    category: 'Products',
    input: 'show me your inventory',
    expectedKeywords: ['Original Hot Sauce', 'Carolina Reaper', 'Ghost Pepper', 'Habanero'],
    description: 'Should show product catalog'
  },
  {
    category: 'Products',
    input: 'what sauces do you have',
    expectedKeywords: ['Original Hot Sauce', 'Mild Hot Sauce', 'Carolina Reaper Sauce'],
    description: 'Should list hot sauces'
  },

  // Heat Level Tests
  {
    category: 'Heat Levels',
    input: 'how hot are carolina reapers?',
    expectedKeywords: ['Extreme', 'hottest pepper', 'bravest souls', 'sparingly'],
    description: 'Should explain Carolina Reaper heat level'
  },
  {
    category: 'Heat Levels',
    input: 'explain your heat levels',
    expectedKeywords: ['Mild', 'Medium', 'Hot', 'Very Hot', 'Extreme', '🌶️'],
    description: 'Should show complete heat level guide'
  },
  {
    category: 'Heat Levels',
    input: 'what is scoville',
    expectedKeywords: ['heat', 'level', 'pepper'],
    description: 'Should provide heat information'
  },

  // Farm Information Tests
  {
    category: 'Farm Info',
    input: 'tell me about your farm',
    expectedKeywords: ['family-owned', 'Magaliesburg', 'Gauteng', 'November 2016', 'sustainable'],
    description: 'Should provide farm background and location'
  },
  {
    category: 'Farm Info',
    input: 'where are you located?',
    expectedKeywords: ['Magaliesburg', 'Gauteng', '123 Chilli Valley Road'],
    description: 'Should give farm address'
  },
  {
    category: 'Farm Info',
    input: 'what is your history',
    expectedKeywords: ['established', '2016', 'family-owned'],
    description: 'Should provide company history'
  },

  // Ordering Tests
  {
    category: 'Ordering',
    input: 'how do I order?',
    expectedKeywords: ['Online', 'Phone', 'WhatsApp', '+27 11 456 7890', 'orders@kadiporechillifarms.co.za'],
    description: 'Should provide ordering methods and contact info'
  },
  {
    category: 'Ordering',
    input: 'how can I buy your products?',
    expectedKeywords: ['order', 'phone', 'email', 'payment'],
    description: 'Should explain purchasing process'
  },
  {
    category: 'Ordering',
    input: 'what payment methods do you accept?',
    expectedKeywords: ['Credit', 'Debit', 'EFT', 'Cash on delivery'],
    description: 'Should list payment options'
  },

  // Growing & Care Tests
  {
    category: 'Growing',
    input: 'how do I grow chillies?',
    expectedKeywords: ['well-draining soil', 'full sun', 'water regularly', 'organic fertilizer'],
    description: 'Should provide growing instructions'
  },
  {
    category: 'Growing',
    input: 'storage tips for peppers',
    expectedKeywords: ['Refrigerate', 'weeks', 'cool', 'dry place'],
    description: 'Should give storage advice'
  },
  {
    category: 'Growing',
    input: 'how to care for chilli plants',
    expectedKeywords: ['water', 'fertilizer', 'harvest', 'full color'],
    description: 'Should provide plant care tips'
  },

  // Recipe & Cooking Tests
  {
    category: 'Recipes',
    input: 'how do I use hot sauce?',
    expectedKeywords: ['pizza', 'burgers', 'marinades', 'soups', 'spicy mayo'],
    description: 'Should suggest hot sauce uses'
  },
  {
    category: 'Recipes',
    input: 'cooking with chilli powder',
    expectedKeywords: ['Season meats', 'spice rubs', 'popcorn', 'chocolate'],
    description: 'Should provide powder usage ideas'
  },
  {
    category: 'Recipes',
    input: 'what recipes can I make?',
    expectedKeywords: ['pickle', 'stuff jalapeños', 'stir-fries', 'salsa'],
    description: 'Should suggest recipe ideas'
  },

  // Health Benefits Tests
  {
    category: 'Health',
    input: 'are chillies good for you?',
    expectedKeywords: ['Metabolism', 'Pain Relief', 'Vitamin C', 'Heart Health', 'antioxidant'],
    description: 'Should list health benefits'
  },
  {
    category: 'Health',
    input: 'health benefits of peppers',
    expectedKeywords: ['calories', 'blood pressure', 'digestion', 'capsaicin'],
    description: 'Should explain health advantages'
  },

  // Farm Tours Tests
  {
    category: 'Tours',
    input: 'can I visit the farm?',
    expectedKeywords: ['farm tour', 'experience', 'harvest', 'tasting session', '2-3 hours'],
    description: 'Should describe farm visit options'
  },
  {
    category: 'Tours',
    input: 'book a farm tour',
    expectedKeywords: ['contact form', '+27 11 456 7890', 'Duration', 'Spring', 'Summer'],
    description: 'Should provide booking information'
  },

  // Shipping Tests
  {
    category: 'Shipping',
    input: 'do you deliver?',
    expectedKeywords: ['same day delivery', 'R50', 'Free delivery', 'R300', 'courier'],
    description: 'Should explain delivery options'
  },
  {
    category: 'Shipping',
    input: 'shipping information',
    expectedKeywords: ['Gauteng', 'National', 'International', 'cooling packs'],
    description: 'Should provide comprehensive shipping details'
  },

  // Safety Tests
  {
    category: 'Safety',
    input: 'how to handle hot peppers safely?',
    expectedKeywords: ['gloves', 'cutting boards', 'wash hands', 'dish soap'],
    description: 'Should provide safety guidelines'
  },
  {
    category: 'Safety',
    input: 'safety tips for spicy food',
    expectedKeywords: ['small amounts', 'dairy products', 'milk', 'vegetable oil'],
    description: 'Should give eating safety advice'
  },

  // Varieties Tests
  {
    category: 'Varieties',
    input: 'what chilli varieties do you grow?',
    expectedKeywords: ['Jalapeños', 'Thai Chillies', 'Habaneros', 'Ghost Peppers', 'Carolina Reapers'],
    description: 'Should list chilli varieties'
  },
  {
    category: 'Varieties',
    input: 'different pepper types',
    expectedKeywords: ['Mild to Medium', 'Hot', 'Very Hot', 'Extreme', 'flavor profiles'],
    description: 'Should categorize pepper varieties'
  },

  // Greeting Tests
  {
    category: 'Greetings',
    input: 'hello',
    expectedKeywords: ['Hi', 'Welcome', 'KadiPore Chilli Farms', 'premium chilli'],
    description: 'Should respond with welcome message'
  },
  {
    category: 'Greetings',
    input: 'hi there',
    expectedKeywords: ['Welcome', 'help', 'chilli'],
    description: 'Should provide friendly greeting'
  },

  // Fallback Tests
  {
    category: 'Fallback',
    input: 'random nonsense text xyz123',
    expectedKeywords: ['help with information', 'products', 'heat levels', 'ordering', 'farm tours'],
    description: 'Should return fallback response with available topics'
  },
  {
    category: 'Fallback',
    input: 'blah blah blah',
    expectedKeywords: ['What would you like to know', 'KadiPore Chilli Farms'],
    description: 'Should handle unrecognized input gracefully'
  }
];

// Test execution function
function runChatbotTests() {
  console.log('🌶️ Starting KadiPore Chilli Farms Chatbot Tests\n');
  console.log('=' * 60);
  
  let totalTests = testCases.length;
  let passedTests = 0;
  let failedTests = [];
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest ${index + 1}/${totalTests}: ${testCase.category}`);
    console.log(`Input: "${testCase.input}"`);
    console.log(`Description: ${testCase.description}`);
    
    try {
      // Get bot response
      const response = chilliChatbotConfig.getBotReply(testCase.input);
      
      // Check if response contains expected keywords
      const responseText = response.toLowerCase();
      const missingKeywords = [];
      const foundKeywords = [];
      
      testCase.expectedKeywords.forEach(keyword => {
        if (responseText.includes(keyword.toLowerCase())) {
          foundKeywords.push(keyword);
        } else {
          missingKeywords.push(keyword);
        }
      });
      
      // Determine if test passed
      const passThreshold = 0.6; // 60% of keywords must be found
      const foundPercentage = foundKeywords.length / testCase.expectedKeywords.length;
      const testPassed = foundPercentage >= passThreshold;
      
      if (testPassed) {
        console.log(`✅ PASSED (${Math.round(foundPercentage * 100)}% keywords found)`);
        console.log(`   Found: ${foundKeywords.join(', ')}`);
        passedTests++;
      } else {
        console.log(`❌ FAILED (${Math.round(foundPercentage * 100)}% keywords found)`);
        console.log(`   Found: ${foundKeywords.join(', ')}`);
        console.log(`   Missing: ${missingKeywords.join(', ')}`);
        failedTests.push({
          ...testCase,
          foundPercentage: Math.round(foundPercentage * 100),
          missingKeywords,
          response
        });
      }
      
      // Show partial response for verification
      console.log(`   Response preview: "${response.substring(0, 100)}..."`);
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      failedTests.push({
        ...testCase,
        error: error.message
      });
    }
    
    console.log('-'.repeat(60));
  });
  
  // Final results
  console.log(`\n🎯 TEST RESULTS SUMMARY`);
  console.log('=' * 60);
  console.log(`Total Tests: ${totalTests}`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests.length}`);
  console.log(`📊 Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (failedTests.length > 0) {
    console.log(`\n❌ FAILED TESTS DETAILS:`);
    failedTests.forEach((test, index) => {
      console.log(`\n${index + 1}. ${test.category}: "${test.input}"`);
      if (test.error) {
        console.log(`   Error: ${test.error}`);
      } else {
        console.log(`   Match Rate: ${test.foundPercentage}%`);
        console.log(`   Missing Keywords: ${test.missingKeywords.join(', ')}`);
      }
    });
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('🌶️ Chatbot testing completed!');
  
  return {
    totalTests,
    passedTests,
    failedTests: failedTests.length,
    successRate: Math.round((passedTests / totalTests) * 100),
    details: failedTests
  };
}

// Category-specific test functions
function testProductQuestions() {
  const productTests = testCases.filter(test => test.category === 'Products');
  console.log('🛍️ Testing Product Questions...\n');
  return runSpecificTests(productTests);
}

function testHeatLevelQuestions() {
  const heatTests = testCases.filter(test => test.category === 'Heat Levels');
  console.log('🔥 Testing Heat Level Questions...\n');
  return runSpecificTests(heatTests);
}

function testFarmInfoQuestions() {
  const farmTests = testCases.filter(test => test.category === 'Farm Info');
  console.log('🚜 Testing Farm Information Questions...\n');
  return runSpecificTests(farmTests);
}

function runSpecificTests(tests) {
  tests.forEach(test => {
    const response = chilliChatbotConfig.getBotReply(test.input);
    console.log(`Q: ${test.input}`);
    console.log(`A: ${response.substring(0, 200)}...`);
    console.log('---');
  });
}

// Quick response preview function
function previewResponses() {
  console.log('👀 QUICK RESPONSE PREVIEW\n');
  
  const sampleQuestions = [
    'What products do you sell?',
    'How hot are Carolina Reapers?',
    'Tell me about your farm',
    'How do I order?',
    'Can I visit the farm?'
  ];
  
  sampleQuestions.forEach(question => {
    const response = chilliChatbotConfig.getBotReply(question);
    console.log(`Q: ${question}`);
    console.log(`A: ${response.substring(0, 150)}...\n`);
  });
}

// Export functions for use
export {
  runChatbotTests,
  testProductQuestions,
  testHeatLevelQuestions,
  testFarmInfoQuestions,
  previewResponses,
  testCases
};

// Auto-run tests if this file is executed directly
if (typeof window === 'undefined') {
  // Running in Node.js environment
  runChatbotTests();
}

// Instructions for running the tests
console.log(`
🌶️ CHATBOT TESTING INSTRUCTIONS

To run these tests:

1. In browser console:
   - Open developer tools (F12)
   - Go to Console tab
   - Run: runChatbotTests()

2. Test specific categories:
   - testProductQuestions()
   - testHeatLevelQuestions()
   - testFarmInfoQuestions()

3. Quick preview:
   - previewResponses()

4. Individual test:
   - chilliChatbotConfig.getBotReply("your question here")

The tests verify that the chatbot returns appropriate responses
containing the expected keywords for each category of questions.
`);
