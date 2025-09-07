import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '+27827494295'; // Remove spaces for WhatsApp URL
  const message = 'Hello! I would like to know more about KadiPore Chilli Farms products.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on WhatsApp
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
