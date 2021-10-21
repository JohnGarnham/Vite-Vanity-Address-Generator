
import * as vite from '@vite/vitejs';

var getRandomValues = require('get-random-values');

onmessage = (e) => {

    const search = e.data;

    const use_prefix = search.use_prefix;
    const prefix = search.prefix;
    const use_suffix = search.use_suffix;
    const suffix = search.suffix;
    const count = search.count;

    // Debug log
    console.log(`In searchAddresses(${use_prefix},${prefix},${use_suffix},${suffix},${count})`);

    // Send START message
    var message = ({
      action: 'START',
      data: i
    });
    postMessage(JSON.stringify(message));
    // Create matches array
    var matches = new Array();
    // Iterate thru count addresses
    for(var i = 0; i < count; i++) {
      // Generate new random seed
      const seed = generateNewRandomSeed();
      // Generate an address from this seed
      let index = 0;
      var keyPair = vite.wallet.deriveKeyPairByIndex(seed, index);
      var address = vite.wallet.createAddressByPrivateKey(keyPair.privateKey);
      // Check if generated address matches criteria
      if (isMatch(address.address, use_prefix, prefix, use_suffix, suffix)) {
        // Create new message object
        message = ({
          action: 'MATCH',
          data: {
            seed: seed,
            address: address 
          }
        });
        // Debug matching address
        console.log("New address match found: ", message);
        // Send message back to UI
        postMessage(JSON.stringify(message));
      }
      // Update count every 100 iterations
      if(i% 100 == 0) {
        // Create new message object
        message = ({
          action: 'COUNT',
          data: i
        });
        // Debug matching address
        console.log("New update count message: ", message);
        postMessage(JSON.stringify(message));
      }
    } // end for loop
    // Update final count
    message = ({
      action: 'END',
      data: i
    });
    // Debug matching address
    console.log("New update count message: ", message);
    postMessage(JSON.stringify(message));
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
  getRandomValues(array);
  // Generate randomized hex string for seed
  return buf2hex(array.buffer);
}

// Convert buffer to hex string
function buf2hex(buffer) { 
return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))  // Convert to hex, pad with 0
    .join('');
}