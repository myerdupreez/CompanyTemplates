// Simple focused test to check specific chatbot responses
console.log('🤖 Testing Chatbot Responses\n');

// Test the specific pricing questions that are failing
const pricingTests = [
  "How much do your tours cost?",
  "How expensive are the tours?",
  "What are your prices?",
  "Can you give me a quote?"
];

const getBotReply = (userMsg) => {
  const text = userMsg.toLowerCase();
  
  // Check for pricing keywords first (highest priority)
  const pricingKeywords = ['price', 'pricing', 'cost', 'how much', 'expensive', 'cheap', 'budget', 'fee', 'rate', 'quote'];
  if (pricingKeywords.some(kw => text.includes(kw))) {
    return '💰 PRICING: For pricing details and customized quotes, please contact us at +27 82 775 7357 or send us a message through our contact form.';
  }
  
  // Check for family keywords
  const familyKeywords = ['family', 'children', 'kids', 'child'];
  if (familyKeywords.some(kw => text.includes(kw))) {
    return '👨‍👩‍👧‍👦 FAMILY: Yes, children are welcome! However, it might be better to get more information through the contact form so we can recommend the best options for your family.';
  }
  
  // Check for tours/attractions
  const tourKeywords = ['tour', 'tours', 'attraction', 'table mountain'];
  if (tourKeywords.some(kw => text.includes(kw))) {
    return '🗺️ TOURS: Table Mountain and other attractions info...';
  }
  
  return '❓ FALLBACK: I can help with various Cape Town information!';
};

pricingTests.forEach(question => {
  const response = getBotReply(question);
  console.log(`Q: ${question}`);
  console.log(`A: ${response}`);
  console.log('---');
});

console.log('\n✅ Test completed!');
