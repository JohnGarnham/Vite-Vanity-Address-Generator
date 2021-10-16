import { searchAddresses } from "./findVanityAddress";

export function doSearch() {
    const use_prefix : boolean = true;
    const use_suffix : boolean = false;
    const prefix = "aa";
    const suffix = "";
    const count = 500;
    
    // Search for vanity addresses
    // Call search addresses function
    let output = searchAddresses(use_prefix,prefix,use_suffix,suffix,count);
    // If empty string returned, no matches found
    if(!output || output.length === 0) {
        console.log("No addresses found after " + count + " iterations.");
        output = "No addresses found";
    } else {
        console.log("Address found ", output);
    }

}