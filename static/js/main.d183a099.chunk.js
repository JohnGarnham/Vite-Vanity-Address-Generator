(this["webpackJsonpvanity-wallet"]=this["webpackJsonpvanity-wallet"]||[]).push([[0],{13:function(e,t,s){},14:function(e,t,s){},2:function(e,t,s){"use strict";var a=this&&this.__read||function(e,t){var s="function"===typeof Symbol&&e[Symbol.iterator];if(!s)return e;var a,r,i=s.call(e),n=[];try{for(;(void 0===t||t-- >0)&&!(a=i.next()).done;)n.push(a.value)}catch(c){r={error:c}}finally{try{a&&!a.done&&(s=i.return)&&s.call(i)}finally{if(r)throw r.error}}return n},r=this&&this.__spreadArray||function(e,t){for(var s=0,a=t.length,r=e.length;s<a;s++,r++)e[r]=t[s];return e};Object.defineProperty(t,"__esModule",{value:!0}),t.isHexString=t.searchAddresses=void 0;var i=s(15),n=s(18);function c(e,t,s,a,r){var i=e.substring(5);if(t){if(null==s)return!1;if(!i.startsWith(s.toLowerCase()))return!1}if(a){if(null==r)return!1;if(!i.endsWith(r.toLowerCase()))return!1}return!0}function u(){var e,t=new Uint8Array(32);return n(t),e=t.buffer,r([],a(new Uint8Array(e))).map((function(e){return e.toString(16).padStart(2,"0")})).join("")}t.searchAddresses=function(e,t,s,a,r){var n=new Worker("worker.js");n.onerror=function(e){console.log("Web worker error: ",e)},n.postMessage({use_prefix:e,prefix:t,use_suffix:s,suffix:a,count:r});for(var o=new Array,l=0;l<r;l++){var h=u(),f=i.wallet.deriveKeyPairByIndex(h,0),d=i.wallet.createAddressByPrivateKey(f.privateKey);if(c(d.address,e,t,s,a)){var x={address:d,seed:h};o.push(x)}}return o},t.isHexString=function(e){return/^([0-9A-Fa-f])*$/.test(e)}},21:function(e,t){},23:function(e,t,s){"use strict";s.r(t);var a=s(1),r=s.n(a),i=s(4),n=s.n(i),c=(s(13),s(5)),u=s(6),o=s(8),l=s(7),h=(s(14),s(2)),f=s(0),d=function(e){Object(o.a)(s,e);var t=Object(l.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).state={search:{prefix:"",use_prefix:!0,suffix:"",use_suffix:!1,iterations:500},result:{output:""}},a}return Object(u.a)(s,[{key:"handlePrefixChanged",value:function(e){var t=this.state.search;t.prefix=e.target.value,console.log(JSON.stringify(t)),this.setState({search:t})}},{key:"handleSuffixChanged",value:function(e){var t=this.state.search;t.suffix=e.target.value,console.log(JSON.stringify(t)),this.setState({search:t})}},{key:"handleIterationsChanged",value:function(e){var t=this.state.search;t.iterations=e.target.value,console.log(JSON.stringify(t)),this.setState({search:t})}},{key:"handlePrefixCheckboxChanged",value:function(e){var t=this.state.search;t.use_prefix=!t.use_prefix,console.log(JSON.stringify(t)),this.setState({search:t})}},{key:"handleSuffixCheckboxChanged",value:function(e){var t=this.state.search;t.use_suffix=!t.use_suffix,console.log(JSON.stringify(t)),this.setState({search:t})}},{key:"reset",value:function(e){var t=this.state.search;t.prefix="",t.suffix="",t.use_prefix=!1,t.use_suffix=!1,t.iterations=500,this.setState({search:t});var s=document.getElementById("matches-found-label");null!=s&&(s.innerHTML="");var a=this.state.result;a.output="",this.setState({result:a})}},{key:"generateAddresses",value:function(e){e.preventDefault();var t=this.state.search;console.log(JSON.stringify(t));var s=this.state.search.prefix,a=this.state.search.use_prefix,r=this.state.search.suffix,i=this.state.search.use_suffix,n=this.state.search.iterations;if(Object(h.isHexString)(t.prefix))if(Object(h.isHexString)(t.suffix)){var c=new Worker("worker.js");c.onerror=function(e){console.log("Web worker error: ",e)},c.postMessage({use_prefix:a,prefix:s,use_suffix:i,suffix:r,count:n});var u=Object(h.searchAddresses)(a,s,i,r,n),o="",l="";l=0==u.length?o="No addresses found":u.length+" matching addresses found",console.log(l);var f=document.getElementById("matches-found-label");null!=f&&(f.innerHTML=l);var d=0;for(d=0;d<u.length;d++){var x=u[d];o+="Match #"+(d+1)+"\nAddress: "+x.address.address+"\nSeed: "+x.seed+"\nPrivate Key: "+x.address.privateKey+"\nPublic Key: "+x.address.publicKey+"\nOriginal Address: "+x.address.originalAddress+"\n\n"}var b=this.state.result;b.output=o,this.setState({result:b})}else alert("Suffix must be a hex string. Valid characters are 0-9 and A-F.");else alert("Prefix must be a hex string. Valid characters are 0-9 and A-F.")}},{key:"render",value:function(){return Object(f.jsxs)("div",{className:"root",children:[Object(f.jsx)("div",{className:"header",children:Object(f.jsx)("h2",{children:"Vite Vanity Address Creator"})}),Object(f.jsxs)("div",{className:"input-section",children:[Object(f.jsxs)("div",{className:"input-text-row",children:[Object(f.jsx)("input",{type:"checkbox",className:"input-checkbox",id:"usePrefix",value:this.state.search.use_prefix,checked:this.state.search.use_prefix,onChange:this.handlePrefixCheckboxChanged.bind(this)}),Object(f.jsx)("label",{className:"input-label",children:"Prefix:"}),Object(f.jsx)("input",{type:"text",className:"text-input",id:"prefix",name:"prefix",value:this.state.search.prefix,onChange:this.handlePrefixChanged.bind(this)})]}),Object(f.jsxs)("div",{className:"input-text-row",children:[Object(f.jsx)("input",{type:"checkbox",className:"input-checkbox",id:"useSuffix",value:this.state.search.use_suffix,checked:this.state.search.use_suffix,onChange:this.handleSuffixCheckboxChanged.bind(this)}),Object(f.jsx)("label",{className:"input-label",children:"Suffix:"}),Object(f.jsx)("input",{type:"text",className:"text-input",id:"suffix",name:"suffix",value:this.state.search.suffix,onChange:this.handleSuffixChanged.bind(this)})]}),Object(f.jsxs)("div",{className:"input-text-row",children:[Object(f.jsx)("label",{className:"input-label",children:"Iterations:"}),Object(f.jsx)("input",{type:"text",className:"text-input-iterations",id:"iterations",name:"iterations",value:this.state.search.iterations,onChange:this.handleIterationsChanged.bind(this)}),Object(f.jsx)("label",{className:"matches-label",name:"matches-found-label",id:"matches-found-label"})]})]}),Object(f.jsxs)("div",{className:"input-button-row",children:[Object(f.jsx)("button",{type:"button",className:"input-button",name:"Generate",onClick:this.generateAddresses.bind(this),children:"Generate"}),Object(f.jsx)("button",{type:"button",className:"input-button",name:"Reset",onClick:this.reset.bind(this),children:"Reset"})]}),Object(f.jsx)("div",{className:"output-row",children:Object(f.jsx)("textarea",{className:"textarea-output",id:"output",name:"output",value:this.state.result.output,readOnly:!0})}),Object(f.jsxs)("footer",{children:["Email: ",Object(f.jsx)("a",{className:"footer-link",href:"mailto:john.e.garnham@gmail.com",children:"john.e.garnham@gmail.com"}),"Twitter: ",Object(f.jsx)("a",{className:"footer-link",href:"https://twitter.com/ViNoDevErik",children:"ViNoDevErik"}),"Source: ",Object(f.jsx)("a",{className:"footer-link",href:"https://github.com/JohnGarnham/Vite-Vanity-Address-Generator",children:"https://github.com/JohnGarnham/Vite-Vanity-Address-Generator"})]})]})}}]),s}(r.a.Component),x=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,24)).then((function(t){var s=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,n=t.getTTFB;s(e),a(e),r(e),i(e),n(e)}))};n.a.render(Object(f.jsx)(r.a.StrictMode,{children:Object(f.jsx)(d,{})}),document.getElementById("root")),x()}},[[23,1,2]]]);
//# sourceMappingURL=main.d183a099.chunk.js.map