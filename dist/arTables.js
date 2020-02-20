/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/arTables.js":
/*!*************************!*\
  !*** ./src/arTables.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//  This file is part of arTables.
//
//  arTables is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  arTables is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with arTables.  If not, see <https://www.gnu.org/licenses/>.
var ARResponsiveTable =
/*#__PURE__*/
function () {
  function ARResponsiveTable(table) {
    _classCallCheck(this, ARResponsiveTable);

    this.tableNode = table;
    table.arTable = this;
    window.addEventListener('resize', this.handleResize.bind(this)); // Parse the table.

    this.firstHeaderRow = this.tableNode.querySelector('thead>tr');

    if (this.firstHeaderRow.length === 0) {
      this.firstHeaderRow = this.tableNode.querySelector('tr');
    }

    if (table.dataset && table.dataset.minWidth) {
      this.minWidth = table.dataset.minWidth;
    } else {
      // By default, require 100px per column.
      this.minWidth = this.firstHeaderRow.children.length * 100;
    }

    this.layout = 'normal'; // Identify body rows

    this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tbody tr'));

    if (this.bodyTrs.length === 0) {
      // Try without tbody.
      this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tr'));
      this.bodyTrs.shift();
    }

    this.handleResize();
  }

  _createClass(ARResponsiveTable, [{
    key: "handleResize",
    value: function handleResize() {
      var parentWidth = this.tableNode.parentElement.clientWidth; // Say a minimum of 100px per column.

      var needNarrowLayout = this.minWidth > parentWidth;

      if (needNarrowLayout && this.layout === 'normal') {
        this.switchToNarrowLayout();
      } else if (!needNarrowLayout && this.layout === 'narrow') {
        this.switchToNormalLayout();
      }
    }
  }, {
    key: "switchToNarrowLayout",
    value: function switchToNarrowLayout() {
      if (!this.narrowVersion) {
        this.createNarrowVersion();
      }

      this.layout = 'narrow';
      this.tableNode.style.display = 'none';
      this.narrowVersion.style.display = 'block';
    }
  }, {
    key: "switchToNormalLayout",
    value: function switchToNormalLayout() {
      this.layout = 'normal';
      this.narrowVersion.style.display = 'none';
      this.tableNode.style.display = 'block';
    }
  }, {
    key: "createNarrowVersion",
    value: function createNarrowVersion() {
      if (this.bodyTrs.length === 0) {
        // fail.
        this.narrowVersion = this.tableNode;
        return;
      }

      var html = ''; // Build array of headers

      var ths = [].slice.call(this.firstHeaderRow.children); // Loop body rows.

      this.bodyTrs.forEach(function (tr, trIndex) {
        html += "<div class=\"arr-tr ".concat(trIndex % 2 ? 'even' : 'odd', "\">");
        [].forEach.call(tr.children, function (el, i) {
          if (el.innerHTML) {
            html += "<div class=\"arr-th\">".concat(ths[i].innerHTML, "</div><div class=\"arr-td\">").concat(el.innerHTML, "</div>");
          }
        });
        html += '</div>';
      });
      this.narrowVersion = document.createElement('div');
      this.narrowVersion.classList.add('arr-table');
      this.narrowVersion.innerHTML = html;
      this.tableNode.insertAdjacentElement('afterend', this.narrowVersion);
    }
  }]);

  return ARResponsiveTable;
}();

window.ARResponsiveTable = ARResponsiveTable;
ARResponsiveTable.version = '1.0';
document.addEventListener('DOMContentLoaded', function (e) {
  [].forEach.call(document.querySelectorAll('table.ar-responsive'), function (el, index, array) {
    new ARResponsiveTable(el);
  });
});

/***/ }),

/***/ "./src/demo.scss":
/*!***********************!*\
  !*** ./src/demo.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/arTables.js ./src/demo.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/rich/arTables/src/arTables.js */"./src/arTables.js");
module.exports = __webpack_require__(/*! /home/rich/arTables/src/demo.scss */"./src/demo.scss");


/***/ })

/******/ });