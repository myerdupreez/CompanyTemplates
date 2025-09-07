import React, { useState, useRef, useEffect } from 'react';

const BOT_AVATAR = '/logo.png'; // Using the company logo

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
          alt="WebStrat Bot"
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
        background: isBot ? '#f3f4f6' : '#1e40af',
        color: isBot ? '#374151' : 'white',
        borderRadius: 16,
        padding: '10px 16px',
        maxWidth: 320,
        fontSize: 15,
        lineHeight: 1.4,
        boxShadow: isBot ? '0 1px 4px 0 rgba(0,0,0,0.06)' : '0 2px 8px 0 rgba(30,64,175,0.10)',
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        borderBottomLeftRadius: isBot ? 4 : 16,
        borderBottomRightRadius: isBot ? 16 : 4,
        whiteSpace: 'pre-line'
      }}>
        {message}
      </div>
    </div>
  );
}

const webStratResponses = {
  welcome: 'Hi! I\'m the WebStrat AI Assistant. I\'m here to help with your software development and business technology needs. How can I assist you today?',
  placeholder: 'Ask about our services, pricing, or technology solutions...',
  label: 'Need tech help?',
  close: 'Close',
  send: 'Send',
  disclaimer: 'WebStrat AI Assistant is helpful but not perfect - for detailed quotes and project planning, please contact us directly.',
  
  replies: {
    // Core Services
    services: 'We offer comprehensive software solutions:\n\n• Custom Web Development (React, Next.js, Vue)\n• AI-Powered Customer Support Systems\n• Mobile App Development\n• E-commerce Solutions\n• Business Growth Consulting\n• Digital Transformation\n• UI/UX Design\n• Software Integration\n• API Development & Integration\n• Database Design & Optimization\n\nWhich service interests you most?',
    
    web: 'We specialize in modern web development using cutting-edge technologies:\n\n• React, Next.js, Vue.js frameworks\n• Responsive design for all devices\n• SEO optimization & performance\n• Progressive Web Apps (PWAs)\n• Server-side rendering (SSR)\n• Modern UI/UX design\n• CMS integration (Strapi, Sanity)\n• Headless architecture\n• API-first development\n\nWe build websites that drive business growth.',
    
    ai: 'Our AI-powered solutions include:\n\n• Intelligent customer support chatbots\n• Automated response systems\n• Business process automation\n• Custom AI integrations\n• Machine learning solutions\n• Natural language processing\n• Predictive analytics\n• AI-powered recommendations\n• Document processing automation\n\nThese systems improve efficiency and customer satisfaction.',
    
    mobile: 'We develop high-quality mobile applications:\n\n• Native iOS and Android apps\n• Cross-platform solutions (React Native, Flutter)\n• Progressive Web Apps (PWAs)\n• App Store optimization\n• Backend integration & APIs\n• Push notifications\n• Offline functionality\n• Performance optimization\n• App analytics integration\n\nYour app will work seamlessly across all devices.',
    
    ecommerce: 'Complete e-commerce solutions:\n\n• Custom online stores\n• Payment gateway integration (PayFast, Stripe, PayPal)\n• Inventory management systems\n• Order processing & fulfillment\n• Multi-platform selling\n• Analytics & reporting dashboards\n• Customer management (CRM)\n• Marketing automation\n• Multi-currency support\n• B2B & B2C solutions\n\nWe help you sell more online and grow your business.',
    
    // Pricing & Business
    pricing: 'Our pricing is transparent and project-based:\n\n💰 WEBSITE PACKAGES:\n• Basic Website: R15,000 - R30,000\n• Business Website: R30,000 - R60,000\n• E-commerce Store: R50,000 - R120,000\n• Custom Web App: R80,000 - R250,000+\n\n📱 MOBILE APPS:\n• Simple App: R60,000 - R120,000\n• Advanced App: R120,000 - R300,000+\n\n🤖 AI SOLUTIONS:\n• Chatbot Integration: R25,000 - R80,000\n• Custom AI System: R100,000+\n\nContact us at +27 82 387 4406 for a detailed quote!',
    
    payment: 'We offer flexible payment options:\n\n• 50% deposit to start project\n• 50% on completion\n• Monthly payment plans available\n• Milestone-based payments for large projects\n• All major payment methods accepted\n• Secure online invoicing\n\nWe make it easy to work with us financially.',
    
    timeline: 'Realistic project timelines:\n\n⏰ WEBSITES:\n• Landing Page: 1-2 weeks\n• Business Website: 2-4 weeks\n• E-commerce Store: 4-8 weeks\n• Custom Web App: 6-12 weeks\n\n📱 MOBILE APPS:\n• Simple App: 8-12 weeks\n• Complex App: 12-20 weeks\n\n🤖 AI SOLUTIONS:\n• Basic Chatbot: 2-3 weeks\n• Advanced AI System: 6-16 weeks\n\nWe provide accurate timelines after understanding your requirements.',
    
    // Technology Deep Dive
    tech: 'We work with modern, proven technologies:\n\n🌐 FRONTEND:\n• React, Next.js, Vue.js, Nuxt.js\n• TypeScript, JavaScript ES6+\n• Tailwind CSS, Material-UI, Chakra UI\n• Responsive & Mobile-First Design\n\n⚙️ BACKEND:\n• Node.js, Express.js, Fastify\n• Python (Django, FastAPI)\n• PHP (Laravel, Symfony)\n• REST APIs & GraphQL\n\n🗄️ DATABASES:\n• PostgreSQL, MySQL, MongoDB\n• Redis for caching\n• Prisma, Mongoose ODM\n\n☁️ CLOUD & HOSTING:\n• AWS, Google Cloud, Azure\n• Netlify, Vercel, Railway\n• Docker containerization\n• CI/CD pipelines\n\nWe choose the best tech stack for your project.',
    
    frontend: 'Our frontend expertise includes:\n\n• React.js with hooks & context\n• Next.js for SSR/SSG\n• Vue.js & Nuxt.js\n• TypeScript for type safety\n• State management (Redux, Zustand)\n• Modern CSS (Tailwind, Styled Components)\n• Progressive Web Apps (PWAs)\n• Component libraries & design systems\n• Performance optimization\n• Accessibility (WCAG compliance)\n\nWe create beautiful, fast, and user-friendly interfaces.',
    
    backend: 'Backend development services:\n\n• RESTful API design & development\n• GraphQL APIs\n• Microservices architecture\n• Database design & optimization\n• Authentication & authorization\n• File storage & CDN integration\n• Third-party API integrations\n• Background job processing\n• Performance monitoring\n• Security best practices\n\nRobust, scalable backend solutions.',
    
    database: 'Database solutions we provide:\n\n• PostgreSQL for complex queries\n• MongoDB for flexible schemas\n• MySQL for traditional apps\n• Redis for caching & sessions\n• Database design & normalization\n• Performance optimization\n• Backup & recovery strategies\n• Data migration services\n• Analytics & reporting\n• Real-time data processing\n\nYour data is safe and accessible.',
    
    // Specialized Services
    seo: 'SEO & Performance optimization:\n\n• Technical SEO audits\n• Page speed optimization\n• Core Web Vitals improvement\n• Meta tags & structured data\n• Sitemap & robots.txt setup\n• Google Analytics integration\n• Search Console setup\n• Local SEO optimization\n• Content optimization guidance\n• Performance monitoring\n\nGet found online and rank higher.',
    
    security: 'Security measures we implement:\n\n• SSL certificates & HTTPS\n• Input validation & sanitization\n• SQL injection prevention\n• XSS protection\n• CSRF protection\n• Rate limiting\n• Secure authentication\n• Data encryption\n• Regular security audits\n• Compliance with data protection laws\n\nYour website and data are secure.',
    
    cms: 'Content Management Solutions:\n\n• WordPress custom development\n• Headless CMS (Strapi, Sanity)\n• Custom admin panels\n• User-friendly editing interfaces\n• Multi-user permissions\n• Content scheduling\n• Media management\n• SEO-friendly content structure\n• Multi-language support\n• Easy content updates\n\nManage your content with ease.',
    
    integration: 'Third-party integrations we handle:\n\n• Payment gateways (PayFast, Stripe)\n• CRM systems (HubSpot, Salesforce)\n• Email marketing (Mailchimp, SendGrid)\n• Social media APIs\n• Accounting software (Xero, QuickBooks)\n• Shipping providers\n• Analytics tools\n• Communication platforms\n• Inventory management\n• Custom API development\n\nConnect all your business tools.',
    
    // Support & Maintenance
    support: 'Comprehensive support services:\n\n• 24/7 website monitoring\n• Regular security updates\n• Performance optimization\n• Bug fixes & troubleshooting\n• Content updates\n• Feature enhancements\n• Backup management\n• Uptime monitoring\n• Technical support\n• Emergency response\n\nWe keep your systems running smoothly.',
    
    maintenance: 'Website maintenance packages:\n\n🔧 BASIC PLAN (R2,000/month):\n• Security updates\n• Backup management\n• Basic support\n\n⚡ STANDARD PLAN (R4,000/month):\n• Everything in Basic\n• Content updates\n• Performance monitoring\n• Priority support\n\n🚀 PREMIUM PLAN (R8,000/month):\n• Everything in Standard\n• Feature development\n• Advanced analytics\n• 24/7 monitoring\n\nChoose the plan that fits your needs.',
    
    hosting: 'Hosting solutions we recommend:\n\n• Cloud hosting (AWS, Google Cloud)\n• Managed WordPress hosting\n• CDN setup (Cloudflare)\n• SSL certificates included\n• Automatic backups\n• 99.9% uptime guarantee\n• Global server locations\n• DDoS protection\n• Performance optimization\n• 24/7 monitoring\n\nFast, secure, and reliable hosting.',
    
    // Business & Consultation
    consultation: 'Free consultation includes:\n\n• Project requirements analysis\n• Technology recommendations\n• Architecture planning\n• Cost estimation\n• Timeline discussion\n• Risk assessment\n• Strategy development\n• ROI projections\n• Competitive analysis\n• Implementation roadmap\n\nBook your free 30-minute consultation today!',
    
    strategy: 'Digital strategy services:\n\n• Digital transformation planning\n• Technology roadmap development\n• Business process analysis\n• Competitive research\n• User experience strategy\n• Growth hacking techniques\n• Conversion optimization\n• Analytics implementation\n• KPI tracking setup\n• Long-term planning\n\nAlign technology with your business goals.',
    
    training: 'Training services we offer:\n\n• Website management training\n• CMS usage tutorials\n• SEO best practices\n• Social media integration\n• Analytics interpretation\n• Content creation guidance\n• Digital marketing basics\n• E-commerce management\n• Security awareness\n• Custom training programs\n\nEmpower your team with knowledge.',
    
    // Industries & Specializations
    industries: 'Industries we serve:\n\n• Professional Services\n• E-commerce & Retail\n• Healthcare & Medical\n• Education & Training\n• Real Estate\n• Hospitality & Tourism\n• Manufacturing\n• Non-profit Organizations\n• Financial Services\n• Technology Startups\n\nWe understand your industry\'s unique needs.',
    
    startup: 'Startup-friendly solutions:\n\n• MVP development\n• Scalable architecture\n• Cost-effective solutions\n• Rapid prototyping\n• Lean development approach\n• Growth-focused features\n• Investor-ready presentations\n• Technical due diligence\n• Startup mentoring\n• Flexible payment terms\n\nHelping startups succeed with technology.',
    
    enterprise: 'Enterprise solutions:\n\n• Large-scale system architecture\n• Legacy system modernization\n• Enterprise integrations\n• Compliance & security\n• Scalability planning\n• Team augmentation\n• Technical leadership\n• Code review & auditing\n• Performance optimization\n• 24/7 enterprise support\n\nEnterprise-grade solutions.',
    
    // Location & Remote Work
    location: 'We\'re based in South Africa but serve clients globally:\n\n🌍 LOCATIONS:\n• Western Cape (Cape Town)\n• Gauteng (Johannesburg)\n• Remote collaboration worldwide\n\n💼 REMOTE SERVICES:\n• Video conferencing (Zoom, Teams)\n• Project management tools\n• Regular progress updates\n• Flexible timezone support\n• Cultural sensitivity\n• Clear communication\n\nDistance is no barrier to great results.',
    
    remote: 'Our remote work process:\n\n• Daily standups & progress updates\n• Screen sharing & collaboration\n• Cloud-based development\n• Version control (Git)\n• Project management tools\n• Time tracking & reporting\n• Regular video calls\n• Shared documentation\n• Agile methodology\n• Transparent communication\n\nSeamless remote collaboration.',
    
    // Process & Methodology
    process: 'Our proven development process:\n\n1️⃣ DISCOVERY & PLANNING\n• Requirements gathering\n• User research\n• Technical analysis\n• Project planning\n\n2️⃣ DESIGN & PROTOTYPING\n• UI/UX design\n• Wireframing\n• Prototyping\n• Client approval\n\n3️⃣ DEVELOPMENT\n• Agile sprints\n• Regular testing\n• Code reviews\n• Progress updates\n\n4️⃣ TESTING & LAUNCH\n• Quality assurance\n• User testing\n• Deployment\n• Post-launch support\n\nWe keep you involved throughout.',
    
    methodology: 'Development methodologies we use:\n\n• Agile/Scrum development\n• Test-driven development (TDD)\n• Continuous integration/deployment\n• Code review processes\n• Version control (Git)\n• Documentation standards\n• Quality assurance\n• Performance testing\n• Security testing\n• User acceptance testing\n\nBest practices for quality results.',
    
    testing: 'Quality assurance process:\n\n• Automated testing suites\n• Manual testing procedures\n• Cross-browser testing\n• Mobile responsiveness testing\n• Performance testing\n• Security vulnerability scanning\n• User acceptance testing\n• Load testing\n• Accessibility testing\n• Code quality reviews\n\nEnsuring everything works perfectly.',
    
    // Contact & Getting Started
    contact: 'Multiple ways to reach us:\n\n📞 PHONE: +27 82 387 4406\n📧 EMAIL: jacques@webstratit.co.za\n🌐 WEBSITE: Contact form on this site\n💬 WHATSAPP: Business inquiries welcome\n📅 CALENDLY: Schedule a meeting\n🏢 OFFICE: Available for local meetings\n\n⏰ RESPONSE TIME: Within 24 hours\n🕐 AVAILABILITY: 24/7 for urgent matters\n\nWe\'re here to help!',
    
    start: 'Ready to start your project? Here\'s how:\n\n1️⃣ INITIAL CONTACT\n• Call, email, or use contact form\n• Brief project discussion\n\n2️⃣ FREE CONSULTATION\n• 30-minute strategy session\n• Requirements analysis\n• Technology recommendations\n\n3️⃣ PROPOSAL & QUOTE\n• Detailed project proposal\n• Transparent pricing\n• Timeline estimation\n\n4️⃣ PROJECT KICKOFF\n• Contract signing\n• Deposit payment\n• Development begins\n\nLet\'s transform your business with technology!',
    
    meeting: 'Schedule a meeting with us:\n\n• Free 30-minute consultation\n• Project discussion\n• Technology recommendations\n• Q&A session\n• No obligation\n• Available via video call\n• Flexible scheduling\n• Same-day availability often possible\n\nReady to discuss your project?',
    
    // Portfolio & Experience
    portfolio: 'Our successful projects include:\n\n🌐 WEBSITES:\n• Corporate websites & portfolios\n• E-commerce platforms\n• SaaS applications\n• Non-profit websites\n\n📱 MOBILE APPS:\n• Business productivity apps\n• E-commerce mobile apps\n• Social networking platforms\n• Utility applications\n\n🤖 AI SOLUTIONS:\n• Customer service chatbots\n• Business automation systems\n• Data analysis platforms\n\nContact us to see examples relevant to your industry.',
    
    experience: 'Our team\'s experience:\n\n• 5+ years in web development\n• 100+ successful projects\n• Diverse industry experience\n• Modern technology expertise\n• Agile methodology certified\n• Continuous learning culture\n• Client satisfaction focused\n• Problem-solving specialists\n• Innovation-driven approach\n• Quality-first mindset\n\nExperience you can trust.',
    
    testimonials: 'What our clients say:\n\n"WebStrat delivered exactly what we needed, on time and within budget. Their communication was excellent throughout the project." - Local Business Owner\n\n"The AI chatbot they built has transformed our customer service. Highly recommended!" - E-commerce Client\n\n"Professional, knowledgeable, and great to work with." - Startup Founder\n\nWe pride ourselves on client satisfaction.',
    
    // General Help
    help: 'I can assist you with:\n\n• Service information & pricing\n• Technology recommendations\n• Project planning & timelines\n• Getting started process\n• Technical questions\n• Portfolio examples\n• Scheduling consultations\n• Business strategy\n• Digital transformation\n• Any other questions\n\nWhat specific help do you need?',
    
    thanks: 'Thank you for your interest in WebStrat!\n\n• We appreciate you considering us\n• Your business success is our priority\n• We\'re committed to excellence\n• Quality results guaranteed\n• Transparent communication always\n• Long-term partnership focused\n\nHow else can I help you today?',
    
    goodbye: 'Thanks for chatting with WebStrat!\n\n• Remember: Free consultation available\n• Contact us anytime at +27 82 387 4406\n• Email: jacques@webstratit.co.za\n• We respond within 24 hours\n• Your success is our mission\n\nLooking forward to working with you!',
    
    fallback: 'I can help with information about:\n\n🔧 SERVICES:\n• Web development & design\n• Mobile app development\n• AI solutions & chatbots\n• E-commerce platforms\n• Digital transformation\n\n💰 BUSINESS:\n• Pricing & packages\n• Project timelines\n• Free consultations\n• Getting started\n\n🛠️ TECHNICAL:\n• Technologies we use\n• Hosting & maintenance\n• Security & performance\n• Integrations & APIs\n\nWhat would you like to know more about?'
  }
};

