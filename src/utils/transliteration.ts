// Simple Roman to Bangla transliteration mapping
// In production, use a proper library like Avro or similar
const transliterationMap: { [key: string]: string } = {
  // Vowels
  'a': 'া',
  'aa': 'আ',
  'i': 'ি',
  'ii': 'ী',
  'u': 'ু',
  'uu': 'ূ',
  'e': 'ে',
  'oo': 'ো',
  'o': 'অ',
  
  // Consonants
  'k': 'ক',
  'kh': 'খ',
  'g': 'গ',
  'gh': 'ঘ',
  'ng': 'ং',
  'ch': 'চ',
  'chh': 'ছ',
  'j': 'জ',
  'jh': 'ঝ',
  'T': 'ট',
  'Th': 'ঠ',
  'D': 'ড',
  'Dh': 'ঢ',
  'N': 'ণ',
  't': 'ত',
  'th': 'থ',
  'd': 'দ',
  'dh': 'ধ',
  'n': 'ন',
  'p': 'প',
  'ph': 'ফ',
  'f': 'ফ',
  'b': 'ব',
  'bh': 'ভ',
  'v': 'ভ',
  'm': 'ম',
  'z': 'য',
  'y': 'য',
  'r': 'র',
  'l': 'ল',
  'sh': 'শ',
  'S': 'ষ',
  's': 'স',
  'h': 'হ',
  'R': 'ড়',
  'Rh': 'ঢ়',
  'Y': 'য়',
  'w': 'ও',
  
  // Common words and phrases
  'ami': 'আমি',
  'tumi': 'তুমি',
  'se': 'সে',
  'apni': 'আপনি',
  'kemon': 'কেমন',
  'achen': 'আছেন',
  'bhalo': 'ভালো',
  'khabar': 'খাবার',
  'pani': 'পানি',
  'kaj': 'কাজ',
  'bhai': 'ভাই',
  'bon': 'বোন',
  'ma': 'মা',
  'baba': 'বাবা',
  'jibon': 'জীবন',
  'shohor': 'শহর',
  'gram': 'গ্রাম',
  'manush': 'মানুষ',
  'chele': 'ছেলে',
  'meye': 'মেয়ে',
  'school': 'স্কুল',
  'college': 'কলেজ',
  'university': 'বিশ্ববিদ্যালয়',
  'bondhu': 'বন্ধু',
  'shokal': 'সকাল',
  'bikal': 'বিকাল',
  'rat': 'রাত',
  'din': 'দিন',
  'mash': 'মাস',
  'bochor': 'বছর',
  'shomoy': 'সময়',
  'dorkar': 'দরকার',
  'chai': 'চাই',
  'pari': 'পারি',
  'jani': 'জানি',
  'boli': 'বলি',
  'shuni': 'শুনি',
  'dekhi': 'দেখি',
  'kori': 'করি',
  'hoi': 'হয়',
  'ase': 'আসে',
  'jay': 'যায়',
  'thake': 'থাকে'
};

export const romanToBangla = (romanText: string): string => {
  if (!romanText || romanText.trim() === '') return '';
  
  let result = romanText.toLowerCase();
  
  // Sort by length (longer matches first) to handle combinations like 'chh' before 'ch'
  const sortedKeys = Object.keys(transliterationMap).sort((a, b) => b.length - a.length);
  
  // Replace each Roman pattern with Bangla
  sortedKeys.forEach(roman => {
    const bangla = transliterationMap[roman];
    const regex = new RegExp(roman, 'gi');
    result = result.replace(regex, bangla);
  });
  
  return result;
};

// Get transliteration suggestions for autocomplete
export const getTransliterationSuggestions = (input: string): string[] => {
  const suggestions: string[] = [];
  const lowerInput = input.toLowerCase();
  
  // Find matches in our dictionary
  Object.keys(transliterationMap).forEach(roman => {
    if (roman.startsWith(lowerInput) && roman !== lowerInput) {
      suggestions.push(transliterationMap[roman]);
    }
  });
  
  return suggestions.slice(0, 5); // Return top 5 suggestions
};

// Simple phonetic matching for better transliteration
export const improveTransliteration = (text: string): string => {
  let improved = romanToBangla(text);
  
  // Post-processing rules for better output
  improved = improved.replace(/অা/g, 'আ');
  improved = improved.replace(/এঅ/g, 'ও');
  improved = improved.replace(/িি/g, 'ী');
  improved = improved.replace(/ুু/g, 'ূ');
  
  return improved;
};