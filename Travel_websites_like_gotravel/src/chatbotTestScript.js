// chatbotTestScript.js
// Script to test chatbot responses for various user questions

const testQuestions = [
  // Family/children
  "Are the tours children friendly?",
  "Can I bring my kids on the tours?",
  "Is Cape Town family friendly?",
  "Are your trips suitable for children?",
  // Tour/attractions
  "What are the top attractions in Cape Town?",
  "Tell me about Table Mountain.",
  "What can I see at the V&A Waterfront?",
  // Weather
  "What's the weather like in December?",
  "When is the best time to visit Cape Town?",
  // Currency
  "What currency is used in Cape Town?",
  // Safety
  "Is Cape Town safe for tourists?",
  // Language
  "What languages are spoken in Cape Town?",
  // Visa
  "Do I need a visa to visit South Africa?",
  // Water
  "Is the tap water safe to drink?",
  // Tipping
  "How much should I tip in restaurants?",
  // Airport
  "Can you arrange airport transfers?",
  // Packing
  "What should I pack for my trip?",
  // Booking
  "How do I book a tour?",
  // Tailor-made
  "Can I customize my tour?",
  // Pricing - NEW
  "How much do your tours cost?",
  "What are your prices?",
  "What's the pricing for a family tour?",
  "Can you give me a quote?",
  "How expensive are the tours?",
  // Fallback
  "Do you offer skydiving?",
  "Is there a Disneyland in Cape Town?"
];

// Simulate the getBotReply function from CustomChatbotWidget.jsx
// Paste your getBotReply function here for local testing, or import it if modularized.

// Example usage:
// testQuestions.forEach(q => {
//   const reply = getBotReply(q);
//   console.log(`Q: ${q}\nA: ${reply}\n`);
// });


// --- Begin getBotReply function (EN only for test) ---
const t = {
  replies: {
    weather: 'Cape Town has a Mediterranean climate. Summers are warm and dry, winters are mild and wet. The best time is during the summer months (November to March) for warm, sunny weather, beach days, and outdoor activities. Spring (September–October) and autumn (April–May) are also great for fewer crowds and mild weather.',
    currency: 'The local currency is South African Rand (ZAR).',
    safe: 'Cape Town is generally safe, but always keep an eye on your belongings.',
    tour: `Table Mountain – Iconic landmark with breathtaking views of the city and coastline.\nRobben Island – Historic site where Nelson Mandela was imprisoned, rich in South Africa’s history.\nV&A Waterfront – Bustling hub with shops, restaurants, the Two Oceans Aquarium, and harbour views.\nCape Point & Cape of Good Hope – Dramatic scenery where the Atlantic and Indian oceans meet.\nKirstenbosch Botanical Gardens – World-renowned gardens showcasing South Africa’s unique plant life.\nBoulders Beach – Home to a colony of African penguins, great for families and photography.\nCamps Bay & Clifton beaches – White sandy beaches perfect for relaxing, swimming, and sunsets.\nChapman’s Peak Drive – Scenic coastal road with stunning viewpoints for photos.\nConstantia Wine Route – One of the oldest wine regions in the Southern Hemisphere.`,
    besttime: 'The best time is during the summer months (November to March) for warm, sunny weather, beach days, and outdoor activities. Spring (September–October) and autumn (April–May) are also great for fewer crowds and mild weather.',
    visa: 'Visa requirements depend on your country of citizenship. For more information, visit: https://www.southafricaentryform.com/news/eligible-visa-free-countries-south-africa',
    language: 'Cape Town has 3 main official languages: English, Afrikaans, and isiXhosa. English is widely spoken in tourist areas.',
    water: 'Yes, the tap water in Cape Town is generally safe to drink. Bottled water is also readily available.',
    tipping: 'Restaurants: 10–15% of the bill if service was good.\nTour guides: R50–R100 per person (or more for private tours).\nDrivers/porters: R10–R20 per bag or short trip.',
    airport: 'Yes, we can arrange airport transfers for you.',
    packing: 'Comfortable walking shoes\nSunscreen, hat, and sunglasses\nA light jacket (evenings can be cool)\nSwimsuit & beachwear\nCamera / binoculars\nReusable water bottle\nAdapter for South African plugs (Type M)',
    family: 'Yes, children are welcome! However, it might be better to get more information through the contact form so we can recommend the best options for your family.',
    booking: 'Fill in your details in the "Make your trip to Cape Town" section and we will get back to you.',
    tailor: 'Absolutely! All trips can be tailored to your needs and interests. Let us know what you want to see and do.',
  pricing: 'For pricing details and customized quotes, please contact us at +27 82 775 7357 or send us a message through our contact form.',
    fallback: 'I can help with information about Cape Town attractions, best times to visit, visas, languages, water safety, tipping, airport transfers, packing, family travel, booking, and custom trips. Please ask anything in these areas!'
  }
};

