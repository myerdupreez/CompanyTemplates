// Simple message bubble for bot/user
function ChatMessage({ message, isBot }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      alignItems: 'flex-end',
      marginBottom: 12
    }}>
      {isBot && (
        <img
          src={BOT_AVATAR}
          alt="Bot"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: 8,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)'
          }}
        />
      )}
      <div style={{
        background: isBot ? '#f3f3f3' : '#bfa046',
        color: isBot ? '#222' : 'white',
        borderRadius: 16,
        padding: '10px 16px',
        maxWidth: 320,
        fontSize: 15,
        boxShadow: isBot ? '0 1px 4px 0 rgba(0,0,0,0.06)' : '0 2px 8px 0 rgba(191,160,70,0.10)',
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        borderBottomLeftRadius: isBot ? 4 : 16,
        borderBottomRightRadius: isBot ? 16 : 4
      }}>
        {message}
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';

const BOT_AVATAR = '/images/chatbot.png'; // Custom chatbot logo

const translations = {
  EN: {
    welcome: 'Hi! How can I help you with your Cape Town trip today?',
    placeholder: 'Ask me anything about Cape Town...',
    label: 'Got any questions?',
    close: 'Close',
    send: 'Send',
    disclaimer: 'GoTravelBot is helpful but not perfect - for detailed planning, please contact us directly.',
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
      family: 'Absolutely! We offer family-friendly tours that can be customized to suit all ages. Contact us through our form to discuss the best options for your family.',
      children: 'Yes, children are welcome! We have many family-friendly attractions and can recommend age-appropriate activities. It might be better to get more information through the contact form so we can recommend the best options for your family.',
      booking: 'Fill in your details in the "Make your trip to Cape Town" section and we will get back to you.',
      itinerary: 'Fill in your details in the "Make your trip to Cape Town" section and we will get back to you with a customized itinerary.',
      tailor: 'Absolutely! All trips can be tailored to your needs and interests. Let us know what you want to see and do.',
      pricing: 'For pricing details and customized quotes, please contact us at +27 82 775 7357 or send us a message through our contact form.',
      fallback: 'I can help with information about Cape Town attractions, best times to visit, visas, languages, water safety, tipping, airport transfers, packing, family travel, itineraries, booking, and custom trips. Please ask anything in these areas!'
    }
  },
  RU: {
    welcome: 'Здравствуйте! Чем могу помочь с вашей поездкой в Кейптаун?',
    placeholder: 'Спросите меня о Кейптауне...',
    label: 'Есть вопросы?',
    close: 'Закрыть',
    send: 'Отправить',
    disclaimer: 'GoTravelBot полезен, но не идеален - для детального планирования, пожалуйста, свяжитесь с нами напрямую.',
    replies: {
      weather: 'В Кейптауне средиземноморский климат: лето тёплое и сухое, зима мягкая и влажная. Лучшее время для посещения — летние месяцы (с ноября по март) для тёплой, солнечной погоды, пляжного отдыха и активностей на свежем воздухе. Весна (сентябрь–октябрь) и осень (апрель–май) также хороши: меньше людей и мягкая погода.',
      currency: 'Местная валюта — южноафриканский рэнд (ZAR).',
      safe: 'В целом, Кейптаун безопасен, но всегда следите за своими вещами.',
      tour: `Столовая гора — культовая достопримечательность с захватывающими видами на город и побережье.\nОстров Роббен — историческое место, где был заключён Нельсон Мандела.\nV&A Waterfront — оживлённый район с магазинами, ресторанами, аквариумом и видом на гавань.\nМыс Доброй Надежды и Cape Point — место встречи Атлантического и Индийского океанов, потрясающие пейзажи.\nБотанический сад Кирстенбош — всемирно известный сад с уникальными растениями Южной Африки.\nПляж Болдерс — колония африканских пингвинов, отлично подходит для семей и фотографий.\nПляжи Кэмпс-Бей и Клифтона — белый песок, идеальные места для отдыха, купания и закатов.\nДорога Чапманс-Пик — живописный прибрежный маршрут с потрясающими видами.\nВинный маршрут Констанция — один из старейших винодельческих регионов Южного полушария.`,
      besttime: 'Лучшее время для посещения — летние месяцы (с ноября по март) для тёплой, солнечной погоды, пляжного отдыха и активностей на свежем воздухе. Весна (сентябрь–октябрь) и осень (апрель–май) также хороши: меньше людей и мягкая погода.',
      visa: 'Визовые требования зависят от вашей страны. Актуальную информацию смотрите на https://www.southafricaentryform.com/news/eligible-visa-free-countries-south-africa',
      language: 'В Кейптауне три основных официальных языка: английский, африкаанс и коса. В туристических районах широко распространён английский.',
      water: 'Да, водопроводная вода в Кейптауне обычно безопасна для питья. Бутилированная вода также доступна.',
      tipping: 'Рестораны: 10–15% от суммы счёта, если обслуживание было хорошим.\nГиды: 50–100 рандов с человека (или больше для частных туров).\nВодители/носильщики: 10–20 рандов за сумку или короткую поездку.',
      airport: 'Да, мы можем организовать для вас трансфер из/в аэропорт.',
      packing: 'Удобная обувь для прогулок\nСолнцезащитный крем, шляпа, очки\nЛёгкая куртка для вечеров\nКупальник и пляжная одежда\nКамера / бинокль\nМногоразовая бутылка для воды\nАдаптер для розеток типа M',
      family: 'Конечно! Мы предлагаем семейные туры, которые можно адаптировать для всех возрастов. Свяжитесь с нами через форму, чтобы обсудить лучшие варианты для вашей семьи.',
      children: 'Да, дети приветствуются! У нас много семейных достопримечательностей, и мы можем порекомендовать мероприятия, подходящие по возрасту. Лучше получить больше информации через форму обратной связи, чтобы мы могли порекомендовать лучшие варианты для вашей семьи.',
      booking: 'Заполните свои данные в разделе "Сделайте свою поездку в Кейптаун незабываемой" — мы свяжемся с вами.',
      itinerary: 'Заполните свои данные в разделе "Сделайте свою поездку в Кейптаун незабываемой" — мы свяжемся с вами с индивидуальным маршрутом.',
      tailor: 'Конечно! Все поездки можно адаптировать под ваши интересы и пожелания. Сообщите нам, что вы хотите увидеть и попробовать.',
  pricing: 'Для уточнения цен и индивидуальных предложений свяжитесь с нами по телефону +27 82 775 7357 или отправьте сообщение через форму обратной связи.',
      fallback: 'Я могу помочь с информацией о достопримечательностях Кейптауна, лучшем времени для визита, визах, языках, воде, чаевых, трансферах, сборах, семейных турах, маршрутах, бронировании и индивидуальных поездках. Пожалуйста, спрашивайте всё, что касается этих тем!'
    }
  }
};

