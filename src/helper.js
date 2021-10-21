const {wallet} = require('@vite/vitejs');

var getRandomValues = require('get-random-values');

// Returns true if address matches our criteria
export function isMatch(address, use_prefix, prefix, use_suffix, suffix) {
  // Chop off vite_
  const addr = address.substring(5);
  // Check matching prefix 
  if(use_prefix) {
    // Fail on null or empty string
    if (prefix == null) return false;
    // Fail on mismatch
    if (! addr.startsWith(prefix.toLowerCase())) return false;
  }
  // Check matching suffix
  if(use_suffix) {
    // Fail on null or empty string
    if (suffix == null) return false;
    // Fail on mismatch
    if (! addr.endsWith(suffix.toLowerCase())) return false;
  }
  // If you reached here, you've won! :)
  return true;
}

// Generate new random seed
export function generateNewRandomSeed() {
    // Generate random 32 byte seed
    var array = new Uint8Array(32);
    getRandomValues(array);
    // Generate randomized hex string for seed
    return buf2hex(array.buffer);
}

// Returns whether or not str is valid hex string
export function isHexString(str) {
  var re = /^([0-9A-Fa-f])*$/;
  return (re.test(str));
}

// Convert buffer to hex string
export function buf2hex(buffer) { 
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))  // Convert to hex, pad with 0
      .join('');
}