import {wallet} from '@vite/vitejs';
import { Hex, Address } from '@vite/vitejs/distSrc/utils/type';

var getRandomValues = require('get-random-values');

export declare type AddressObj = {
  originalAddress: Hex;
  publicKey: Hex;
  privateKey: Hex;
  address: Address;
}
export declare type MatchObj = {
  address : AddressObj;
  seed : Hex;
}

// Returns true if address matches our criteria
function isMatch(address : string, use_prefix : boolean, prefix : string, use_suffix : boolean, suffix : string) : boolean {
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
// Return an array of matching MatchObj objects
export function searchAddresses(use_prefix: boolean, prefix : string, use_suffix: 
  boolean, suffix : string, count : number) : MatchObj[] {
    // Debug log
    //console.log("In searchAddresses(${use_prefix},${prefix},${use_suffix},${suffix},${count})");
    // Create matches array
    var matches : MatchObj[] = new Array();
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
        const newMatch = <MatchObj>({
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
function generateNewRandomSeed() : string {
    // Generate random 32 byte seed
    var array = new Uint8Array(32);
    getRandomValues(array);
    // Generate randomized hex string for seed
    return buf2hex(array.buffer);
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