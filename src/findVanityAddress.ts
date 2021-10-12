import {wallet} from '@vite/vitejs';
var getRandomValues = require('get-random-values');

// Returns true if address matches our criteria
function isMatch(address : string, use_prefix : boolean, prefix : string, use_suffix : boolean, suffix : string) {
  // Chop off vite_
  const addr : string = address.substring(5);
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
export function searchAddresses(use_prefix: boolean, prefix : string, use_suffix: 
  boolean, suffix : string, count : number) : string {
    // Construct output string from matching addresses
    let output : string = "";
    // Iterate thru count addresses
    for(var i = 0; i < count; i++) {
      // Generate random 32 byte seed
      var array = new Uint8Array(32);
      getRandomValues(array);
      // Generate randomized hex string for seed
      const seed = buf2hex(array.buffer);
      // Generate an address
      let index = 0;
      var keyPair = wallet.deriveKeyPairByIndex(seed, index);
      var address = wallet.createAddressByPrivateKey(keyPair.privateKey);
      // Check if generated address matches criteria
      if (isMatch(address.address, use_prefix, prefix, use_suffix, suffix)) {
        let addressInfo = "Address: " + address.address + "\n" +
          "Seed: " + seed + "\n" +
          "Private Key: " + address.privateKey + "\n" +
          "Public Key: " + address.publicKey + "\n" +
          "Original Address: " + address.originalAddress + "\n\n"
        output += addressInfo;
      }
  }
  // Return output string
  return output;
}

// Returns whether or not str is valid hex string
export function isHexString(str : string) {
  var re = /^([0-9A-Fa-f])*$/;
  return (re.test(str));
}

// Convert buffer to hex string
function buf2hex(buffer : ArrayBufferLike) { 
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))  // Convert to hex, pad with 0
      .join('');
}