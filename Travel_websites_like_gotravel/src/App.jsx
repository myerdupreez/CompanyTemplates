// App.jsx - Main application component for GoTravelCapeTown
import React, { useState } from 'react';
import ClimateChart from './ClimateChart';
import CustomChatbotWidget from './CustomChatbotWidget';

// Collage images for each benefit
const benefitImages = {
  bilingual: [
    //'/images/tour_guide.avif',
    '/images/fun_car_photo.avif',
    '/images/city_and_cultural_tours.avif',
    '/images/photography_expeditions.avif',
  ],
  personalized: [
    '/images/personalised_tours_1.webp',
    '/images/personalised_tours_2.webp',
    '/images/personalised_tours_3.webp',
    '/images/personalised_tours_4.webp',
    '/images/personalised_tours_5.webp',
    '/images/personalised_tours_6.webp',
    '/images/personalised_tours_7.webp',
    '/images/personalised_tours_8.webp',
    '/images/personalised_tours_9.webp',
  ],
  transport: [
    //'/images/transportation.avif',
    '/images/fun_car_photo.avif',
    '/images/safari_tours.avif',
    //'/images/wineland_tours.avif',
  ],
  experience: [
    '/images/70+ tours completed.avif',
    '/images/beach_horseback_riding.avif',
    '/images/culinary_tours.avif',
    '/images/photography_expeditions.avif',
  ],
  quality: [
    //'/images/quality.avif',
    //'/images/wineland_tours.avif',
    '/images/city_and_cultural_tours.avif',
    '/images/safari_tours.avif',
  ],
  local: [
    //'/images/local_expertise.avif',
    '/images/culinary_tours.avif',
    '/images/wineland_tours.avif',
    '/images/beach_horseback_riding.avif',
  ],
};

