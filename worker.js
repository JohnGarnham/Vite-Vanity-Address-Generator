
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