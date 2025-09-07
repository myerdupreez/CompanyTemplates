// Lightweight text corrector for common travel and tourism misspellings
// Focuses on travel-related terms and common typos

class TextCorrector {
  constructor() {
    // Common misspellings and corrections for travel/tourism context
    this.corrections = {
      // Location names
      'capetown': 'cape town',
      'cape town': 'cape town',
      'captown': 'cape town',
      'kaapstad': 'cape town',
      'southafrica': 'south africa',
      'south-africa': 'south africa',
      'robbenisland': 'robben island',
      'robben island': 'robben island',
      'tablemountain': 'table mountain',
      'table mountain': 'table mountain',
      'vawater': 'v&a waterfront',
      'waterfront': 'v&a waterfront',
      'kirstenbosch': 'kirstenbosch',
      'boulders': 'boulders beach',
      'campsbay': 'camps bay',
      'camps bay': 'camps bay',
      'constantia': 'constantia',
      'chapmans': 'chapmans peak',
      "chapman's": "chapman's peak",
      'capepoint': 'cape point',
      'cape point': 'cape point',
      
      // Travel terms
      'accomodation': 'accommodation',
      'acommodation': 'accommodation',
      'acomodation': 'accommodation',
      'trasportation': 'transportation',
      'transportaion': 'transportation',
      'transportion': 'transportation',
      'airpot': 'airport',
      'airprot': 'airport',
      'arport': 'airport',
      'ariport': 'airport',
      'shuttl': 'shuttle',
      'shutle': 'shuttle',
      'shuddle': 'shuttle',
      'transfere': 'transfer',
      'trasfer': 'transfer',
      'tranfer': 'transfer',
      
      // Tour related
      'familiy': 'family',
      'familly': 'family',
      'childern': 'children',
      'childre': 'children',
      'childen': 'children',
      'kidz': 'kids',
      'tourss': 'tours',
      'toures': 'tours',
      'excursion': 'excursion',
      'excurion': 'excursion',
      'exursion': 'excursion',
      'activites': 'activities',
      'activitis': 'activities',
      'activitie': 'activities',
      'sightseeng': 'sightseeing',
      'siteseeing': 'sightseeing',
      'sightseig': 'sightseeing',
      
      // Safety and practical
      'saftey': 'safety',
      'safty': 'safety',
      'sefety': 'safety',
      'curreny': 'currency',
      'curency': 'currency',
      'currancy': 'currency',
      'languag': 'language',
      'langauge': 'language',
      'languges': 'languages',
      'speek': 'speak',
      'spek': 'speak',
      'comunication': 'communication',
      'comunicate': 'communicate',
      
      // Booking and pricing
      'resevation': 'reservation',
      'reservaton': 'reservation',
      'reseravtion': 'reservation',
      'bokking': 'booking',
      'boking': 'booking',
      'bookng': 'booking',
      'priceing': 'pricing',
      'picing': 'pricing',
      'prcing': 'pricing',
      'expensiv': 'expensive',
      'expesive': 'expensive',
      'afordable': 'affordable',
      'affortable': 'affordable',
      'cheep': 'cheap',
      'chep': 'cheap',
      
      // Weather and seasons
      'wether': 'weather',
      'wheather': 'weather',
      'climat': 'climate',
      'temprature': 'temperature',
      'temperatur': 'temperature',
      'tempurature': 'temperature',
      'rainy': 'rainy',
      'rany': 'rainy',
      'suny': 'sunny',
      'sumer': 'summer',
      'winer': 'winter',
      'autum': 'autumn',
      
      // Common question words
      'wat': 'what',
      'wher': 'where',
      'wen': 'when',
      'whre': 'where',
      'hw': 'how',
      'hwo': 'how',
      'shoud': 'should',
      'shold': 'should',
      'whould': 'would',
      'wold': 'would',
      
      // Common typos (only longer words)
      'adn': 'and',
      'teh': 'the',
      'hte': 'the',
      'taht': 'that',
      'thta': 'that',
      'jsut': 'just',
      'juts': 'just',
      'wiht': 'with',
      'whit': 'with',
      'ther': 'there',
      'thre': 'there',
      'thier': 'their',
      'theri': 'their',
      'youre': "you're",
      'your': 'your',
      'its': 'its',
      "it's": "it's",
      'dont': "don't",
      'dosent': "doesn't",
      'doesnt': "doesn't",
      'cant': "can't",
      'wont': "won't",
      'isnt': "isn't",
      'arent': "aren't",
      'wasnt': "wasn't",
      'werent': "weren't",
      'hasnt': "hasn't",
      'havent': "haven't",
      'hadnt': "hadn't",
      'wouldnt': "wouldn't",
      'shouldnt': "shouldn't",
      'couldnt': "couldn't",
      
      // Numbers often typed as words
      'frist': 'first',
      'fisrt': 'first',
      'frst': 'first',
      'secod': 'second',
      'scond': 'second',
      'thrid': 'third',
      'tird': 'third',
      
      // Common word endings
      'tion': 'tion',
      'sion': 'sion',
      'ing': 'ing',
      'ness': 'ness',
      'ment': 'ment',
      'able': 'able',
      'ible': 'ible'
    };
    
    // Levenshtein distance threshold for fuzzy matching
    this.maxDistance = 2;
  }
  
