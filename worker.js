"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSearch = void 0;
function doSearch() {
    var use_prefix = true;
    var use_suffix = false;
    var prefix = "aa";
    var suffix = "";
    var count = 500;
}
exports.doSearch = doSearch;
onmessage = function (e) {
    console.log("In Webworker");

    const search = e.data;

    const use_prefix = search.use_prefix;
    const prefix = search.prefix;
    const use_suffix = search.use_suffix;
    const suffix = search.suffix;
    const count = search.count;

    // Debug log
    console.log("In searchAddresses(${use_prefix},${prefix},${use_suffix},${suffix},${count})");
    // Grab search parameters
};