// Comprehensive translation object for all user-facing text
const translations = {
  EN: {
    climateChartTitle: 'Cape Town Climate: Average Monthly Temperature & Rainfall',
    climateMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    climateTempLabel: 'Temperature (°C)',
    climateRainLabel: 'Rainfall (mm)',
    climateLegendTemp: 'Temperature (°C)',
    climateLegendRain: 'Rainfall (mm)',
  nav: ['Why Us', 'Tours', 'Useful Info'],
    heroTitle: 'Unforgettable tours\nof Cape Town in Russian\nand English',
    heroDesc: 'Experience Cape Town with a private, bilingual guide. Tailored, luxury tours for the discerning traveler.',
    heroBtn: 'Start Your Journey',
    introTitle: 'Are you ready?',
    introDesc1: 'to embark on an exhilarating journey',
    introDesc2: `through the world's most beautiful and diverse city?`,
    introDesc3: 'Leave the hustle and bustle of everyday life behind as our expert tour guides make you fall in love with Cape Town.',
    collageTitle: 'Why choose us as your Tour Guide?',
    collage: [
      {
        title: 'Bilingual tour guide',
        desc: 'Fluent in English and Russian for a seamless experience.'
      },
      {
        title: 'Personalized tours',
        desc: 'Tailored experiences based on your unique interests and preferences.'
      },
      {
        title: 'Stress free Transportation',
        desc: 'Forget rentals—airport pickups and all tour transport handled for you.'
      },
      {
        title: '70+ completed tours',
        desc: `From expert guidance to a stress-free experience, we're here to ensure your trip is unforgettable.`
      },
      {
        title: 'Commitment to quality',
        desc: 'We pride ourselves on delivering the highest standards in every detail.'
      },
      {
        title: 'Local expertise',
        desc: 'Discover the best restaurants & hidden gems known only to locals.'
      },
    ],
    collageModal: {
      bilingual: 'Bilingual tour guide',
      personalized: 'Personalized tours',
      transport: 'Stress free Transportation',
      experience: '70+ completed tours',
      quality: 'Commitment to quality',
      local: 'Local expertise',
    },
    collageModalDesc: {
      bilingual: 'Fluent in English and Russian for a seamless experience.',
      personalized: 'Tailored experiences based on your unique interests and preferences.',
      transport: 'Forget rentals—airport pickups and all tour transport handled for you.',
      experience: `From expert guidance to a stress-free experience, we're here to ensure your trip is unforgettable.`,
      quality: 'We pride ourselves on delivering the highest standards in every detail.',
      local: 'Discover the best restaurants & hidden gems known only to locals.',
    },
    toursTitle: 'Tours we offer:',
    toursDesc: "We make memories that you'll never stop talking about.",
    tours: [
      {
        img: '/images/city_and_cultural_tours.avif',
        title: 'City & Cultural Tours',
        desc: `Explore Cape Town's rich history and vibrant culture with our city tours.`
      },
      {
        img: '/images/culinary_tours.avif',
        title: 'Culinary Tours',
        desc: 'Explore food that tells a story - of spice routes, coastal harvests, and cultural fusion.'
      },
      {
        img: '/images/safari_tours.avif',
        title: 'Safari Tours',
        desc: 'Experience the wild side of Africa with our unforgettable safari adventures.'
      },
      {
        img: '/images/wineland_tours.avif',
        title: 'Wineland Tours',
        desc: `Sip, savor, and stroll through the Cape's rolling vineyards and historic estates.`
      },
      {
        img: '/images/fun_car_photo.avif',
        title: 'Luxury Experiences',
        desc: 'From fine-dining to private yacht charters, and helicopter tours.'
      },
      {
        img: '/images/photography_expeditions.avif',
        title: 'Photography Expeditions',
        desc: `Capture Cape Town's beauty with expert guidance and breathtaking locations.`
      },
    ],
    usefulInfoTitle: 'Useful Information',
    usefulInfo: [
      {
        title: 'Safety',
        desc: 'Cape Town is generally safe, but always keep an eye on your belongings, especially in busy or tourist areas.'
      },
      {
        title: 'Best Time to Visit',
        desc: 'Cape Town is great year-round. Summer (Nov–Mar) is warm and dry; winter (Jun–Aug) is mild with some rain.'
      },
      {
        title: 'Weather & Packing',
        desc: 'Bring layers, sunscreen, and a hat. Evenings can be cool, and the sun is strong.'
      },
      {
        title: 'Currency & Payments',
        desc: 'The local currency is South African Rand (ZAR). Cards are widely accepted. Tipping 10–15% is customary.'
      },
      {
        title: 'Health & Safety',
        desc: 'Tap water is safe. Emergency number: 112. Be aware of your surroundings and avoid walking alone at night.'
      },
      {
        title: 'Local Etiquette',
        desc: 'Greetings are friendly. English is widely spoken. Respect local customs and wildlife.'
      },
    ],
    contactTitle: 'Make your trip to Cape Town unforgettable.',
    contactName: 'Your Name',
    contactEmail: 'Email Address',
    contactMessage: 'Message',
    contactBtn: 'Book Your Trip',
    footerContact: 'Contact Us',
    footerPhone: '+27 82 775 7357',
    footerEmail: 'info@gotravelcapetown.com',
    footerCopyright: 'Go Travel Cape Town. All rights reserved.'
  },
  RU: {
    climateChartTitle: 'Климат Кейптауна: Среднемесячная температура и осадки',
    climateMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    climateTempLabel: 'Температура (°C)',
    climateRainLabel: 'Осадки (мм)',
    climateLegendTemp: 'Температура (°C)',
    climateLegendRain: 'Осадки (мм)',
    nav: ['Почему мы', 'Туры', 'Полезная информация', 'Вопросы'],
    heroTitle: 'Незабываемые туры\nпо Кейптауну на русском\nи английском',
    heroDesc: 'Откройте Кейптаун с частным, билингвальным гидом. Индивидуальные, роскошные туры для взыскательных путешественников.',
    heroBtn: 'Начать путешествие',
    introTitle: 'Вы готовы?',
    introDesc1: 'отправиться в захватывающее путешествие',
    introDesc2: 'по самому красивому и разнообразному городу мира?',
    introDesc3: 'Оставьте суету повседневной жизни позади — наши гиды помогут вам влюбиться в Кейптаун.',
    collageTitle: 'Почему выбирают нас?',
    collage: [
      {
        title: 'Билингвальный гид',
        desc: 'Свободно говорим на русском и английском для вашего комфорта.'
      },
      {
        title: 'Индивидуальные туры',
        desc: 'Экскурсии, адаптированные под ваши интересы.'
      },
      {
        title: 'Транспорт без забот',
        desc: 'Встреча в аэропорту и все передвижения — без аренды и хлопот.'
      },
      {
        title: '70+ проведённых туров',
        desc: 'От профессионального сопровождения до полного комфорта — мы сделаем ваше путешествие незабываемым.'
      },
      {
        title: 'Гарантия качества',
        desc: 'Высочайшие стандарты во всех деталях.'
      },
      {
        title: 'Местные эксперты',
        desc: 'Лучшие рестораны и скрытые жемчужины, известные только местным.'
      },
    ],
    collageModal: {
      bilingual: 'Билингвальный гид',
      personalized: 'Индивидуальные туры',
      transport: 'Транспорт без забот',
      experience: '70+ проведённых туров',
      quality: 'Гарантия качества',
      local: 'Местные эксперты',
    },
    collageModalDesc: {
      bilingual: 'Свободно говорим на русском и английском для вашего комфорта.',
      personalized: 'Экскурсии, адаптированные под ваши интересы.',
      transport: 'Встреча в аэропорту и все передвижения — без аренды и хлопот.',
      experience: 'От профессионального сопровождения до полного комфорта — мы сделаем ваше путешествие незабываемым.',
      quality: 'Высочайшие стандарты во всех деталях.',
      local: 'Лучшие рестораны и скрытые жемчужины, известные только местным.',
    },
    toursTitle: 'Наши туры:',
    toursDesc: 'Мы создаём воспоминания, о которых вы будете рассказывать снова и снова.',
    tours: [
      {
        img: '/images/city_and_cultural_tours.avif',
        title: 'Городские и культурные туры',
        desc: 'Откройте для себя историю и культуру Кейптауна с нашими экскурсиями.'
      },
      {
        img: '/images/culinary_tours.avif',
        title: 'Гастрономические туры',
        desc: 'Еда, рассказывающая историю — специи, море, культурное разнообразие.'
      },
      {
        img: '/images/safari_tours.avif',
        title: 'Сафари',
        desc: 'Ощутите дикую природу Африки на незабываемом сафари.'
      },
      {
        img: '/images/wineland_tours.avif',
        title: 'Винные туры',
        desc: 'Дегустация вин, прогулки по виноградникам и историческим поместьям.'
      },
      {
        img: '/images/fun_car_photo.avif',
        title: 'Роскошные впечатления',
        desc: 'От fine-dining до яхт и вертолётов — всё для вас.'
      },
      {
        img: '/images/photography_expeditions.avif',
        title: 'Фототуры',
        desc: 'Запечатлейте красоту Кейптауна с профессионалами.'
      },
    ],
    usefulInfoTitle: 'Полезная информация',
    usefulInfo: [
      {
        title: 'Безопасность',
        desc: 'В целом Кейптаун безопасен, но всегда следите за своими вещами, особенно в людных местах.'
      },
      {
        title: 'Лучшее время для визита',
        desc: 'Кейптаун прекрасен круглый год. Лето (ноя–мар) тёплое и сухое, зима (июн–авг) мягкая, возможны дожди.'
      },
      {
        title: 'Погода и сборы',
        desc: 'Берите одежду слоями, солнцезащитный крем и головной убор. Вечерами прохладно, солнце очень активное.'
      },
      {
        title: 'Валюта и оплата',
        desc: 'Местная валюта — южноафриканский ранд (ZAR). Карты принимаются почти везде. Чаевые 10–15% — обычная практика.'
      },
      {
        title: 'Здоровье и безопасность',
        desc: 'Вода из-под крана безопасна. Экстренный номер: 112. Будьте внимательны и избегайте прогулок в одиночку ночью.'
      },
      {
        title: 'Местный этикет',
        desc: 'Приветствия дружелюбные. Английский широко распространён. Уважайте местные традиции и природу.'
      },
    ],
    contactTitle: 'Сделайте свою поездку в Кейптаун незабываемой.',
    contactName: 'Ваше имя',
    contactEmail: 'Электронная почта',
    contactMessage: 'Сообщение',
    contactBtn: 'Забронировать тур',
    footerContact: 'Связаться с нами',
    footerPhone: '+27 82 775 7357',
    footerEmail: 'info@gotravelcapetown.com',
    footerCopyright: 'Go Travel Cape Town. Все права защищены.'
  },
};

