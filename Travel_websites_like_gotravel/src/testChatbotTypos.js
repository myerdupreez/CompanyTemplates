// Test script for chatbot with typos
const { textCorrector } = require('./textCorrector.js');

console.log('🤖 CHATBOT TYPO HANDLING TEST');
console.log('==============================\n');

// Test cases with common typos
const typoTests = [
  // Location misspellings
  'How much does a tour to tablemountain cost?',
  'I want to visit capetown with my familiy',
  'Are robbenisland tours saftey for childern?',
  
  // Travel logistics with typos
  'Can you arrange airpot transportation?',
  'We need accomodation recomendations',
  'What shutle services are availabel?',
  
  // Weather and timing with typos
  'What is the wether like in winer?',
  'Wat is the best temprature for visiting?',
  'Is it suny during sumer months?',
  
  // Booking and pricing with typos
  'How do I make a resevation?',
  'What are your priceing options?',
  'Do you have afordable familiy tours?',
  
  // Complex sentences with multiple typos
  'I dont know wat to expect on my frist trip to capetown',
  'Ca you help me plan tours that are childern friendly and dont cost to much?'
];

// Simulate the getBotReply function with text correction
function simulateChatbotWithCorrection(userMsg) {
  const corrected = textCorrector.correctText(userMsg);
  
  // Simple response simulation based on keywords
  const text = corrected.toLowerCase();
  
  if (text.includes('cost') || text.includes('price') || text.includes('much')) {
    return 'For pricing details and customized quotes, please contact us at +27 82 775 7357 or send us a message through our contact form.';
  }
  if (text.includes('family') || text.includes('children') || text.includes('kids')) {
    return 'Yes, children are welcome! However, it might be better to get more information through the contact form so we can recommend the best options for your family.';
  }
  if (text.includes('weather') || text.includes('temperature') || text.includes('sunny') || text.includes('winter') || text.includes('summer')) {
    return 'Cape Town has a Mediterranean climate. Summers are warm and dry, winters are mild and wet. The best time is during the summer months (November to March).';
  }
  if (text.includes('airport') || text.includes('transport') || text.includes('shuttle')) {
    return 'Yes, we can arrange airport transfers for you.';
  }
  if (text.includes('accommodation') || text.includes('recommend')) {
    return 'I can help with information about Cape Town attractions, best times to visit, visas, languages, water safety, tipping, airport transfers, packing, family trips, booking and customized tours!';
  }
  if (text.includes('safety') || text.includes('safe')) {
    return 'Cape Town is generally safe, but always keep an eye on your belongings.';
  }
  if (text.includes('book') || text.includes('reservation')) {
    return 'Fill in your details in the "Make your trip to Cape Town" section and we will get back to you.';
  }
  
  return 'I can help with information about Cape Town attractions, best times to visit, visas, languages, water safety, tipping, airport transfers, packing, family trips, booking and customized tours!';
}

typoTests.forEach((test, index) => {
  const corrected = textCorrector.correctText(test);
  const response = simulateChatbotWithCorrection(test);
  
  console.log(`Test ${index + 1}:`);
  console.log(`Original:  "${test}"`);
  console.log(`Corrected: "${corrected}"`);
  console.log(`Response:  "${response}"`);
  console.log('');
});

console.log('✅ Chatbot typo handling test completed!');
