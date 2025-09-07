// KadiPore Chilli Farms Chatbot Configuration

export const chilliChatbotConfig = {
  botName: "CHILLIBOT",
  avatar: "/logo.jpeg", // Using the KadiPore logo
  translations: {
    EN: {
      welcome: 'Hi! 🌶️ Welcome to KadiPore Chilli Farms! How can I help you with our premium chilli products today?',
      placeholder: 'Ask me about our hot sauces, chillies, or farm...',
      label: 'Got questions about chillies?',
      close: 'Close',
      send: 'Send',
      disclaimer: 'ChilliBot is helpful but not perfect - for detailed orders and farm visits, please contact us directly.',
      replies: {
        products: `🌶️ **Our Premium Products:**
        
**Hot Sauces:**
• Original Hot Sauce (Medium) - R89
• Mild Hot Sauce - R65  
• Carolina Reaper Sauce (Extreme) - R120
• Ghost Pepper Sauce (Very Hot) - R110
• Sugar Rush Peach Sauce (Medium) - R85
• Fermented Pepper Mash (Hot) - R95

**Chilli Powders:**
• Dried Chilli Powder (Hot) - R45
• Carolina Reaper Powder (Extreme) - R85
• Ghost Pepper Powder (Very Hot) - R75
• Habanero Powder Mix (Hot) - R55

**Fresh Chillies (per kg):**
• Fresh Jalapeños (Medium) - R25
• Green Thai Chillies (Hot) - R65
• Orange/Red/Yellow Habaneros (Very Hot) - R85
• Carolina Reapers (Extreme) - R150`,

        heat: `🔥 **Heat Level Guide:**
        
• **Mild** (🌶️) - Gentle warmth, perfect for beginners
• **Medium** (🌶️🌶️) - Noticeable heat with great flavor
• **Hot** (🌶️🌶️🌶️) - Serious heat for spice lovers
• **Very Hot** (🌶️🌶️🌶️🌶️) - Intense heat, handle with care
• **Extreme** (🌶️🌶️🌶️🌶️🌶️) - Only for the bravest souls!

Our Carolina Reaper is the world's hottest pepper - use sparingly!`,

        farm: `🚜 **About KadiPore Chilli Farms:**
        
We're a family-owned farm in Magaliesburg, Gauteng, established in November 2016. We specialize in:

• Small batch, handcrafted hot sauces
• Sustainably grown fresh chillies
• Premium dried chilli products
• Farm tours and educational experiences

**Farm Address:** 123 Chilli Valley Road, Magaliesburg, Gauteng 1791

**Operating Hours:**
• Monday - Friday: 8:00 AM - 5:00 PM
• Saturday: 9:00 AM - 3:00 PM
• Sunday: Closed`,

        ordering: `📦 **How to Order:**
        
1. **Online:** Browse our shop section and add items to cart
2. **Phone:** Call us at +27 11 456 7890
3. **WhatsApp:** Message us at +27 82 749 4295
4. **Email:** orders@kadiporechillifarms.co.za

**Delivery Options:**
• Same day delivery (Johannesburg area)
• Nationwide shipping available
• Temperature-controlled transport for fresh products

**Payment Methods:**
• Credit/Debit cards
• EFT transfers
• Cash on delivery (local areas)`,

        growing: `🌱 **Growing & Care Tips:**
        
**For Chilli Plants:**
• Plant in well-draining soil with full sun
• Water regularly but don't overwater
• Use organic fertilizer monthly
• Harvest when peppers reach full color

**Storage Tips:**
• Fresh chillies: Refrigerate for up to 2 weeks
• Dried products: Store in cool, dry place
• Hot sauces: Refrigerate after opening

**Safety Tips:**
• Always wear gloves when handling hot chillies
• Avoid touching eyes or face
• Have milk/yogurt ready to cool your mouth!`,

        recipes: `👨‍🍳 **Cooking with Our Products:**
        
**Hot Sauce Uses:**
• Add to pizza, burgers, and sandwiches
• Mix into marinades and dressings
• Spice up soups and stews
• Create spicy mayo or aioli

**Chilli Powder Uses:**
• Season meats before grilling
• Add to spice rubs and marinades
• Sprinkle on popcorn or nuts
• Mix into chocolate for Mexican-style treats

**Fresh Chilli Ideas:**
• Pickle for long-term storage
• Stuff jalapeños with cream cheese
• Add to stir-fries and curries
• Make fresh salsa or hot sauce`,

        health: `💪 **Health Benefits of Chillies:**
        
• **Metabolism Boost:** Capsaicin helps burn calories
• **Pain Relief:** Natural pain-fighting properties
• **Vitamin C:** High antioxidant content
• **Heart Health:** May help reduce blood pressure
• **Digestive Aid:** Stimulates healthy digestion

**Caution:** Start with small amounts if you're not used to spicy food. Some people may be sensitive to capsaicin.`,

        visit: `🚜 **Farm Tours Available!**
        
Experience the passion behind our products:
• See how we grow and harvest chillies
• Learn about sustainable farming practices
• Taste different varieties and heat levels
• Meet our farming team
• Take photos in our chilli fields

**To Book:** Use our contact form or call +27 11 456 7890
**Duration:** 2-3 hours
**Includes:** Guided tour + tasting session + small gift

**Best Times:** Spring (Sept-Oct) and Summer (Nov-Mar)`,

        shipping: `🚚 **Shipping Information:**
        
**Local Delivery (Gauteng):**
• Same day delivery available
• R50 delivery fee
• Free delivery on orders over R300

**National Shipping:**
• 2-5 business days via courier
• R80-120 shipping fee (depends on location)
• Free shipping on orders over R500

**International Shipping:**
• Available to selected countries
• 7-14 business days
• Custom duties may apply

**Packaging:** All products carefully packaged with cooling packs for fresh items.`,

        safety: `⚠️ **Chilli Safety Guidelines:**
        
**Handling:**
• Always wear gloves when cutting hot chillies
• Use separate cutting boards for chillies
• Wash hands thoroughly with dish soap (not just water)
• Keep away from children and pets

**Eating:**
• Start with small amounts to test tolerance
• Have dairy products ready (milk, yogurt, ice cream)
• Don't drink water - it spreads the heat!
• If skin burns, apply vegetable oil then soap

**Storage:**
• Keep hot sauces refrigerated after opening
• Store dried products in airtight containers
• Label containers clearly`,

        varieties: `🌶️ **Chilli Varieties We Grow:**
        
**Mild to Medium:**
• Jalapeños - Classic Mexican flavor
• Sugar Rush Peach - Sweet and fruity

**Hot:**
• Thai Chillies - Small but mighty
• Cayenne - Perfect for drying

**Very Hot:**
• Habaneros (Orange, Red, Yellow) - Fruity heat
• Scotch Bonnets - Caribbean favorite

**Extreme:**
• Ghost Peppers (Bhut Jolokia) - Legendary heat
• Carolina Reapers - World's hottest pepper!

Each variety has unique flavor profiles beyond just heat.`,

        fallback: `🌶️ I can help with information about:
        
• Our products & heat levels
• Ordering & shipping
• Farm tours & visits  
• Growing & storage tips
• Recipes & cooking ideas
• Health benefits & safety
• Chilli varieties we grow

What would you like to know about KadiPore Chilli Farms?`
      }
    }
  },

  // Function to get bot replies based on user input
  getBotReply: function(userMessage) {
    const message = userMessage.toLowerCase().trim();
    const replies = this.translations.EN.replies;

    // Text corrections for common misspellings/variations
    const correctedMessage = message
      .replace(/chili/g, 'chilli')
      .replace(/spicy/g, 'hot')
      .replace(/price/g, 'cost')
      .replace(/buy/g, 'order');

    // Product-related keywords
    if (correctedMessage.includes('product') || correctedMessage.includes('sauce') || 
        correctedMessage.includes('powder') || correctedMessage.includes('fresh') ||
        correctedMessage.includes('what do you sell') || correctedMessage.includes('catalog') ||
        correctedMessage.includes('menu') || correctedMessage.includes('inventory')) {
      return replies.products;
    }

    // Heat level keywords
    if (correctedMessage.includes('heat') || correctedMessage.includes('hot') || 
        correctedMessage.includes('spicy') || correctedMessage.includes('mild') ||
        correctedMessage.includes('scoville') || correctedMessage.includes('burn') ||
        correctedMessage.includes('level')) {
      return replies.heat;
    }

    // Farm information keywords
    if (correctedMessage.includes('farm') || correctedMessage.includes('about') || 
        correctedMessage.includes('history') || correctedMessage.includes('location') ||
        correctedMessage.includes('address') || correctedMessage.includes('where') ||
        correctedMessage.includes('founded') || correctedMessage.includes('family')) {
      return replies.farm;
    }

    // Ordering keywords
    if (correctedMessage.includes('order') || correctedMessage.includes('buy') || 
        correctedMessage.includes('purchase') || correctedMessage.includes('cost') ||
        correctedMessage.includes('payment') || correctedMessage.includes('pay') ||
        correctedMessage.includes('how to buy')) {
      return replies.ordering;
    }

    // Growing/care keywords
    if (correctedMessage.includes('grow') || correctedMessage.includes('plant') || 
        correctedMessage.includes('care') || correctedMessage.includes('storage') ||
        correctedMessage.includes('keep') || correctedMessage.includes('maintain') ||
        correctedMessage.includes('tips')) {
      return replies.growing;
    }

    // Recipe keywords
    if (correctedMessage.includes('recipe') || correctedMessage.includes('cook') || 
        correctedMessage.includes('use') || correctedMessage.includes('eat') ||
        correctedMessage.includes('food') || correctedMessage.includes('dish') ||
        correctedMessage.includes('ingredient')) {
      return replies.recipes;
    }

    // Health keywords
    if (correctedMessage.includes('health') || correctedMessage.includes('benefit') || 
        correctedMessage.includes('vitamin') || correctedMessage.includes('nutrition') ||
        correctedMessage.includes('good for') || correctedMessage.includes('medicinal')) {
      return replies.health;
    }

    // Visit/tour keywords
    if (correctedMessage.includes('visit') || correctedMessage.includes('tour') || 
        correctedMessage.includes('come') || correctedMessage.includes('see') ||
        correctedMessage.includes('experience') || correctedMessage.includes('book')) {
      return replies.visit;
    }

    // Shipping keywords
    if (correctedMessage.includes('ship') || correctedMessage.includes('deliver') || 
        correctedMessage.includes('send') || correctedMessage.includes('freight') ||
        correctedMessage.includes('courier') || correctedMessage.includes('post')) {
      return replies.shipping;
    }

    // Safety keywords
    if (correctedMessage.includes('safe') || correctedMessage.includes('danger') || 
        correctedMessage.includes('careful') || correctedMessage.includes('protect') ||
        correctedMessage.includes('handle') || correctedMessage.includes('warning')) {
      return replies.safety;
    }

    // Variety keywords
    if (correctedMessage.includes('variety') || correctedMessage.includes('type') || 
        correctedMessage.includes('kind') || correctedMessage.includes('pepper') ||
        correctedMessage.includes('different') || correctedMessage.includes('strain')) {
      return replies.varieties;
    }

    // Greeting responses
    if (correctedMessage.includes('hello') || correctedMessage.includes('hi') || 
        correctedMessage.includes('hey') || correctedMessage.includes('good')) {
      return this.translations.EN.welcome;
    }

    // Default fallback
    return replies.fallback;
  }
};