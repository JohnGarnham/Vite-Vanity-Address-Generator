import {wallet} from '@vite/vitejs';
import { Uint8 } from 'vitejs-notthomiz/distSrc/utils/type';
var getRandomValues = require('get-random-values');

let running = false
let count = 0
let nextReport = 0
var initChar = ''
var prefix = ''
var suffix = ''
var initCharInt = 0 //used to subtract the match start point

// Returns true if address matches our criteria
function isMatch(address : string, use_prefix : boolean, prefix : string, use_suffix : boolean, suffix : string) {
  // Chop off vite_
  const addr : string = address.substring(5);
  // Check matching prefix 
  if(use_prefix) {
    // Fail on null or empty string
    if (prefix == null || prefix === "") return false;
    // Fail on mismatch
    if (! addr.startsWith(prefix)) return false;
  }
  // Check matching suffix
  if(use_suffix) {
    // Fail on null or empty string
    if (suffix == null || suffix === "") return false;
    // Fail on mismatch
    if (! addr.endsWith(suffix)) return false;
  }
  // If you reached here, you've won! :)
  return true;
}

// Generate count Vite address and search for prefix or suffix 
export function searchAddresses(use_prefix: boolean, prefix : string, use_suffix: boolean, suffix : string, count : number) {
  count += 1;
  const iterations = 400;
  for(var i = 0; i < iterations; i++) {
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
      console.log("Address matched: ", address.address);
      return address;
    }
  }
  // Return empty string if no matches found
  return "";
}

// Convert buffer to hex string
function buf2hex(buffer : ArrayBufferLike) { 
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))  // Convert to hex, pad with 0
      .join('');
}