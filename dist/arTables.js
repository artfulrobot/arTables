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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

    if (table.arTable) {
      // Already initialised.
      return;
    }

    if (typeof ARResponsiveTable.lastId === 'undefined') {
      console.log("setting lastId");
      ARResponsiveTable.lastId = 1;
    }

    console.log(_typeof(ARResponsiveTable.lastId));
    table.arTable = this;
    this.tableNode = table;
    window.addEventListener('resize', this.handleResize.bind(this)); // Parse the table.

    var tr = this.tableNode.querySelector('thead>tr');
    var tookHeadersFromBody = false;

    if (tr.length === 0) {
      tookHeadersFromBody = true; // Failed finding a tr inside a thead, just take first tr.

      tr = this.tableNode.querySelector('tr');
    } // Build array of headers


    this.headerCells = [].slice.call(tr.children);

    if (table.dataset && table.dataset.minWidth) {
      this.minWidth = table.dataset.minWidth;
    } else {
      // By default, require 100px per column.
      this.minWidth = this.headerCells.length * 100;
    }

    this.layout = 'normal'; // Identify body rows

    this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tbody tr'));

    if (this.bodyTrs.length === 0) {
      // Try without tbody.
      this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tr'));
    }

    if (tookHeadersFromBody && this.bodyTrs.length > 0) {
      this.bodyTrs.shift();
    }

    this.parseTableData();
    this.handleResize();
    this.createFilterUi();
  }

  _createClass(ARResponsiveTable, [{
    key: "parseTableData",
    value: function parseTableData() {
      var _this = this;

      if (this.bodyTrs.length === 0 || this.headerCells.length === 0) {
        return;
      } // Scan headers for any that have casts.


      this.casts = [];
      this.indexes = {};
      this.headerCells.forEach(function (cell, idx) {
        if (typeof cell.dataset.cast !== 'string') {
          return;
        }

        var c = {
          header: cell,
          idx: idx,
          type: cell.dataset.cast
        };

        if (cell.dataset.filter === 'values') {
          // We need unique values for this
          c.rowsByValue = {};
        }

        c.sortable = cell.dataset.sortable !== undefined;

        _this.casts.push(c);
      }); // @todo

      var fullText = this.tableNode.dataset.filter === 'text';

      if (this.casts.length === 0) {
        return;
      } // We have some casts, parse the data.


      this.bodyTrs.forEach(function (tr) {
        _this.casts.forEach(function (cast) {
          var cell = tr.children[cast.idx];

          if (cell === undefined) {
            return;
          }

          if (cast.type === 'date') {
            cell.arData = new Date(cell.textContent);
          } else if (cast.type === 'number') {
            cell.arData = parseFloat(cell.textContent);
          } else {
            // Turn it lower case now for quicker searching, if using text search.
            if (cast.type === 'text') {
              cell.arData = cell.textContent.toLocaleLowerCase();
            } else {
              cell.arData = cell.textContent;
            }
          } // Do we need to index by value?


          if ('rowsByValue' in cast) {
            if (!(cell.arData in cast.rowsByValue)) {
              cast.rowsByValue[cell.textContent] = [tr];
            } else {
              cast.rowsByValue[cell.textContent].push(tr);
            }
          }
        });
      });
      console.log(this);
    }
  }, {
    key: "createFilterUi",
    value: function createFilterUi() {
      var _this2 = this;

      this.ui = document.createElement('div');
      this.ui.classList.add('arr-filters');
      var sorts = [];
      this.casts.forEach(function (cast) {
        if (cast.header.dataset.filter === 'text') {
          _this2.addTextFilter(cast);
        } else if (cast.header.dataset.filter === 'values') {
          _this2.addValuesFilter(cast);
        }

        if (cast.sortable) {
          sorts.push(cast);
        }
      });

      if (sorts) {
        this.addSortOptions(sorts);
      }

      this.tableNode.insertAdjacentElement('beforebegin', this.ui);
    }
  }, {
    key: "addSortOptions",
    value: function addSortOptions(sorts) {
      var id = 'arr' + ARResponsiveTable.lastId++; // Label

      var l = document.createElement('label');
      l.textContent = 'Sort by';
      l.setAttribute('for', id); // Select

      var s = document.createElement('select');
      s.id = id;
      s.addEventListener('change', this.applyFilters.bind(this));
      s.innerHTML = '<option value="">- None -</option>';
      sorts.forEach(function (cast) {
        var o;
        o = document.createElement('option');
        o.value = 'ASC:' + cast.idx;
        o.textContent = cast.header.textContent + ' (A-Z)';
        s.appendChild(o);
        o = document.createElement('option');
        o.value = 'DESC:' + cast.idx;
        o.textContent = cast.header.textContent + ' (Z-A)';
        s.appendChild(o);
      });
      var d = document.createElement('div');
      d.classList.add('arr-filter', 'arr-filter--sort');
      d.appendChild(l);
      d.appendChild(s);
      this.sortBy = s;
      this.ui.appendChild(d);
    }
  }, {
    key: "addTextFilter",
    value: function addTextFilter(cast) {
      var id = 'arr' + ARResponsiveTable.lastId++; // Label

      var l = document.createElement('label');
      l.textContent = cast.header.textContent;
      l.setAttribute('for', id); // Input

      var i = document.createElement('input');
      i.type = 'text';
      i.id = id;
      i.addEventListener('input', this.applyFilters.bind(this));
      var d = document.createElement('div');
      d.classList.add('arr-filter', 'arr-filter--text');
      d.appendChild(l);
      d.appendChild(i);

      cast.filterMatches = function (el) {
        return el.arData.indexOf(i.value.toLocaleLowerCase()) > -1;
      };

      this.ui.appendChild(d);
    }
  }, {
    key: "addValuesFilter",
    value: function addValuesFilter(cast) {
      var id = 'arr' + ARResponsiveTable.lastId++; // Label

      var l = document.createElement('label');
      l.textContent = cast.header.textContent;
      l.setAttribute('for', id); // Select

      var s = document.createElement('select');
      s.id = id;
      s.addEventListener('change', this.applyFilters.bind(this));
      s.innerHTML = '<option value="">- Any -</option>';
      var o;

      for (var v in cast.rowsByValue) {
        if (cast.rowsByValue.hasOwnProperty(v)) {
          o = document.createElement('option');
          o.value = v.toLocaleLowerCase();
          o.textContent = "".concat(v, " (").concat(cast.rowsByValue[v].length, ")");
          s.appendChild(o);
        }
      }

      var d = document.createElement('div');
      d.classList.add('arr-filter', 'arr-filter--values');
      d.appendChild(l);
      d.appendChild(s);

      cast.filterMatches = function (el) {
        return s.value === '' || el.arData == s.value;
      };

      this.ui.appendChild(d);
    }
  }, {
    key: "applyFilters",
    value: function applyFilters() {
      var _this3 = this;

      var filters = this.casts.filter(function (cast) {
        return 'filterMatches' in cast;
      }); // Make a copy of all matching Trs, it will make sorting faster.

      var matchingTrs = [];
      this.bodyTrs.forEach(function (tr) {
        var match = true;
        filters.forEach(function (cast) {
          var cell = tr.children[cast.idx];

          if (!cell) {
            match = false;
          } else {
            match &= cast.filterMatches(cell);
          }
        });

        if (match) {
          tr.style.display = '';

          if (_this3.narrowVersion) {
            tr.arrCard.style.display = '';
          }

          matchingTrs.push(tr);
        } else {
          tr.style.display = 'none';

          if (_this3.narrowVersion) {
            tr.arrCard.style.display = 'none';
          }
        }
      }); // Apply sort.

      if ('sortBy' in this) {
        // We have to sort.
        if (this.sortBy) {
          var _this$sortBy$value$sp = this.sortBy.value.split(':'),
              _this$sortBy$value$sp2 = _slicedToArray(_this$sortBy$value$sp, 2),
              direction = _this$sortBy$value$sp2[0],
              idx = _this$sortBy$value$sp2[1];

          var cast = this.casts[idx];
          matchingTrs.sort(function (a, b) {
            var cellA = a.children[idx];
            var cellB = b.children[idx]; // First on cell existence.

            if (!cellA && !cellB) {
              return 0;
            }

            if (!cellA && cellB) {
              return 1;
            }

            if (cellA && !cellB) {
              return -1;
            } // Now we have both cells, do the real sort.


            if (cellA.arData < cellB.arData) {
              return direction === 'ASC' ? -1 : 1;
            }

            if (cellA.arData > cellB.arData) {
              return direction === 'ASC' ? 1 : -1;
            }

            return 0;
          });
        } // Sort the things.


        if (matchingTrs.length > 0) {
          var tbody = matchingTrs[0].parentElement;
          matchingTrs.forEach(function (tr) {
            tbody.appendChild(tr);

            if (_this3.narrowVersion) {
              _this3.narrowVersion.appendChild(tr.arrCard);
            }
          });
        }
      }
    }
  }, {
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
      var _this4 = this;

      if (this.bodyTrs.length === 0) {
        // fail.
        this.narrowVersion = this.tableNode;
        return;
      }

      this.narrowVersion = document.createElement('div');
      this.narrowVersion.classList.add('arr-table');
      var ths = this.headerCells; // Loop body rows.

      this.bodyTrs.forEach(function (tr, trIndex) {
        var arrTr = document.createElement('div');
        arrTr.classList.add('arr-tr', trIndex % 2 ? 'even' : 'odd');
        var html = '';
        [].forEach.call(tr.children, function (el, i) {
          if (el.innerHTML) {
            html += "<div class=\"arr-th\">".concat(ths[i].innerHTML, "</div><div class=\"arr-td\">").concat(el.innerHTML, "</div>");
          }
        });
        arrTr.innerHTML = html;
        arrTr.originalTr = tr;
        tr.arrCard = arrTr;

        _this4.narrowVersion.appendChild(arrTr);
      });
      this.tableNode.insertAdjacentElement('afterend', this.narrowVersion);
      this.applyFilters();
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