const App = () => {

  const [lang, setLang] = useState('EN');
  const t = translations[lang];
  const [expanded, setExpanded] = useState({});

  // Carousel state (for 'Tours we offer')
  const tours = t.tours;
  const getCardsPerView = () => (window.innerWidth < 768 ? 1 : 4);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const [carouselIdx, setCarouselIdx] = useState(0);
  const maxIdx = tours.length - cardsPerView;

  React.useEffect(() => {
    const handleResize = () => {
      const newCards = getCardsPerView();
      setCardsPerView(newCards);
      // Only reset carouselIdx if the new maxIdx is less than current
      if (carouselIdx > tours.length - newCards) {
        setCarouselIdx(0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [carouselIdx, tours.length]);

  // Contact form state and handlers
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  function handleContactChange(e) {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    setFormStatus('Sending...');
    try {
      const res = await fetch('/contact-final.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      if (res.ok) {
        setFormStatus('Message sent!');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setFormStatus('Failed to send. Please try again.');
      }
    } catch (err) {
      setFormStatus('Failed to send. Please try again.');
    }
  }

  const scrollToSection = (id) => {
    // Removed FAQ button logic
    if (id === 'faqs') {
      // FAQ functionality removed
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleCollage = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <header className="w-full py-4 px-6 flex items-center justify-between bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Go Travel Cape Town Logo" className="h-10 w-auto" />
        </div>
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <button className="hover:text-gold transition" onClick={() => scrollToSection('benefits')}>{t.nav[0]}</button>
          <button className="hover:text-gold transition" onClick={() => scrollToSection('tours')}>{t.nav[1]}</button>
          <button className="hover:text-gold transition" onClick={() => scrollToSection('useful-info')}>{t.nav[2]}</button>

        </nav>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1 rounded border border-gray-300 text-sm font-semibold hover:bg-gray-100${lang === 'EN' ? ' bg-gold text-white border-gold' : ''}`}
            onClick={() => setLang('EN')}
          >EN</button>
          <button
            className={`px-3 py-1 rounded border border-gray-300 text-sm font-semibold hover:bg-gray-100${lang === 'RU' ? ' bg-gold text-white border-gold' : ''}`}
            onClick={() => setLang('RU')}
          >RU</button>
        </div>
      </header>
      <main>
        {/* Hero + Intro Section with shared background image */}
  <div className="relative w-full" style={{ backgroundImage: "url('/images/capetown_background.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black/40 z-0" />
          {/* Hero Section */}
          <section className="relative flex items-center min-h-[70vh] z-10">
            <div className="relative z-10 max-w-2xl py-24 px-8 md:ml-24 text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.heroTitle.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}<br /></React.Fragment>
                ))}
              </h1>
              <p className="text-lg md:text-2xl mb-8 text-white/90 font-medium drop-shadow" style={{ fontFamily: 'Playfair Display, serif' }}>
                {t.heroDesc}
              </p>
              <button
                className="px-10 py-4 rounded-full bg-gold text-white text-lg font-bold shadow-lg hover:bg-yellow-700 transition"
                onClick={() => scrollToSection('contact')}
              >
                {t.heroBtn}
              </button>
            </div>
          </section>
          {/* Welcome/Intro Section (no map image) */}
          <section className="flex flex-col md:flex-row items-center justify-center gap-12 py-10 md:py-16 px-4 w-full relative overflow-hidden min-h-[350px] md:min-h-[420px] z-10">
            <div className="flex-[1.2] order-2 md:order-1 relative z-10 mt-0 slide-in-right rounded-3xl shadow-2xl overflow-hidden flex items-start justify-start min-h-[160px] bg-white/95 border-l-4 border-gold/70 ml-0 md:-ml-32" style={{ background: 'linear-gradient(120deg, #fffbe6 0%, #fff 100%)', maxWidth: '600px' }}>
              <div className="relative z-10 w-full flex flex-col items-start justify-center text-left py-4 px-6 md:px-10" style={{ maxWidth: '540px' }}>
                <div className="mb-3">
                  <span className="block text-2xl md:text-3xl font-bold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {t.introTitle}
                  </span>
                </div>
                <div className="text-gray-800 text-lg md:text-xl leading-relaxed font-sans mb-2">
                  <span className="italic font-medium text-gold/90">{t.introDesc1}</span><br/>
                  <span className="font-light">{t.introDesc2}</span>
                </div>
                <div className="my-3 h-1 w-12 bg-gold/30 rounded-full" />
                <div className="text-gray-700 italic text-base md:text-lg font-serif">
                  {t.introDesc3}
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Why choose us as your Tour Guide? Collage Section */}
  <section id="benefits" className="py-20 px-4 md:px-0 flex flex-col items-center bg-[#f8f7f4] rounded-3xl shadow-md mx-0 md:mx-auto max-w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-gold text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t.collageTitle}
          </h2>
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Bilingual tour guide */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-md p-6 group hover:shadow-xl transition">
              <div className="w-56 h-56 mb-4 rounded-2xl overflow-hidden bg-gold/10 flex items-center justify-center">
                <img src="/images/tour_guide.avif" alt={t.collage[0].title} className="object-cover w-full h-full group-hover:scale-105 transition" />
              </div>
              <div className="text-lg font-semibold text-gold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collage[0].title}</div>
              <p className="text-gray-700 text-center text-base mb-2">{t.collage[0].desc}</p>
              <button className="text-xs px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold/10 transition mb-2" onClick={() => toggleCollage('bilingual')}>
                {expanded.bilingual ? (lang === 'EN' ? 'Hide Photos' : 'Скрыть фото') : (lang === 'EN' ? 'View Photos' : 'Смотреть фото')}
              </button>
              {expanded.bilingual && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => toggleCollage('bilingual')}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collageModal.bilingual}</div>
                      <button className="text-gray-500 hover:text-gold text-xl font-bold" onClick={() => toggleCollage('bilingual')}>&times;</button>
                    </div>
                    <div className="columns-2 md:columns-3 gap-3 space-y-3">
                      {benefitImages.bilingual.map((src, i) => (
                          <img
                            key={src}
                            src={src}
                            alt="Bilingual collage"
                            className="rounded-xl mb-3 w-full object-cover bg-black/10"
                            style={{
                              display: 'block',
                              width: '100%',
                              maxHeight: '300px',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 2. Personalized tours tailored towards your interests */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-md p-6 group hover:shadow-xl transition">
              <div className="w-56 h-56 mb-4 rounded-2xl overflow-hidden bg-gold/10 flex items-center justify-center">
                <img src="/images/personalised_tours_1.webp" alt={t.collage[1].title} className="object-cover w-full h-full group-hover:scale-105 transition" />
              </div>
              <div className="text-lg font-semibold text-gold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collage[1].title}</div>
              <p className="text-gray-700 text-center text-base mb-2">{t.collage[1].desc}</p>
              <button className="text-xs px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold/10 transition mb-2" onClick={() => toggleCollage('personalized')}>
                {expanded.personalized ? (lang === 'EN' ? 'Hide Photos' : 'Скрыть фото') : (lang === 'EN' ? 'View Photos' : 'Смотреть фото')}
              </button>
              {expanded.personalized && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => toggleCollage('personalized')}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collageModal.personalized}</div>
                      <button className="text-gray-500 hover:text-gold text-xl font-bold" onClick={() => toggleCollage('personalized')}>&times;</button>
                    </div>
                    <div className="columns-2 md:columns-4 gap-3 space-y-3">
                      {benefitImages.personalized.map((src, i) => (
                          <img
                            key={src}
                            src={src}
                            alt="Personalized collage"
                            className="rounded-xl mb-3 w-full object-cover bg-black/10"
                            style={{
                              display: 'block',
                              width: '100%',
                              maxHeight: '200px',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 3. Stress free Transportation */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-md p-6 group hover:shadow-xl transition">
              <div className="w-56 h-56 mb-4 rounded-2xl overflow-hidden bg-gold/10 flex items-center justify-center">
                <img src="/images/transportation.avif" alt={t.collage[2].title} className="object-cover w-full h-full group-hover:scale-105 transition" />
              </div>
              <div className="text-lg font-semibold text-gold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collage[2].title}</div>
              <p className="text-gray-700 text-center text-base mb-2">{t.collage[2].desc}</p>
              <button className="text-xs px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold/10 transition mb-2" onClick={() => toggleCollage('transport')}>
                {expanded.transport ? (lang === 'EN' ? 'Hide Photos' : 'Скрыть фото') : (lang === 'EN' ? 'View Photos' : 'Смотреть фото')}
              </button>
              {expanded.transport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => toggleCollage('transport')}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collageModal.transport}</div>
                      <button className="text-gray-500 hover:text-gold text-xl font-bold" onClick={() => toggleCollage('transport')}>&times;</button>
                    </div>
                    <div className="columns-2 md:columns-3 gap-3 space-y-3">
                      {benefitImages.transport.map((src, i) => (
                          <img
                            key={src}
                            src={src}
                            alt="Transport collage"
                            className="rounded-xl mb-3 w-full object-cover bg-black/10"
                            style={{
                              display: 'block',
                              width: '100%',
                              maxHeight: '200px',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 4. 70+ completed tours */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-md p-6 group hover:shadow-xl transition">
              <div className="w-56 h-56 mb-4 rounded-2xl overflow-hidden bg-gold/10 flex items-center justify-center">
                <img src="/images/70+ tours completed.avif" alt={t.collage[3].title} className="object-cover w-full h-full group-hover:scale-105 transition" />
              </div>
              <div className="text-lg font-semibold text-gold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collage[3].title}</div>
              <p className="text-gray-700 text-center text-base mb-2">{t.collage[3].desc}</p>
              <button className="text-xs px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold/10 transition mb-2" onClick={() => toggleCollage('experience')}>
                {expanded.experience ? (lang === 'EN' ? 'Hide Photos' : 'Скрыть фото') : (lang === 'EN' ? 'View Photos' : 'Смотреть фото')}
              </button>
              {expanded.experience && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => toggleCollage('experience')}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collageModal.experience}</div>
                      <button className="text-gray-500 hover:text-gold text-xl font-bold" onClick={() => toggleCollage('experience')}>&times;</button>
                    </div>
                    <div className="columns-2 md:columns-3 gap-3 space-y-3">
                      {benefitImages.experience.map((src, i) => (
                          <img
                            key={src}
                            src={src}
                            alt="Experience collage"
                            className="rounded-xl mb-3 w-full object-cover bg-black/10"
                            style={{
                              display: 'block',
                              width: '100%',
                              maxHeight: '200px',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 5. Commitment to quality */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-md p-6 group hover:shadow-xl transition">
              <div className="w-56 h-56 mb-4 rounded-2xl overflow-hidden bg-gold/10 flex items-center justify-center">
                <img src="/images/quality.avif" alt={t.collage[4].title} className="object-cover w-full h-full group-hover:scale-105 transition" />
              </div>
              <div className="text-lg font-semibold text-gold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collage[4].title}</div>
              <p className="text-gray-700 text-center text-base mb-2">{t.collage[4].desc}</p>
              <button className="text-xs px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold/10 transition mb-2" onClick={() => toggleCollage('quality')}>
                {expanded.quality ? (lang === 'EN' ? 'Hide Photos' : 'Скрыть фото') : (lang === 'EN' ? 'View Photos' : 'Смотреть фото')}
              </button>
              {expanded.quality && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => toggleCollage('quality')}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collageModal.quality}</div>
                      <button className="text-gray-500 hover:text-gold text-xl font-bold" onClick={() => toggleCollage('quality')}>&times;</button>
                    </div>
                    <div className="columns-2 md:columns-3 gap-3 space-y-3">
                      {benefitImages.quality.map((src, i) => (
                          <img
                            key={src}
                            src={src}
                            alt="Quality collage"
                            className="rounded-xl mb-3 w-full object-cover bg-black/10"
                            style={{
                              display: 'block',
                              width: '100%',
                              maxHeight: '200px',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 6. Local expertise */}
            <div className="flex flex-col items-center bg-white/90 rounded-2xl shadow-md p-6 group hover:shadow-xl transition">
              <div className="w-56 h-56 mb-4 rounded-2xl overflow-hidden bg-gold/10 flex items-center justify-center">
                <img src="/images/local_expertise.avif" alt={t.collage[5].title} className="object-cover w-full h-full group-hover:scale-105 transition" />
              </div>
              <div className="text-lg font-semibold text-gold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collage[5].title}</div>
              <p className="text-gray-700 text-center text-base mb-2">{t.collage[5].desc}</p>
              <button className="text-xs px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold/10 transition mb-2" onClick={() => toggleCollage('local')}>
                {expanded.local ? (lang === 'EN' ? 'Hide Photos' : 'Скрыть фото') : (lang === 'EN' ? 'View Photos' : 'Смотреть фото')}
              </button>
              {expanded.local && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => toggleCollage('local')}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-bold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>{t.collageModal.local}</div>
                      <button className="text-gray-500 hover:text-gold text-xl font-bold" onClick={() => toggleCollage('local')}>&times;</button>
                    </div>
                    <div className="columns-2 md:columns-3 gap-3 space-y-3">
                      {benefitImages.local.map((src, i) => (
                          <img
                            key={src}
                            src={src}
                            alt="Local collage"
                            className="rounded-xl mb-3 w-full object-cover bg-black/10"
                            style={{
                              display: 'block',
                              width: '100%',
                              maxHeight: '200px',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* Tours We Offer Section - Carousel */}
  <section id="tours" className="relative w-full pt-20 pb-56 px-4 md:px-0 flex flex-col items-center shadow-md mx-0 md:mx-auto max-w-full overflow-visible" style={{ backgroundImage: "url('/images/capetown_background_2.webp')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
          <div className="absolute inset-0 bg-black/20 z-0" />
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-gold text-center" style={{ fontFamily: 'Playfair Display, serif' }} data-aos="fade-down" data-aos-delay="100">
              {t.toursTitle}
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 font-semibold text-center mb-10" style={{ fontFamily: 'Cormorant Garamond, serif' }} data-aos="fade-up" data-aos-delay="200">
              {t.toursDesc}
            </p>
            {/* Carousel logic */}
            <div className="relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <button onClick={() => setCarouselIdx(i => Math.max(0, i - 1))} className="p-2 rounded-full bg-gold/80 text-white shadow hover:bg-gold disabled:opacity-40" disabled={carouselIdx === 0} aria-label="Previous">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="flex gap-8 overflow-hidden w-full max-w-7xl justify-center">
                  {tours.slice(carouselIdx, carouselIdx + cardsPerView).map((tour, idx) => {
                    const absoluteIdx = carouselIdx + idx;
                    const aosProps = absoluteIdx < 4
                      ? { 'data-aos': 'zoom-in', 'data-aos-delay': 300 + idx * 100 }
                      : {};
                    return (
                      <div
                        key={tour.title}
                        className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col items-center min-w-[260px] max-w-[300px] transition-all duration-300"
                        {...aosProps}
                      >
                        <img src={tour.img} alt={tour.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                        <div className="text-xl font-bold text-gold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{tour.title}</div>
                        <p className="text-gray-700 text-center text-base">{tour.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setCarouselIdx(i => Math.min(maxIdx, i + 1))} className="p-2 rounded-full bg-gold/80 text-white shadow hover:bg-gold disabled:opacity-40" disabled={carouselIdx === maxIdx} aria-label="Next">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-2">
                {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                  <button key={i} onClick={() => setCarouselIdx(i)} className={`w-3 h-3 rounded-full ${i === carouselIdx ? 'bg-gold' : 'bg-gray-300'} transition`} aria-label={`Go to slide ${i + 1}`}></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Useful Information Section (Grid layout) */}
        <section id="useful-info" className="w-full py-20 px-4 md:px-0 flex flex-col items-center bg-white shadow-md mx-0 md:mx-auto max-w-full mt-12" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-gold text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t.usefulInfoTitle}
          </h2>
          {/* Climate Chart subsection */}
          {/* Chart title removed here to avoid duplicate; title is rendered inside ClimateChart or elsewhere as needed */}
          <ClimateChart
            chartTitle={t.climateChartTitle}
            tempLabel={t.climateTempLabel}
            rainLabel={t.climateRainLabel}
            legendTemp={t.climateLegendTemp}
            legendRain={t.climateLegendRain}
            tooltipTemp={t.climateTooltipTemp}
            tooltipRain={t.climateTooltipRain}
            sourceNote={t.climateSourceNote}
            months={t.climateMonths}
          />
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
            {/* Icon cards for each info block */}
            {t.usefulInfo.map((info, idx) => (
              <div key={info.title} className="bg-white/80 rounded-3xl shadow-xl border-2 border-gold/30 p-8 flex flex-col items-center justify-between min-h-[260px] transition hover:shadow-2xl" data-aos="fade-up" data-aos-delay={100 + idx * 50}>
                <div className="flex flex-col items-center mb-4">
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-3 shadow-lg">
                    {(() => {
                      switch(idx) {
                        case 0: // Safety
                          return (
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#bfa046" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="#bfa046" strokeWidth="2"/></svg>
                          );
                        case 1: // Best Time to Visit
                          return (
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#bfa046" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#bfa046" strokeWidth="2"/></svg>
                          );
                        case 2: // Weather & Packing
                          return (
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#bfa046" strokeWidth="2"/><path d="M8 16h8M8 12h8M8 8h8" stroke="#bfa046" strokeWidth="2"/></svg>
                          );
                        case 3: // Currency & Payments
                          return (
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M12 11v2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>
                          );
                        case 4: // Health & Safety
                          return (
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#bfa046" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="#bfa046" strokeWidth="2"/></svg>
                          );
                        case 5: // Local Etiquette
                          return (
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v20m0-20C6.477 2 2 6.477 2 12m10-10c5.523 0 10 4.477 10 10m-10 10c-5.523 0-10-4.477-10-10" stroke="#bfa046" strokeWidth="2"/></svg>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </span>
                  <div className="text-lg font-semibold text-gold" style={{ fontFamily: 'Playfair Display, serif' }}>{info.title}</div>
                </div>
                <p className="text-gray-700 text-base text-center">{info.desc}</p>
              </div>
            ))}
          </div>
        </section>
      {/* Contact/Booking Section */}
      <section id="contact" className="w-full py-20 px-4 md:px-0 flex flex-col items-center shadow-md mx-0 md:mx-auto max-w-full mt-12" style={{ backgroundImage: "url('/images/background_image_3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2
          className="text-3xl md:text-5xl font-extrabold mb-8 text-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#e6c97a', // lighter gold
            textShadow: '0 2px 8px rgba(191,160,70,0.12)'
          }}
        >
          {t.contactTitle.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}<br /></React.Fragment>
          ))}
        </h2>
        <form
          className="w-full max-w-lg bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col gap-6 mt-6"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
          onSubmit={handleContactSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-gold mb-2">{t.contactName}</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gold/30 focus:border-gold outline-none bg-white text-gray-900 text-base"
              placeholder={t.contactName}
              value={formState.name}
              onChange={handleContactChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gold mb-2">{t.contactEmail}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gold/30 focus:border-gold outline-none bg-white text-gray-900 text-base"
              placeholder={t.contactEmail}
              value={formState.email}
              onChange={handleContactChange}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-semibold text-gold mb-2">{t.contactMessage}</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gold/30 focus:border-gold outline-none bg-white text-gray-900 text-base"
              placeholder={t.contactMessage}
              value={formState.message}
              onChange={handleContactChange}
            ></textarea>
          </div>
          <button type="submit" className="mt-2 px-8 py-4 bg-gold text-white font-bold rounded-full shadow-lg hover:bg-gold/90 transition text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t.contactBtn}
          </button>
          {formStatus && (
            <div className="mt-2 text-center text-base font-semibold text-gold">{formStatus}</div>
          )}
        </form>
      </section>
      </main>
      {/* Footer */}
  <footer className="w-full bg-white text-black py-10 px-4 flex flex-col items-center mt-0 border-t border-gold/30">
  <div className="mb-4 p-2 bg-white shadow-lg inline-block rounded-2xl">
    <img src="/images/logo.svg" alt="Go Travel Cape Town Logo" className="h-12 w-auto drop-shadow-lg" />
  </div>
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t.footerContact}</h3>
        <div className="mb-2 text-lg">{t.footerPhone}</div>
        <div className="mb-4 text-lg">{t.footerEmail}</div>
        <div className="flex gap-6 mt-2">
          {/* Instagram */}
          <a href="https://www.instagram.com/go.travel.capetown?igsh=cm0zdXdta2NuMDNy" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-600 transition">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* Email */}
          <a href="mailto:info@gotravelcapetown.com" aria-label="Email" className="hover:text-black transition">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2"/><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>
          </a>
          {/* WhatsApp */}
          <a href="https://wa.me/27827757357" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-600 transition">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
          </a>
        </div>
  <div className="mt-6 text-sm text-black/80">&copy; {new Date().getFullYear()} {t.footerCopyright}</div>
  <div className="mt-2 text-xs" style={{ color: '#2563eb', fontWeight: 500 }}>
    Powered by <a href="https://www.webstratit.co.za" target="_blank" rel="noopener noreferrer" style={{ color: '#1e40af', textDecoration: 'underline', fontWeight: 900, fontSize: '1.1em', letterSpacing: 0.5, fontFamily: 'Orbitron, Share Tech Mono, Fira Mono, Arial, sans-serif' }}>Webstrat IT</a>
  </div>
      </footer>
  <CustomChatbotWidget lang={lang} />
    </div>
  );
};


export default App;