  // Main correction function
  correctText(text) {
    if (!text || typeof text !== 'string') return text;
    
    // Split into words, preserving spaces and punctuation
    const words = text.toLowerCase().split(/(\s+|[^\w\s])/);
    
    const correctedWords = words.map(word => {
      // Skip whitespace and punctuation
      if (!word.match(/\w/)) return word;
      
      // Clean word for lookup (remove punctuation)
      const cleanWord = word.replace(/[^\w]/g, '');
      
      // Direct lookup in corrections dictionary
      if (this.corrections[cleanWord] && cleanWord.length > 2) {
        // Preserve original punctuation
        return word.replace(cleanWord, this.corrections[cleanWord]);
      }
      
      // Try fuzzy matching only for longer words to avoid over-correction
      if (cleanWord.length > 3) {
        const fuzzyMatch = this.findFuzzyMatch(cleanWord);
        if (fuzzyMatch && fuzzyMatch !== cleanWord) {
          return word.replace(cleanWord, fuzzyMatch);
        }
      }
      
      return word;
    });
    
    return correctedWords.join('');
  }
  
  // Find closest match using Levenshtein distance
  findFuzzyMatch(word) {
    // Only apply fuzzy matching to words longer than 4 characters to avoid over-correction
    if (word.length < 5) return null;
    
    let bestMatch = null;
    let bestDistance = this.maxDistance + 1;
    
    for (const [misspelling, correction] of Object.entries(this.corrections)) {
      if (misspelling.length < 5) continue; // Skip short words for fuzzy matching
      
      const distance = this.levenshteinDistance(word, misspelling);
      if (distance <= this.maxDistance && distance < bestDistance) {
        bestDistance = distance;
        bestMatch = correction;
      }
    }
    
    return bestMatch;
  }
  
  // Calculate Levenshtein distance between two strings
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    // Create matrix
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    // Fill matrix
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  // Suggest corrections for debugging
  suggestCorrections(text) {
    const words = text.toLowerCase().split(/\s+/);
    const suggestions = [];
    
    words.forEach(word => {
      const cleaned = word.replace(/[^\w]/g, '');
      if (this.corrections[cleaned] && this.corrections[cleaned] !== cleaned) {
        suggestions.push({
          original: word,
          suggestion: this.corrections[cleaned]
        });
      }
    });
    
    return suggestions;
  }
}

// Export singleton instance
const textCorrector = new TextCorrector();

// Support CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TextCorrector, textCorrector };
}

// Also export for global use (for React/Vite when imported)
if (typeof window !== 'undefined') {
  window.TextCorrector = TextCorrector;
  window.textCorrector = textCorrector;
}
