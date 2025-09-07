// Quick test to verify the pricing logic fix
const t = {
  replies: {
  pricing: 'For pricing details and customized quotes, please contact us at +27 82 775 7357 or send us a message through our contact form.',
    family: 'Yes, children are welcome! However, it might be better to get more information through the contact form so we can recommend the best options for your family.',
    fallback: 'I can help with information about Cape Town attractions, best times to visit, visas, languages, water safety, tipping, airport transfers, packing, family travel, booking, and custom trips. Please ask anything in these areas!'
  }
};

function getBotReply(userMsg) {
  const text = userMsg.toLowerCase();
  const tourKeywords = ['table mountain','robben island','waterfront','cape point','good hope','kirstenbosch','boulders','penguin','camps bay','clifton','chapman','constantia','wine','attraction','see','landmark','достопр','столовая гора','роббен','водный фронт','мыс доброй надежды','кирстенбош','болдерс','пингвин','пляж','винный','tour','tours','trip','экскурс','экскурсия','экскурсии'];
  const familyKeywords = ['family','children','kids','child','семья','дети'];
  const pricingKeywords = ['price','pricing','cost','how much','expensive','cheap','budget','fee','rate','quote','цена','стоимос','сколько','дорог','дешев','бюджет','тариф'];
  
  // Check for pricing keywords first (highest priority)
  // If someone asks about cost/price, they want pricing info regardless of other keywords
  if (pricingKeywords.some(kw => text.includes(kw))) {
    return t.replies['pricing'] || t.replies.fallback;
  }
  
  // If both tour and family/children keywords are present, prioritize family
  const hasTour = tourKeywords.some(kw => text.includes(kw));
  const hasFamily = familyKeywords.some(kw => text.includes(kw));
  if (hasTour && hasFamily) {
    return t.replies['family'] || t.replies.fallback;
  }
  
  // Simple fallback for this test
  if (hasFamily) return t.replies['family'];
  return t.replies.fallback;
}

console.log('🧪 Testing Corrected Pricing Logic\n');

const testQuestions = [
  "How much does it cost for children?",
  "What are your family prices?", 
  "Cost for kids on tours?",
  "Children's pricing?",
  "How expensive for a family of 4?",
  "Are the tours children friendly?", // Should still be family
  "Family tours available?", // Should still be family
];

testQuestions.forEach(question => {
  const response = getBotReply(question);
  const isCorrect = question.includes('cost') || question.includes('price') || question.includes('expensive') ? 
    response.includes('pricing details') : 
    response.includes('children are welcome');
  
  console.log(`Q: "${question}"`);
  console.log(`A: ${response.substring(0, 80)}...`);
  console.log(`✅ ${isCorrect ? 'CORRECT' : 'INCORRECT'} - ${question.includes('cost') || question.includes('price') || question.includes('expensive') ? 'Should be PRICING' : 'Should be FAMILY'}\n`);
});

console.log('✅ Testing completed!');