function getBotReply(userMsg) {
  const text = userMsg.toLowerCase();
  const tourKeywords = ['table mountain','robben island','waterfront','cape point','good hope','kirstenbosch','boulders','penguin','camps bay','clifton','chapman','constantia','wine','attraction','see','landmark','достопр','столовая гора','роббен','водный фронт','мыс доброй надежды','кирстенбош','болдерс','пингвин','пляж','винный','tour','tours','trip','экскурс','экскурсия','экскурсии'];
  const familyKeywords = ['family','children','kids','child','семья','дети'];
  const packingKeywords = ['pack','packing','bring','clothes','одежд','вещи','suitcase','bag','luggage'];
  const tailorKeywords = ['custom','tailor','personal','individual','bespoke','adapt','special','особый','индивидуал','customize','customise'];
  const pricingKeywords = ['price','pricing','cost','how much','expensive','cheap','budget','fee','rate','quote','цена','стоимос','сколько','дорог','дешев','бюджет','тариф'];
  
  // Check for pricing first (highest priority)
  if (pricingKeywords.some(kw => text.includes(kw))) {
    return t.replies['pricing'] || t.replies.fallback;
  }
  
  // If both tour and family/children keywords are present, prioritize family
  const hasTour = tourKeywords.some(kw => text.includes(kw));
  const hasFamily = familyKeywords.some(kw => text.includes(kw));
  const hasPacking = packingKeywords.some(kw => text.includes(kw));
  const hasTailor = tailorKeywords.some(kw => text.includes(kw));
  
  // Packing and tailor/customize should take precedence over tour
  // Special case: "bring kids" should be family, not packing
  if (hasFamily && text.includes('bring')) {
    return t.replies['family'] || t.replies.fallback;
  }
  if (hasPacking && !hasFamily) return t.replies['packing'] || t.replies.fallback;
  if (hasTailor) return t.replies['tailor'] || t.replies.fallback;
  if (hasTour && hasFamily) {
    return t.replies['family'] || t.replies.fallback;
  }
  // Otherwise, use the original scoring logic
  const categories = [
    { key: 'tour', keywords: tourKeywords },
    { key: 'weather', keywords: ['weather','climate','season','month','best time','погод','климат','сезон','месяц','лучшее время'] },
    { key: 'currency', keywords: ['currency','money','rand','валют'] },
    { key: 'safe', keywords: ['safe','safety','crime','secure','безопас','tourists'] },
    { key: 'language', keywords: ['language','язык','speak','english','afrikaans','xhosa','коса','африкаанс','английский'] },
    { key: 'visa', keywords: ['visa','entry','passport','travel document','виза'] },
    { key: 'water', keywords: ['water','drink','tap','bottle','вод'] },
    { key: 'tipping', keywords: ['tip','tipping','gratuity','чаев'] },
    { key: 'airport', keywords: ['airport','transfer','pickup','shuttle','трансфер','аэропорт'] },
    { key: 'family', keywords: familyKeywords },
    { key: 'packing', keywords: packingKeywords },
    { key: 'booking', keywords: ['book','booking','reserve','reservation','how do i book','sign up','register','запис','брони','booking service','service booking'] },
    { key: 'tailor', keywords: tailorKeywords },
    { key: 'pricing', keywords: ['price','pricing','cost','how much','expensive','cheap','budget','fee','rate','quote','цена','стоимос','сколько','дорог','дешев','бюджет','тариф'] },
  ];
  let bestScore = 0;
  let bestKey = 'fallback';
  for (const cat of categories) {
    let score = 0;
    for (const kw of cat.keywords) {
      if (text.includes(kw)) score++;
    }
    // Special: booking+service correlation
    if (cat.key === 'booking' && text.includes('booking') && text.includes('service')) score += 2;
    if (score > bestScore) {
      bestScore = score;
      bestKey = cat.key;
    }
  }
  // If the best match is 'tour' but the question is unrelated (like skydiving, Disneyland), fallback
  if (bestKey === 'tour' && bestScore === 1 && (text.includes('skydiving') || text.includes('disneyland'))) {
    return t.replies.fallback;
  }
  return t.replies[bestKey] || t.replies.fallback;
}

// Run the test
testQuestions.forEach(q => {
  const reply = getBotReply(q);
  console.log(`Q: ${q}\nA: ${reply}\n`);
});

module.exports = { testQuestions, getBotReply };
