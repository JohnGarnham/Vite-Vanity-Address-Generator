
//
import {wallet} from '@vite/vitejs';

onmessage = (e) => {

    const search = e.data;

    const use_prefix = search.use_prefix;
    const prefix = search.prefix;
    const use_suffix = search.use_suffix;
    const suffix = search.suffix;
    const count = search.count;

    // Debug log
    console.log(`In searchAddresses(${use_prefix},${prefix},${use_suffix},${suffix},${count})`);
    // Grab search parameters

  };

// Returns true if address matches our criteria
function isMatch(address, use_prefix, prefix, use_suffix, suffix) {
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
function generateNewRandomSeed() {
    // Generate random 32 byte seed
    var array = new Uint8Array(32);
   // getRandomValues(array);
    // Generate randomized hex string for seed
    return buf2hex(array.buffer);
}

// Returns whether or not str is valid hex string
function isHexString(str) {
  var re = /^([0-9A-Fa-f])*$/;
  return (re.test(str));
}

// Convert buffer to hex string
function buf2hex(buffer) { 
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))  // Convert to hex, pad with 0
      .join('');
}