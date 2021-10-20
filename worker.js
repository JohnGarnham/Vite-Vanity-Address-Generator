
import * as vite from '@vite/vitejs';

function doSearch() {
    const use_prefix = true;
    const use_suffix = false;
    const prefix = "aa";
    const suffix = "";
    const count = 500;


}

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

// Generate count Vite address and search for prefix or suffix 
// Return an array of matching MatchObj objects
export function searchAddresses(use_prefix, prefix, use_suffix, suffix, count) {
    // Debug log
    //console.log("In searchAddresses(${use_prefix},${prefix},${use_suffix},${suffix},${count})");
    // Create matches array
    var matches = new Array();
    // Iterate thru count addresses
    for(var i = 0; i < count; i++) {
      // Generate new random seed
      const seed = generateNewRandomSeed();
      // Generate an address from this seed
      let index = 0;
      var keyPair = wallet.deriveKeyPairByIndex(seed, index);
      var address = wallet.createAddressByPrivateKey(keyPair.privateKey);
      // Check if generated address matches criteria
      if (isMatch(address.address, use_prefix, prefix, use_suffix, suffix)) {
        // Create new match object
        const newMatch = ({
          address: address,
          seed: seed
        });
        // Push onto matches array
        matches.push(newMatch);
        // Debug matching address
        //console.log("New address match found: ", newMatch);
      }
    }
    // Return matches
    return matches;
}

// Generate new random seed
function generateNewRandomSeed() {
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
function buf2hex(buffer) { 
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))  // Convert to hex, pad with 0
      .join('');
}