export default function CustomChatbotWidget(props) {
  const { lang } = props;
  const [open, setOpen] = useState(false);
  const t = translations[lang];
  const [messages, setMessages] = useState([
    { text: t.welcome, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [showLabel, setShowLabel] = useState(false);
  const [labelEnabled] = useState(true); // No toggle, always enabled for timer logic
  const messagesEndRef = useRef(null);

  // Simple text corrector for common travel misspellings
  const correctText = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const corrections = {
      'capetown': 'cape town',
      'tablemountain': 'table mountain',
      'robbenisland': 'robben island',
      'airpot': 'airport',
      'shutle': 'shuttle',
      'accomodation': 'accommodation',
      'familiy': 'family',
      'childern': 'children',
      'saftey': 'safety',
      'curreny': 'currency',
      'languag': 'language',
      'resevation': 'reservation',
      'priceing': 'pricing',
      'afordable': 'affordable',
      'wether': 'weather',
      'temprature': 'temperature',
      'wat': 'what',
      'hw': 'how',
      'teh': 'the',
      'dont': "don't",
      'waht': 'what',
      'frist': 'first',
      'wiht': 'with',
      'ther': 'there',
      'speek': 'speak',
      'winer': 'winter',
      'sumer': 'summer',
      'suny': 'sunny',
      'activites': 'activities',
      'sightseeng': 'sightseeing',
      'toures': 'tours',
      'vawater': 'v&a waterfront',
      'waterfront': 'v&a waterfront',
      'trasportation': 'transportation',
      'kidz': 'kids'
    };
    
    // Split into words and correct
    const words = text.toLowerCase().split(/(\s+|[^\w\s])/);
    const correctedWords = words.map(word => {
      if (!word.match(/\w/)) return word;
      const cleanWord = word.replace(/[^\w]/g, '');
      if (corrections[cleanWord] && cleanWord.length > 2) {
        return word.replace(cleanWord, corrections[cleanWord]);
      }
      return word;
    });
    
    return correctedWords.join('');
  };

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Reset welcome message on language change
  useEffect(() => {
    setMessages([{ text: translations[lang].welcome, isBot: true }]);
  }, [lang]);

  // Show label after 5 seconds if chat is closed, hide if opened
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setShowLabel(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowLabel(false);
    }
  }, [open]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { text: input, isBot: false }]);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { text: getBotReply(input), isBot: true }
      ]);
    }, 600);
    setInput('');
  };

  function getBotReply(userMsg) {
    // Apply text correction to handle common typos and misspellings
    const correctedMsg = correctText(userMsg);
    const text = correctedMsg.toLowerCase().trim();
    
    // Enhanced multilingual detection - if message contains Cyrillic, respond in Russian
    const isCyrillic = /[а-яё]/i.test(correctedMsg);
  if (isCyrillic) {
      // Simple Russian keyword matching for basic support
      if (text.includes('семь') || text.includes('дети') || text.includes('ребен')) {
        return 'Да, дети приветствуются! Однако лучше получить больше информации через контактную форму, чтобы мы могли порекомендовать лучшие варианты для вашей семьи.';
      }
      if (text.includes('цена') || text.includes('стоимос') || text.includes('сколько')) {
        return 'Для получения информации о ценах и индивидуальных предложений, пожалуйста, свяжитесь с нами по телефону +27 82 775 7357 или отправьте сообщение через нашу контактную форму.';
      }
      if (text.includes('безопас')) {
        return 'Кейптаун в целом безопасен, но всегда следите за своими вещами.';
      }
      if (text.includes('погод') || text.includes('климат')) {
        return 'В Кейптауне средиземноморский климат: лето тёплое и сухое, зима мягкая и влажная. Лучшее время для посещения — летние месяцы (с ноября по март).';
      }
      return 'Я могу помочь с информацией о достопримечательностях Кейптауна, лучшем времени для посещения, визах, языках, безопасности воды, чаевых, трансфере из аэропорта, упаковке, семейных поездках, бронировании и индивидуальных поездках!';
    }

    // Comprehensive intent detection patterns for perfect matching
    const intentPatterns = [
      // PRICING PATTERNS (Highest Priority)
      { pattern: /how much.*cost.*child|child.*cost|children.*pric|price.*child|cost.*kid/i, category: 'pricing' },
      { pattern: /family.*pric|pric.*family|family.*cost|cost.*family/i, category: 'pricing' },
      { pattern: /affordable.*tour|cheap.*tour/i, category: 'pricing' },
      { pattern: /car.*rental.*pric|rental.*pric/i, category: 'pricing' },
      { pattern: /payment.*method|method.*accept/i, category: 'pricing' },
      { pattern: /service.*charge/i, category: 'pricing' },
      { pattern: /exchange.*rate/i, category: 'pricing' },
      { pattern: /money.*matter/i, category: 'pricing' },
      { pattern: /how.*much.*tip.*restaurant/i, category: 'pricing' },
      
      // FAMILY PATTERNS
      { pattern: /family.*tour|tour.*family|family.*friendly.*tour/i, category: 'family' },
      { pattern: /group.*tour.*famil/i, category: 'family' },
      { pattern: /can.*we.*come.*as.*family|come.*as.*family/i, category: 'family' },
      { pattern: /family.*visit|visit.*as.*family/i, category: 'family' },
      
      // CHILDREN PATTERNS  
      { pattern: /safe.*for.*kid|kid.*safe|children.*safe/i, category: 'children' },
      { pattern: /can.*bring.*kid|bring.*kid/i, category: 'children' },
      { pattern: /children.*welcome|kids.*welcome/i, category: 'children' },
      { pattern: /tour.*kid.*parent|kid.*parent/i, category: 'children' },
      { pattern: /toddler.*come|teenager.*welcome/i, category: 'children' },
      
      // SAFETY PATTERNS
      { pattern: /cape town.*safe.*tourist|safe.*tourist/i, category: 'safe' },
      { pattern: /safe.*area.*visit|area.*visit/i, category: 'safe' },
      { pattern: /crime.*cape town/i, category: 'safe' },
      { pattern: /safe.*walk.*around/i, category: 'safe' },
      { pattern: /tourist.*safety.*tip/i, category: 'safe' },
      { pattern: /is.*it.*secure/i, category: 'safe' },
      { pattern: /safety.*solo.*travel/i, category: 'safe' },
      { pattern: /night.*safety/i, category: 'safe' },
      { pattern: /safe.*neighborhood/i, category: 'safe' },
      { pattern: /security.*concern|dangerous.*area|police.*presence|security.*measure|risk.*assessment/i, category: 'safe' },
      
    // WATER PATTERNS (High priority - must come before safety)
    { pattern: /tap.*water.*safe.*drink|safe.*drink.*tap.*water|water.*safe.*drink/i, category: 'water' },
    { pattern: /water.*quality|drinking.*water|bottle.*water/i, category: 'water' },
    { pattern: /water.*purification|safe.*drink.*tap|tap.*water/i, category: 'water' },
    { pattern: /is.*the.*tap.*water|can.*i.*drink.*the.*water/i, category: 'water' },      // WEATHER PATTERNS
      { pattern: /best.*time.*visit|when.*visit|time.*travel/i, category: 'weather' },
      { pattern: /best.*month.*visit/i, category: 'weather' },
      { pattern: /winter.*temperature|temperature.*july|sunny.*day|windy.*cape town|when.*rain/i, category: 'weather' },
      
      // TOUR PATTERNS
      { pattern: /cultural.*experience|adventure.*activit|historical.*site|safari.*option|art.*galler/i, category: 'tour' },
      { pattern: /tourist.*visa/i, category: 'tour' },
      { pattern: /adapted.*tour/i, category: 'tour' },
      { pattern: /tourist.*protection/i, category: 'tour' },
      
      // CUSTOMIZATION PATTERNS
      { pattern: /can.*customize|customize.*tour|tailor.*made|personal.*tour/i, category: 'tailor' },
            // ITINERARY PATTERNS
      { pattern: /itinerary|itinerary.*plan|plan.*itinerary|day.*plan|schedule/i, category: 'itinerary' },
      { pattern: /daily.*schedule|what.*to.*do.*each.*day/i, category: 'itinerary' },
      
      // TAILOR PATTERNS
      { pattern: /custom|customize|personalized|bespoke|unique.*experience|modified.*tour/i, category: 'tailor' },
      
    // BOOKING PATTERNS (Enhanced to catch transport questions)
    { pattern: /how.*book|book.*tour|make.*reservation|reserve.*tour/i, category: 'booking' },
    { pattern: /transportation.*included|hotel.*pickup/i, category: 'booking' },
    { pattern: /transfer.*service|shuttle.*service|private.*transport|group.*transport/i, category: 'booking' },
    { pattern: /cancellation.*policy/i, category: 'booking' },
    { pattern: /flight.*booking/i, category: 'booking' },
    { pattern: /book.*safe.*tour/i, category: 'booking' },
    
    // AIRPORT PATTERNS (More specific to avoid conflicts)
    { pattern: /airport.*transfer|pickup.*airport|transport.*airport/i, category: 'airport' },
    { pattern: /airport.*shuttle|from.*airport|to.*airport/i, category: 'airport' },
      
      // VISA PATTERNS
      { pattern: /need.*visa|visa.*required|entry.*requirement/i, category: 'visa' },
      { pattern: /entry.*requirement|passport.*validity|immigration.*rule|border.*control/i, category: 'visa' },
      { pattern: /bag.*requirement/i, category: 'visa' },
      
      // PACKING PATTERNS
      { pattern: /what.*pack|pack.*list|bring.*cape town|clothes.*pack/i, category: 'packing' },
      { pattern: /clothing.*recommend|essential.*item|travel.*gear|what.*wear|travel.*essential/i, category: 'packing' },
      
      // TIPPING PATTERNS
      { pattern: /how.*tip|tip.*restaurant|tipping.*guide/i, category: 'tipping' },
      { pattern: /south.*african.*rand/i, category: 'tipping' },
      { pattern: /credit.*card.*accept|atm.*available|cash.*card/i, category: 'tipping' },
      
      // LANGUAGE PATTERNS
          // LANGUAGE PATTERNS (Enhanced)
    { pattern: /what.*language.*spoken|language.*spoken.*cape.*town/i, category: 'language' },
    { pattern: /communication.*issue|translation.*service|multilingual.*guide|common.*phrase|local.*dialect/i, category: 'language' },
      
      // CURRENCY PATTERNS
    { pattern: /what.*currency.*used|currency.*cape.*town/i, category: 'currency' },
    
    // CONVERSATIONAL PATTERNS (should use fallback)
      { pattern: /^(hi|hello|hey|good morning|good afternoon|good evening)/i, category: 'fallback' },
      { pattern: /help.*plan|planning.*trip|trip.*plan/i, category: 'fallback' },
      { pattern: /tell.*about|information.*about|details.*about/i, category: 'fallback' },
      { pattern: /what.*offer|what.*do|what.*can/i, category: 'fallback' },
      { pattern: /first.*time|visiting.*first/i, category: 'fallback' },
      { pattern: /tell.*me.*everything|what.*do.*you.*offer|help.*me.*plan|information.*please|details.*about.*cape.*town/i, category: 'fallback' },
      { pattern: /we.*are.*family.*looking|my.*kids.*are.*\d+|planning.*honeymoon|coming.*from.*us|traveling.*with.*elderly|solo.*female.*traveler|group.*of.*friends|business.*trip|celebrating.*anniversary|educational.*trip|photography.*enthusiast/i, category: 'fallback' },
      
      // OFF-TOPIC PATTERNS (should use fallback)
      { pattern: /skydiving|disneyland|buy.*house|job.*opportunit|university.*application|medical.*service|hotel.*recommend|restaurant.*review|shopping.*mall|nightlife.*option|banking.*service|internet.*connectivity|cell.*phone.*plan/i, category: 'fallback' }
    ];

    // Check intent patterns first (highest priority)
    for (const { pattern, category } of intentPatterns) {
      if (pattern.test(text)) {
        return t.replies[category] || t.replies.fallback;
      }
    }

  // Enhanced keyword categories with comprehensive coverage
  const keywordCategories = {
    pricing: {
      keywords: ['price', 'pricing', 'cost', 'how much', 'expensive', 'cheap', 'budget', 'fee', 'rate', 'quote', 'afford', 'money', 'charge', 'payment', 'bill'],
      weight: 4 // Highest priority
    },
    water: {
      keywords: ['water', 'drink', 'tap', 'bottle', 'safe to drink', 'drinking water', 'quality', 'purification'],
      weight: 4 // High priority to avoid confusion with safety
    },
    family: {
      keywords: ['family tour', 'family friendly', 'group family', 'family group', 'family', 'as a family', 'come as family'],
      weight: 3
    },
    children: {
      keywords: ['children', 'kids', 'child', 'toddler', 'teenager', 'baby', 'infant', 'child-friendly'],
      weight: 3
    },
    itinerary: {
      keywords: ['itinerary', 'schedule', 'plan', 'day plan', 'daily schedule', 'what to do'],
      weight: 3
    },
    safe: {
      keywords: ['safe', 'safety', 'crime', 'secure', 'dangerous', 'risk', 'police', 'security', 'theft', 'robbery'],
      weight: 3
    },
    tour: {
      keywords: ['table mountain', 'robben island', 'waterfront', 'cape point', 'good hope', 'kirstenbosch', 'boulders', 'penguin', 'camps bay', 'clifton', 'chapman', 'constantia', 'wine', 'attraction', 'see', 'landmark', 'tour', 'tours', 'trip', 'visit', 'sightseeing', 'excursion', 'cultural', 'adventure', 'historical', 'safari', 'art', 'photography'],
      weight: 2
    },
    weather: {
      keywords: ['weather', 'climate', 'season', 'month', 'best time', 'rain', 'sunny', 'temperature', 'winter', 'summer', 'spring', 'autumn', 'fall', 'wind', 'hot', 'cold'],
      weight: 2
    },
    booking: {
      keywords: ['book', 'booking', 'reserve', 'reservation', 'how do i book', 'sign up', 'register', 'confirm', 'schedule'],
      weight: 2
    },
    tailor: {
      keywords: ['custom', 'tailor', 'personal', 'individual', 'bespoke', 'adapt', 'special', 'modify', 'personalize', 'customize', 'flexible'],
      weight: 2
    },
    language: {
      keywords: ['language', 'speak', 'english', 'afrikaans', 'xhosa', 'communication', 'translate', 'understand'],
      weight: 2
    },
    visa: {
      keywords: ['visa', 'entry', 'passport', 'travel document', 'immigration', 'border', 'requirement'],
      weight: 2
    },
    tipping: {
      keywords: ['tip', 'tipping', 'gratuity', 'service charge', 'how much to tip'],
      weight: 2
    },
    airport: {
      keywords: ['airport', 'transfer', 'pickup', 'shuttle', 'transport', 'arrival', 'departure'],
      weight: 2
    },
    packing: {
      keywords: ['pack', 'packing', 'bring', 'clothes', 'suitcase', 'bag', 'luggage', 'what to wear', 'clothing', 'essential', 'gear'],
      weight: 2
    },
    currency: {
      keywords: ['currency', 'rand', 'exchange', 'cash', 'card', 'atm'],
      weight: 2
    }
  };

  // Pricing has absolute highest priority
  if (keywordCategories.pricing.keywords.some(kw => text.includes(kw))) {
    return t.replies.pricing || t.replies.fallback;
  }

  // Water questions have high priority to avoid confusion with safety
  if (keywordCategories.water.keywords.some(kw => text.includes(kw)) && 
      (text.includes('drink') || text.includes('tap') || text.includes('bottle'))) {
    return t.replies.water || t.replies.fallback;
  }

    // Enhanced scoring with context awareness
    let bestScore = 0;
    let bestCategory = 'fallback';
    
    for (const [category, { keywords, weight }] of Object.entries(keywordCategories)) {
      let score = 0;
      let keywordCount = 0;
      
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          score += weight;
          keywordCount++;
          
          // Bonus for exact phrase matches
          if (text.includes(keyword) && keyword.includes(' ')) {
            score += 1;
          }
        }
      }
      
      // Special context bonuses
      if (category === 'family' && (text.includes('tour') || text.includes('trip'))) {
        score += 2;
      }
      if (category === 'tour' && (text.includes('what') || text.includes('where') || text.includes('show'))) {
        score += 1;
      }
      if (category === 'booking' && (text.includes('how') || text.includes('where'))) {
        score += 1;
      }
      if (category === 'safe' && text.includes('cape town')) {
        score += 2;
      }
      if (category === 'water' && (text.includes('safe') || text.includes('drink'))) {
        score += 2;
      }
      
      // Multi-keyword bonus
      if (keywordCount > 1) {
        score += keywordCount * 0.5;
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    }
    
  // Minimum threshold for confident responses
  if (bestScore < 2) {
    // Check for conversational patterns that should get fallback
    const conversationalPatterns = [
      /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
      /help.*plan|planning.*trip|trip.*plan/i,
      /tell.*about|information.*about|details.*about/i,
      /what.*offer|what.*do|what.*can/i,
      /first.*time|visiting.*first/i,
      /we.*are.*family|my.*kids.*are|planning.*honeymoon|coming.*from|traveling.*with|solo.*female|group.*of.*friends|business.*trip|celebrating.*anniversary|educational.*trip|photography.*enthusiast/i,
      /skydiving|disneyland|buy.*house|job.*opportunit|university.*application|medical.*service|hotel.*recommend|restaurant.*review|shopping.*mall|nightlife.*option|banking.*service|internet.*connectivity|cell.*phone.*plan/i
    ];
    
    for (const pattern of conversationalPatterns) {
      if (pattern.test(text)) {
        return t.replies.fallback;
      }
    }
    
    return t.replies.fallback;
  }    return t.replies[bestCategory] || t.replies.fallback;
  }

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
      {/* Floating label above the button, animated */}
  {!open && showLabel && (
        <div className="chatbot-label-anim" style={{
          position: 'absolute',
          bottom: 70,
          right: 0,
          background: 'white',
          color: '#222',
          borderRadius: 16,
                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                    padding: '8px 18px',
                    fontWeight: 600,
                    fontSize: 16,
                    marginBottom: 8,
                    letterSpacing: 0.1,
                    border: '1px solid #e5e5e5',
                    opacity: 1,
                    transform: 'translateY(0)'
                  }}>
                    {t.label}
                  </div>
                )}
            {open ? (
              <div style={{
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                width: '95vw',
                maxWidth: 360,
                height: 600,
                minHeight: 600,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #f8fafc 0%, #e6c97a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Chatbox Title */}
                <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: 20,
                  letterSpacing: 1,
                  color: '#bfa046',
                  padding: '18px 12px 6px 18px',
                  fontFamily: 'Share Tech Mono, Fira Mono, monospace',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  background: 'white',
                  borderBottom: '1px solid #eee',
                  userSelect: 'none',
                }}>
                  <span style={{flex: 1, textAlign: 'left'}}>GOTRAVELBOT</span>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      background: '#bfa046',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 12px',
                      marginLeft: 12,
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}
                  >
                    {t.close}
                  </button>
                </div>
                <div
                  style={{
                    flex: 1,
                    overflowY: 'scroll',
                    padding: 24,
                    paddingBottom: 0,
                    minHeight: 0,
                  }}
                  className="custom-chat-scroll"
                >
            <style>{`
              .custom-chat-scroll::-webkit-scrollbar {
                width: 12px;
                background: #fffbe6;
                border-radius: 8px;
              }
              .custom-chat-scroll::-webkit-scrollbar-thumb {
                background: #bfa046;
                border-radius: 8px;
                border: 2px solid #fffbe6;
              }
              .custom-chat-scroll {
                scrollbar-width: auto;
                scrollbar-color: #bfa046 #fffbe6;
              }
            `}</style>
                  {messages.map((msg, i) => (
                    <ChatMessage key={i} message={msg.text} isBot={msg.isBot} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div style={{ display: 'flex', padding: 16, borderTop: '1px solid #eee', background: '#faf9f6', marginTop: 'auto' }}>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={t.placeholder}
                    style={{ flex: 1, border: '1px solid #ccc', borderRadius: 8, padding: '8px 12px', fontSize: 15, marginRight: 8 }}
                  />
                  <button onClick={handleSend} style={{ background: '#bfa046', color: 'white', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 'bold', fontSize: 15, cursor: 'pointer' }}>{t.send}</button>
                </div>
                {/* Bot Disclaimer */}
                <div style={{ 
                  padding: '8px 16px', 
                  fontSize: '11px', 
                  color: '#888', 
                  textAlign: 'center', 
                  borderTop: '1px solid #f0f0f0',
                  backgroundColor: '#fafafa',
                  borderRadius: '0 0 12px 12px'
                }}>
                  {t.disclaimer}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setOpen(true)}
                style={{
                  background: '#fff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 56,
                  height: 56,
                  boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)',
                  fontSize: 28,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  animation: 'chatbot-bounce 1.6s infinite',
                  overflow: 'visible',
                }}
                aria-label="Open chatbot"
              >
                <img src={BOT_AVATAR} alt="Chatbot" style={{ width: 72, height: 72, minWidth: 72, minHeight: 72, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
              </button>
            )}
            <style>{`
              @keyframes chatbot-bounce {
                0%, 100% { transform: translateY(0); }
                20% { transform: translateY(-10px); }
                40% { transform: translateY(0); }
                60% { transform: translateY(-6px); }
                80% { transform: translateY(0); }
              }
              .chatbot-label-anim {
                opacity: 0;
                transform: translateY(40px);
                animation: chatbotLabelBounceIn 1.2s cubic-bezier(.68,-0.55,.27,1.55) 0.1s forwards;
              }
              @keyframes chatbotLabelBounceIn {
                0% {
                  opacity: 0;
                  transform: translateY(40px) scale(0.8);
                }
                60% {
                  opacity: 1;
                  transform: translateY(-10px) scale(1.05);
                }
                80% {
                  transform: translateY(4px) scale(0.98);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>
          </div>
        );
}
