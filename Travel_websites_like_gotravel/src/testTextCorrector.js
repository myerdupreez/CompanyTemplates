// Test script for the text corrector
const { textCorrector } = require('./textCorrector.js');

console.log('🔧 TEXT CORRECTOR TEST SCRIPT');
console.log('================================\n');

// Test cases for common misspellings in travel context
const testCases = [
  // Location misspellings
  'I want to visit capetown and see tablemountain',
  'What about robbenisland tours?',
  'How do I get to vawater waterfront?',
  
  // Travel term misspellings
  'I need airpot transportation',
  'Can you arrange a shutle service?',
  'What accomodation do you recommend?',
  
  // Tour related misspellings
  'Are the toures familiy friendly?',
  'What activites are available for childern?',
  'I want sightseeng tours',
  
  // Safety and practical misspellings
  'Is capetown saftey for tourists?',
  'What curreny do they use?',
  'What languag do they speek?',
  
  // Booking and pricing misspellings
  'How do I make a resevation?',
  'What are your priceing options?',
  'Do you have afordable tours?',
  
  // Weather misspellings
  'What is the wether like?',
  'What is the temprature in winer?',
  'Is it suny in sumer?',
  
  // Common typos
  'Wat can I see ther?',
  'Hw much does it cost?',
  'Ca you help me plan my teh trip?',
  'I dont know waht to expect',
  'Its my frist time visiting',
  
  // Complex sentences with multiple errors
  'I am planing a familiy trip to capetown wiht my childern and need informaton about saftey and accomodation',
  'We want to bokk tours that are afordable and include airpot trasportation',
  'What activites are availabel for kidz during the winer season?'
];

console.log('Testing corrections:');
console.log('-------------------\n');

testCases.forEach((testCase, index) => {
  const corrected = textCorrector.correctText(testCase);
  const suggestions = textCorrector.suggestCorrections(testCase);
  
  console.log(`Test ${index + 1}:`);
  console.log(`Original:  "${testCase}"`);
  console.log(`Corrected: "${corrected}"`);
  
  if (suggestions.length > 0) {
    console.log(`Corrections made: ${suggestions.map(s => `${s.original} → ${s.suggestion}`).join(', ')}`);
  }
  
  console.log('');
});

// Test individual word corrections
console.log('\n🔤 INDIVIDUAL WORD TESTS');
console.log('========================\n');

const wordTests = [
  'capetown', 'tablemountain', 'robbenisland', 'airpot', 'shutle', 
  'accomodation', 'familiy', 'childern', 'saftey', 'curreny', 
  'languag', 'resevation', 'priceing', 'afordable', 'wether',
  'temprature', 'wat', 'hw', 'ca', 'teh', 'dont', 'waht', 'frist'
];

wordTests.forEach(word => {
  const corrected = textCorrector.correctText(word);
  if (corrected !== word) {
    console.log(`${word} → ${corrected}`);
  }
});

console.log('\n✅ Text corrector test completed!');
