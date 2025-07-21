/**
 * Utility functions for formatting subscription tier names
 */

/**
 * Extract the tier number from RepX tier names
 * @param {string} tierName - Full tier name like "RepX1 Professional Business Line"
 * @returns {string} - The extracted number as a string, or "1" as fallback
 */
export const extractRepXNumber = (tierName) => {
  if (!tierName || typeof tierName !== 'string') {
    return '1';
  }

  // Look for RepX followed by a number
  const match = tierName.match(/RepX(\d+)/i);
  if (match && match[1]) {
    return match[1];
  }

  // Fallback: look for any number in the name
  const numberMatch = tierName.match(/\d+/);
  if (numberMatch) {
    return numberMatch[0];
  }

  // Ultimate fallback
  return '1';
};

/**
 * Convert regular numbers to Unicode superscript characters
 * @param {string} number - The number to convert
 * @returns {string} - Unicode superscript version
 */
export const toSuperscriptUnicode = (number) => {
  const superscriptMap = {
    '0': '⁰',
    '1': '¹', 
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
  };

  return number.split('').map(digit => superscriptMap[digit] || digit).join('');
};

/**
 * Format a tier name into RepX with superscript number
 * @param {string} tierName - Original tier name
 * @param {boolean} useUnicode - Whether to use Unicode superscript (default: false, uses CSS)
 * @returns {object} - Object with repx and number parts
 */
export const formatRepXTierName = (tierName, useUnicode = false) => {
  const number = extractRepXNumber(tierName);
  
  return {
    repx: 'RepX',
    number: useUnicode ? toSuperscriptUnicode(number) : number,
    fullFormatted: useUnicode ? `RepX${toSuperscriptUnicode(number)}` : `RepX${number}`
  };
};