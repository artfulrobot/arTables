!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=0)}([function(e,t,r){r(1),e.exports=r(2)},function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var n=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tableNode=t,t.arTable=this,window.addEventListener("resize",this.handleResize.bind(this)),this.firstHeaderRow=this.tableNode.querySelector("thead>tr"),0===this.firstHeaderRow.length&&(this.firstHeaderRow=this.tableNode.querySelector("tr")),t.dataset&&t.dataset.minWidth?this.minWidth=t.dataset.minWidth:this.minWidth=100*this.firstHeaderRow.children.length,this.layout="normal",this.bodyTrs=[].slice.call(this.tableNode.querySelectorAll("tbody tr")),0===this.bodyTrs.length&&(this.bodyTrs=[].slice.call(this.tableNode.querySelectorAll("tr")),this.bodyTrs.shift()),this.handleResize()}var t,n,i;return t=e,(n=[{key:"handleResize",value:function(){var e=this.tableNode.parentElement.clientWidth,t=this.minWidth>e;t&&"normal"===this.layout?this.switchToNarrowLayout():t||"narrow"!==this.layout||this.switchToNormalLayout()}},{key:"switchToNarrowLayout",value:function(){this.narrowVersion||this.createNarrowVersion(),this.layout="narrow",this.tableNode.style.display="none",this.narrowVersion.style.display="block"}},{key:"switchToNormalLayout",value:function(){this.layout="normal",this.narrowVersion.style.display="none",this.tableNode.style.display="block"}},{key:"createNarrowVersion",value:function(){if(0!==this.bodyTrs.length){var e="",t=[].slice.call(this.firstHeaderRow.children);this.bodyTrs.forEach((function(r,n){e+='<div class="arr-tr '.concat(n%2?"even":"odd",'">'),[].forEach.call(r.children,(function(r,n){r.innerHTML&&(e+='<div class="arr-th">'.concat(t[n].innerHTML,'</div><div class="arr-td">').concat(r.innerHTML,"</div>"))})),e+="</div>"})),this.narrowVersion=document.createElement("div"),this.narrowVersion.classList.add("arr-table"),this.narrowVersion.innerHTML=e,this.tableNode.insertAdjacentElement("afterend",this.narrowVersion)}else this.narrowVersion=this.tableNode}}])&&r(t.prototype,n),i&&r(t,i),e}();window.ARResponsiveTable=n,n.version="1.0",document.addEventListener("DOMContentLoaded",(function(e){[].forEach.call(document.querySelectorAll("table.ar-responsive"),(function(e,t,r){new n(e)}))}))},function(e,t){}]);