export default function WebStratChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: webStratResponses.welcome, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [showLabel, setShowLabel] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Show label after 5 seconds if chat is closed
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
    const text = userMsg.toLowerCase().trim();
    
    // Intent patterns for WebStrat services
    const intentPatterns = [
      // Core Services
      { pattern: /what.*service|service.*offer|what.*do.*you.*do|solutions/i, category: 'services' },
      { pattern: /web.*development|website.*develop|build.*website|web.*design/i, category: 'web' },
      { pattern: /ai.*support|chatbot|artificial.*intelligence|automation|machine.*learning/i, category: 'ai' },
      { pattern: /mobile.*app|app.*development|ios.*android|react.*native/i, category: 'mobile' },
      { pattern: /ecommerce|e-commerce|online.*store|shop.*online|selling.*online/i, category: 'ecommerce' },
      
      // Pricing and Business
      { pattern: /how.*much.*cost|price|pricing|budget|quote|expensive|cheap|afford/i, category: 'pricing' },
      { pattern: /payment.*plan|payment.*option|how.*pay|payment.*method/i, category: 'payment' },
      { pattern: /how.*long|timeline|time.*take|duration|when.*ready|how.*fast/i, category: 'timeline' },
      
      // Technology Deep Dive
      { pattern: /technology|tech.*stack|framework|language|database|cloud/i, category: 'tech' },
      { pattern: /frontend|front.*end|react|vue|angular|javascript|typescript/i, category: 'frontend' },
      { pattern: /backend|back.*end|api|server|node|python|php/i, category: 'backend' },
      { pattern: /database|sql|nosql|mongodb|postgresql|mysql/i, category: 'database' },
      
      // Specialized Services
      { pattern: /seo|search.*optimization|google|ranking|performance/i, category: 'seo' },
      { pattern: /security|secure|ssl|https|protection|vulnerability/i, category: 'security' },
      { pattern: /cms|content.*management|wordpress|admin.*panel/i, category: 'cms' },
      { pattern: /integration|third.*party|api.*integration|connect.*system/i, category: 'integration' },
      
      // Support and Maintenance
      { pattern: /support|maintenance|after.*launch|ongoing|help.*after/i, category: 'support' },
      { pattern: /maintenance.*plan|maintenance.*package|monthly.*support/i, category: 'maintenance' },
      { pattern: /hosting|server|domain|uptime|cloud.*hosting/i, category: 'hosting' },
      
      // Business and Consultation
      { pattern: /consultation|consult|meeting|discuss|talk|advice/i, category: 'consultation' },
      { pattern: /strategy|digital.*transformation|business.*strategy|planning/i, category: 'strategy' },
      { pattern: /training|learn|teach|how.*to.*use|tutorial/i, category: 'training' },
      
      // Industries and Specializations
      { pattern: /industry|sector|business.*type|work.*with/i, category: 'industries' },
      { pattern: /startup|mvp|minimum.*viable|early.*stage|entrepreneur/i, category: 'startup' },
      { pattern: /enterprise|large.*company|corporation|big.*business/i, category: 'enterprise' },
      
      // Location and Remote
      { pattern: /location|where.*located|office|based|local/i, category: 'location' },
      { pattern: /remote|work.*remotely|online.*collaboration|virtual/i, category: 'remote' },
      
      // Process and Methodology
      { pattern: /process|how.*work|methodology|approach|steps/i, category: 'process' },
      { pattern: /agile|scrum|methodology|development.*process/i, category: 'methodology' },
      { pattern: /testing|quality.*assurance|qa|test.*website/i, category: 'testing' },
      
      // Contact and Getting Started
      { pattern: /contact|phone|email|reach.*you|get.*in.*touch/i, category: 'contact' },
      { pattern: /get.*started|start.*project|begin|ready.*to.*start/i, category: 'start' },
      { pattern: /meeting|schedule|appointment|call|video.*call/i, category: 'meeting' },
      
      // Portfolio and Experience
      { pattern: /portfolio|example|work.*done|previous.*project|show.*me/i, category: 'portfolio' },
      { pattern: /experience|years.*experience|team.*experience|expertise/i, category: 'experience' },
      { pattern: /testimonial|review|client.*feedback|what.*clients.*say/i, category: 'testimonials' },
      
      // Greetings and General
      { pattern: /hello|hi|hey|good.*morning|good.*afternoon|greetings/i, category: 'welcome' },
      { pattern: /help|assistance|support.*me|can.*you.*help/i, category: 'help' },
      { pattern: /thank|thanks|appreciate|grateful/i, category: 'thanks' },
      { pattern: /bye|goodbye|see.*you|farewell|chat.*later/i, category: 'goodbye' }
    ];

    // Check intent patterns first
    for (const { pattern, category } of intentPatterns) {
      if (pattern.test(text)) {
        return webStratResponses.replies[category] || webStratResponses.replies.fallback;
      }
    }

    // Enhanced keyword matching as fallback
    const keywordCategories = {
      // Core Services
      services: ['service', 'services', 'offer', 'solutions', 'what do you do', 'capabilities'],
      web: ['website', 'web', 'frontend', 'react', 'nextjs', 'vue', 'design'],
      ai: ['ai', 'artificial intelligence', 'chatbot', 'automation', 'machine learning', 'smart'],
      mobile: ['mobile', 'app', 'ios', 'android', 'react native', 'flutter', 'application'],
      ecommerce: ['ecommerce', 'e-commerce', 'store', 'shop', 'sell online', 'selling'],
      
      // Pricing and Business
      pricing: ['price', 'cost', 'budget', 'quote', 'expensive', 'cheap', 'affordable', 'money'],
      payment: ['payment', 'pay', 'billing', 'invoice', 'deposit', 'installments'],
      timeline: ['timeline', 'time', 'duration', 'how long', 'when', 'delivery', 'deadline'],
      
      // Technology
      tech: ['technology', 'tech', 'framework', 'database', 'cloud', 'tools'],
      frontend: ['frontend', 'front-end', 'ui', 'user interface', 'client-side'],
      backend: ['backend', 'back-end', 'server', 'api', 'database'],
      database: ['database', 'data storage', 'sql', 'nosql', 'mongodb'],
      
      // Specialized Services
      seo: ['seo', 'search optimization', 'google', 'ranking', 'visibility'],
      security: ['security', 'secure', 'ssl', 'protection', 'safe'],
      cms: ['cms', 'content management', 'wordpress', 'admin'],
      integration: ['integration', 'connect', 'third party', 'api'],
      
      // Support
      support: ['support', 'maintenance', 'help', 'ongoing', 'after launch'],
      maintenance: ['maintenance plan', 'monthly support', 'updates'],
      hosting: ['hosting', 'server', 'domain', 'uptime'],
      
      // Business
      consultation: ['consultation', 'meeting', 'discuss', 'advice', 'consult'],
      strategy: ['strategy', 'planning', 'digital transformation'],
      training: ['training', 'learn', 'teach', 'tutorial'],
      
      // Specializations
      industries: ['industry', 'sector', 'business type'],
      startup: ['startup', 'mvp', 'entrepreneur', 'early stage'],
      enterprise: ['enterprise', 'large company', 'corporation'],
      
      // Location
      location: ['location', 'where', 'office', 'based', 'local'],
      remote: ['remote', 'online', 'virtual', 'distance'],
      
      // Process
      process: ['process', 'methodology', 'approach', 'how you work'],
      methodology: ['agile', 'scrum', 'development process'],
      testing: ['testing', 'quality', 'qa', 'test'],
      
      // Contact
      contact: ['contact', 'phone', 'email', 'reach'],
      start: ['start', 'begin', 'get started', 'ready'],
      meeting: ['meeting', 'schedule', 'appointment', 'call'],
      
      // Portfolio
      portfolio: ['portfolio', 'examples', 'work', 'projects', 'showcase'],
      experience: ['experience', 'expertise', 'years', 'team'],
      testimonials: ['testimonials', 'reviews', 'feedback', 'clients say'],
      
      // General
      help: ['help', 'assistance', 'support me'],
      thanks: ['thank', 'thanks', 'appreciate'],
      goodbye: ['bye', 'goodbye', 'see you', 'farewell']
    };

    let bestMatch = 'fallback';
    let maxMatches = 0;

    for (const [category, keywords] of Object.entries(keywordCategories)) {
      const matches = keywords.filter(keyword => text.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = category;
      }
    }

    return webStratResponses.replies[bestMatch] || webStratResponses.replies.fallback;
  }

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
      {/* Floating label */}
      {!open && showLabel && (
        <div className="chatbot-label-anim" style={{
          position: 'absolute',
          bottom: 70,
          right: 0,
          background: 'white',
          color: '#374151',
          borderRadius: 16,
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
          padding: '8px 18px',
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 8,
          letterSpacing: 0.1,
          border: '1px solid #e5e7eb',
          opacity: 1,
          transform: 'translateY(0)'
        }}>
          {webStratResponses.label}
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
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: 0.5,
            color: '#1e40af',
            padding: '18px 12px 6px 18px',
            fontFamily: 'system-ui, sans-serif',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            userSelect: 'none',
          }}>
            <span style={{flex: 1, textAlign: 'left'}}>WebStrat Assistant</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: '#1e40af',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                marginLeft: 12,
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              {webStratResponses.close}
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 24,
              paddingBottom: 0,
              minHeight: 0,
            }}
            className="custom-chat-scroll"
          >
            <style>{`
              .custom-chat-scroll::-webkit-scrollbar {
                width: 12px;
                background: #f1f5f9;
                border-radius: 8px;
              }
              .custom-chat-scroll::-webkit-scrollbar-thumb {
                background: #1e40af;
                border-radius: 8px;
                border: 2px solid #f1f5f9;
              }
              .custom-chat-scroll {
                scrollbar-width: auto;
                scrollbar-color: #1e40af #f1f5f9;
              }
            `}</style>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg.text} isBot={msg.isBot} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ 
            display: 'flex', 
            padding: 16, 
            borderTop: '1px solid #e5e7eb', 
            background: '#fafafa', 
            marginTop: 'auto' 
          }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={webStratResponses.placeholder}
              style={{ 
                flex: 1, 
                border: '1px solid #d1d5db', 
                borderRadius: 8, 
                padding: '8px 12px', 
                fontSize: 15, 
                marginRight: 8,
                outline: 'none',
                ':focus': { borderColor: '#1e40af' }
              }}
            />
            <button 
              onClick={handleSend} 
              style={{ 
                background: '#1e40af', 
                color: 'white', 
                border: 'none', 
                borderRadius: 8, 
                padding: '8px 18px', 
                fontWeight: 'bold', 
                fontSize: 15, 
                cursor: 'pointer' 
              }}
            >
              {webStratResponses.send}
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ 
            padding: '8px 16px', 
            fontSize: '11px', 
            color: '#6b7280', 
            textAlign: 'center', 
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
            borderRadius: '0 0 12px 12px'
          }}>
            {webStratResponses.disclaimer}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: '#1e40af',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            boxShadow: '0 4px 16px 0 rgba(30, 64, 175, 0.3)',
            fontSize: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            animation: 'chatbot-bounce 1.6s infinite',
            overflow: 'visible',
          }}
          aria-label="Open WebStrat chatbot"
        >
          <img 
            src={BOT_AVATAR} 
            alt="WebStrat Bot" 
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              objectFit: 'contain'
            }} 
          />
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
