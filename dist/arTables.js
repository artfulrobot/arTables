!function(t){var e={};function r(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=0)}([function(t,e,r){r(1),t.exports=r(2)},function(t,e){function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var r=[],a=!0,n=!1,i=void 0;try{for(var o,l=t[Symbol.iterator]();!(a=(o=l.next()).done)&&(r.push(o.value),!e||r.length!==e);a=!0);}catch(t){n=!0,i=t}finally{try{a||null==l.return||l.return()}finally{if(n)throw i}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var i=function(){function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!e.arTable){void 0===t.lastId&&(console.log("setting lastId"),t.lastId=1),console.log(a(t.lastId)),e.arTable=this,this.tableNode=e,window.addEventListener("resize",this.handleResize.bind(this));var r=this.tableNode.querySelector("thead>tr"),n=!1;0===r.length&&(n=!0,r=this.tableNode.querySelector("tr")),this.headerCells=[].slice.call(r.children),e.dataset&&e.dataset.minWidth?this.minWidth=e.dataset.minWidth:this.minWidth=100*this.headerCells.length,this.layout="normal",this.bodyTrs=[].slice.call(this.tableNode.querySelectorAll("tbody tr")),0===this.bodyTrs.length&&(this.bodyTrs=[].slice.call(this.tableNode.querySelectorAll("tr"))),n&&this.bodyTrs.length>0&&this.bodyTrs.shift(),this.parseTableData(),this.handleResize(),this.createFilterUi()}}var e,i,o;return e=t,(i=[{key:"parseTableData",value:function(){var t=this;0!==this.bodyTrs.length&&0!==this.headerCells.length&&(this.casts=[],this.indexes={},this.headerCells.forEach((function(e,r){if("string"==typeof e.dataset.cast){var a={header:e,idx:r,type:e.dataset.cast};"values"===e.dataset.filter&&(a.rowsByValue={}),a.sortable=void 0!==e.dataset.sortable,t.casts.push(a)}})),this.tableNode.dataset.filter,0!==this.casts.length&&(this.bodyTrs.forEach((function(e){t.casts.forEach((function(t){var r=e.children[t.idx];void 0!==r&&("date"===t.type?r.arData=new Date(r.textContent):"number"===t.type?r.arData=parseFloat(r.textContent):"text"===t.type?r.arData=r.textContent.toLocaleLowerCase():r.arData=r.textContent,"rowsByValue"in t&&(r.arData in t.rowsByValue?t.rowsByValue[r.textContent].push(e):t.rowsByValue[r.textContent]=[e]))}))})),console.log(this)))}},{key:"createFilterUi",value:function(){var t=this;this.ui=document.createElement("div"),this.ui.classList.add("arr-filters");var e=[];this.casts.forEach((function(r){"text"===r.header.dataset.filter?t.addTextFilter(r):"values"===r.header.dataset.filter&&t.addValuesFilter(r),r.sortable&&e.push(r)})),e&&this.addSortOptions(e),this.tableNode.insertAdjacentElement("beforebegin",this.ui)}},{key:"addSortOptions",value:function(e){var r="arr"+t.lastId++,a=document.createElement("label");a.textContent="Sort by",a.setAttribute("for",r);var n=document.createElement("select");n.id=r,n.addEventListener("change",this.applyFilters.bind(this)),n.innerHTML='<option value="">- None -</option>',e.forEach((function(t){var e;(e=document.createElement("option")).value="ASC:"+t.idx,e.textContent=t.header.textContent+" (A-Z)",n.appendChild(e),(e=document.createElement("option")).value="DESC:"+t.idx,e.textContent=t.header.textContent+" (Z-A)",n.appendChild(e)}));var i=document.createElement("div");i.classList.add("arr-filter","arr-filter--sort"),i.appendChild(a),i.appendChild(n),this.sortBy=n,this.ui.appendChild(i)}},{key:"addTextFilter",value:function(e){var r="arr"+t.lastId++,a=document.createElement("label");a.textContent=e.header.textContent,a.setAttribute("for",r);var n=document.createElement("input");n.type="text",n.id=r,n.addEventListener("input",this.applyFilters.bind(this));var i=document.createElement("div");i.classList.add("arr-filter","arr-filter--text"),i.appendChild(a),i.appendChild(n),e.filterMatches=function(t){return t.arData.indexOf(n.value.toLocaleLowerCase())>-1},this.ui.appendChild(i)}},{key:"addValuesFilter",value:function(e){var r="arr"+t.lastId++,a=document.createElement("label");a.textContent=e.header.textContent,a.setAttribute("for",r);var n,i=document.createElement("select");for(var o in i.id=r,i.addEventListener("change",this.applyFilters.bind(this)),i.innerHTML='<option value="">- Any -</option>',e.rowsByValue)e.rowsByValue.hasOwnProperty(o)&&((n=document.createElement("option")).value=o.toLocaleLowerCase(),n.textContent="".concat(o," (").concat(e.rowsByValue[o].length,")"),i.appendChild(n));var l=document.createElement("div");l.classList.add("arr-filter","arr-filter--values"),l.appendChild(a),l.appendChild(i),e.filterMatches=function(t){return""===i.value||t.arData==i.value},this.ui.appendChild(l)}},{key:"applyFilters",value:function(){var t=this,e=this.casts.filter((function(t){return"filterMatches"in t})),a=[];if(this.bodyTrs.forEach((function(r){var n=!0;e.forEach((function(t){var e=r.children[t.idx];e?n&=t.filterMatches(e):n=!1})),n?(r.style.display="",t.narrowVersion&&(r.arrCard.style.display=""),a.push(r)):(r.style.display="none",t.narrowVersion&&(r.arrCard.style.display="none"))})),"sortBy"in this){if(this.sortBy){var n=r(this.sortBy.value.split(":"),2),i=n[0],o=n[1];this.casts[o],a.sort((function(t,e){var r=t.children[o],a=e.children[o];return r||a?!r&&a?1:r&&!a?-1:r.arData<a.arData?"ASC"===i?-1:1:r.arData>a.arData?"ASC"===i?1:-1:0:0}))}if(a.length>0){var l=a[0].parentElement;a.forEach((function(e){l.appendChild(e),t.narrowVersion&&t.narrowVersion.appendChild(e.arrCard)}))}}}},{key:"handleResize",value:function(){var t=this.tableNode.parentElement.clientWidth,e=this.minWidth>t;e&&"normal"===this.layout?this.switchToNarrowLayout():e||"narrow"!==this.layout||this.switchToNormalLayout()}},{key:"switchToNarrowLayout",value:function(){this.narrowVersion||this.createNarrowVersion(),this.layout="narrow",this.tableNode.style.display="none",this.narrowVersion.style.display="block"}},{key:"switchToNormalLayout",value:function(){this.layout="normal",this.narrowVersion.style.display="none",this.tableNode.style.display="block"}},{key:"createNarrowVersion",value:function(){var t=this;if(0!==this.bodyTrs.length){this.narrowVersion=document.createElement("div"),this.narrowVersion.classList.add("arr-table");var e=this.headerCells;this.bodyTrs.forEach((function(r,a){var n=document.createElement("div");n.classList.add("arr-tr",a%2?"even":"odd");var i="";[].forEach.call(r.children,(function(t,r){t.innerHTML&&(i+='<div class="arr-th">'.concat(e[r].innerHTML,'</div><div class="arr-td">').concat(t.innerHTML,"</div>"))})),n.innerHTML=i,n.originalTr=r,r.arrCard=n,t.narrowVersion.appendChild(n)})),this.tableNode.insertAdjacentElement("afterend",this.narrowVersion),this.applyFilters()}else this.narrowVersion=this.tableNode}}])&&n(e.prototype,i),o&&n(e,o),t}();window.ARResponsiveTable=i,i.version="1.0",document.addEventListener("DOMContentLoaded",(function(t){[].forEach.call(document.querySelectorAll("table.ar-responsive"),(function(t,e,r){new i(t)}))}))},function(t,e){}]);