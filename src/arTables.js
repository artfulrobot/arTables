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
//  along with arTables. If not, see <https://www.gnu.org/licenses/>.

class ARResponsiveTable {

  constructor(table) {
    this.supportedAggregates = [
      {name: 'count', label: 'Count' },
      {name: 'sum',   label: 'Total' },
      {name: 'min',   label: 'Min' },
      {name: 'max',   label: 'Max' },
      {name: 'avg',   label: 'Average' },
    ];
    if (table.arTable) {
      // Already initialised.
      return;
    }
    if (typeof ARResponsiveTable.lastId === 'undefined') {
      ARResponsiveTable.lastId = 1;
    }
    table.arTable = this;
    this.tableNode = table;
    this.showingFiltered = false;
    window.addEventListener('resize', this.handleResize.bind(this));

    // Parse the table.
    var tr = this.tableNode.querySelector('thead>tr');
    var tookHeadersFromBody = false;
    if (tr.length === 0) {
      tookHeadersFromBody = true;
      // Failed finding a tr inside a thead, just take first tr.
      tr = this.tableNode.querySelector('tr');
    }
    // Build array of headers
    this.headerCells = [].slice.call(tr.children);

    if (table.dataset && table.dataset.minWidth) {
      this.minWidth = table.dataset.minWidth;
    }
    else {
      // By default, require 100px per column.
      this.minWidth = this.headerCells.length * 100;
    }

    this.layout = 'normal';

    // Identify body rows
    this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tbody tr'));
    if (this.bodyTrs.length === 0) {
      // Try without tbody.
      this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tr'));
    }
    if (tookHeadersFromBody && this.bodyTrs.length > 0) {
      this.bodyTrs.shift();
    }

    this.parseTableData();
    this.addAggregateRows();
    this.calculateAggregates();
    this.handleResize();
    this.createFilterUi();
  }

  calculateAggregates() {
    // Loop every column for which we have a cast.
    this.casts.forEach(cast => {

      // Reset
      if ('count' in cast.aggregates) {
        cast.aggregates.count.all = 0;
        cast.aggregates.count.filtered = 0;
      }
      if ('sum' in cast.aggregates) {
        cast.aggregates.sum.all = 0;
        cast.aggregates.sum.filtered = 0;
      }
      if ('min' in cast.aggregates) {
        cast.aggregates.min.all = 0;
        cast.aggregates.min.filtered = 0;
      }
      if ('max' in cast.aggregates) {
        cast.aggregates.max.all = 0;
        cast.aggregates.max.filtered = 0;
      }

      // Loop each row in this column.
      this.bodyTrs.forEach((tr, trIndex) => {
        // Get reference to the cell we're working on in this row and column.
        const cell = tr.children[cast.idx];
        if ('count' in cast.aggregates) {
          cast.aggregates.count.all += 1;
          if (tr.arFiltered) {
            cast.aggregates.count.filtered += 1;
          }
        }
        if (cast.type === 'number') {
          if ('sum' in cast.aggregates) {
            cast.aggregates.sum.all += cell.arData;
            if (tr.arFiltered) {
              cast.aggregates.sum.filtered += cell.arData;
            }
          }
          if ('min' in cast.aggregates) {
            if (cast.aggregates.min.all === null || cast.aggregates.min.all < cell.arData) {
              cast.aggregates.min.all = cell.arData;
            }
            if (tr.arFiltered) {
              if (cast.aggregates.min.filtered === null || cast.aggregates.min.filtered < cell.arData) {
                cast.aggregates.min.filtered = cell.arData;
              }
            }
          }
          if ('max' in cast.aggregates) {
            if (cast.aggregates.max.all === null || cast.aggregates.max.all > cell.arData) {
              cast.aggregates.max.all = cell.arData;
            }
            if (tr.arFiltered) {
              if (cast.aggregates.max.filtered === null || cast.aggregates.max.filtered > cell.arData) {
                cast.aggregates.max.filtered = cell.arData;
              }
            }
          }
        }
      });
      // We've processed every row, so we can work out averages now.
      if (cast.type === 'number' && 'avg' in cast.aggregates) {
        cast.aggregates.avg.all = cast.aggregates.sum.all / cast.aggregates.count.all;
        cast.aggregates.avg.filtered = cast.aggregates.sum.filtered / cast.aggregates.count.filtered;
      }

      // And now update our aggregate cells.
      ['count', 'sum'].forEach(agName => {
        if (agName in cast.aggregates) {
          const ag = cast.aggregates[agName];
          ag.cell.textContent = this.showingFiltered
            ? ag.filtered + '/' + ag.all + ' (' + Math.round(ag.filtered * 100 / ag.all)  + '%)'
            : ag.all;
          if (ag.arCell) {
            ag.arCell.textContent = ag.cell.textContent;
          }
        }
      });
      ['min', 'max', 'avg'].forEach(agName => {
        if (agName in cast.aggregates) {
          const ag = cast.aggregates[agName];
          ag.cell.textContent = this.showingFiltered
            ? ag.filtered
            : ag.all;
          if (ag.arCell) {
            ag.arCell.textContent = ag.cell.textContent;
          }
          else {
            console.warn("not updating cell", ag);
          }
        }
      });

    });
  }

  addAggregateRows() {
    const tbody = this.tableNode.querySelector('tbody');
    this.supportedAggregates.forEach(ag => {
      if (ag.name in this.aggregateFunctions) {

        // Create a row for this.
        const agTr = document.createElement('tr');
        agTr.classList.add('aggregate', ag.name);
        const agTdTitle = document.createElement('td');
        agTdTitle.textContent = ag.label;
        agTr.append(agTdTitle);

        // Now add the aggregates.
        this.headerCells.slice(1).forEach((cell, idx) => {
          const agTd = document.createElement('td');
          if (cell.cast) {
            // Does this header use this aggregate?
            if (ag.name in cell.cast.aggregates) {
              cell.cast.aggregates[ag.name].cell = agTd;
              //agTd.textContent = ag.accessor(cell.cast);
            }
          }
          agTr.appendChild(agTd);
        });
        tbody.appendChild(agTr);
      }
    });
  }

  parseTableData() {
    if (this.bodyTrs.length === 0 || this.headerCells.length === 0) {
      return;
    }

    // Scan headers for any that have casts.
    this.casts = [];
    this.indexes = {};
    this.aggregateFunctions = {};
    this.headerCells.forEach((cell, idx) => {
      if (typeof cell.dataset.cast !== 'string') {
        return;
      }
      // Define a cast object.
      // The cast object knows which header cell defined it,
      // the index of the cell in the row, the type of cast (e.g. text|number|date)
      const c = { header: cell, idx, type: cell.dataset.cast };
      if (cell.dataset.filter === 'values') {
        // We need unique values for this
        c.rowsByValue = {};
      }
      c.sortable = (cell.dataset.sortable !== undefined);
      c.aggregates = {};

      if (cell.dataset.aggregates) {
        // Aggregates needed.
        cell.dataset.aggregates.split(/\s*,\s*/).forEach( aggregateFunction => {
          if (!aggregateFunction.match(/^(sum|count|avg|min|max)$/)) {
            console.warn("arTables: invalid aggregate function", { aggregateFunction, cast, cell });
            return;
          }
          // Keep track of all the functions in use; this will determine what
          // rows we need to append.
          this.aggregateFunctions[aggregateFunction] = true;

          // Create a property on our cast so we can easily see whether there
          // will be a value for this.
          c.aggregates[aggregateFunction] = {};
        });
      }

      this.casts.push(c);
      // Store reference to cast on the header cell, too.
      cell.cast = c;
      //console.log("complete cast", c);
    });

    // @todo
    const fullText = this.tableNode.dataset.filter === 'text';

    if (this.casts.length === 0) {
      return;
    }

    // We have some casts, parse the data.
    // Once the data has been cast, it is stored in a property on the table cell DOM node called arData.
    this.bodyTrs.forEach(tr => {

      // i.e. foreach column with a filter, sort or aggregate...
      this.casts.forEach(cast => {
        // Get reference to the cell we're working on in this row and column.
        const cell = tr.children[cast.idx];

        // Parse/cast the text data
        if (cell === undefined) {
          return;
        }
        if (cast.type === 'date') {
          cell.arData = new Date(cell.textContent);
        }
        else if (cast.type === 'number') {
          cell.arData = parseFloat(cell.textContent);
        }
        else {
          // We need to store a unique (i.e. trimmed, lower case if necessary) list,
          // But for presentation we need the (first) original trimmed but not lower case version.
          //
          // Trim whitespace
          var trimmed = cell.textContent.replace(/^\s*(.*?)\s*$/, '$1');
          // Turn it lower case now for quicker searching, if using text search.
          if (cast.type === 'text') {
            cell.arData = trimmed.toLocaleLowerCase();
          }
          else {
            cell.arData = trimmed;
          }
        }

        // Do we need to index by value for this cast?
        // If so, update the *cast's* rowsByValue object using the cast data as the key, and storing an object with {label, rows} where rows is an array of matching rows.
        if ('rowsByValue' in cast) {
          if (!(cell.arData in cast.rowsByValue)) {
            cast.rowsByValue[cell.arData] = {
              rows: [],
              label: trimmed,
            };
          }
          cast.rowsByValue[cell.arData].rows.push(tr);
        }

      });
    });

  }

  createFilterUi() {

    this.ui = document.createElement('div');
    this.ui.classList.add('arr-filters');

    var sorts = [];
    this.casts.forEach(cast => {
      if (cast.header.dataset.filter === 'text') {
        this.addTextFilter(cast);
      }
      else if (cast.header.dataset.filter === 'values') {
        this.addValuesFilter(cast);
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

  addSortOptions(sorts) {
    const id = 'arr' + (ARResponsiveTable.lastId++);

    // Label
    const l = document.createElement('label');
    l.textContent = 'Sort by';
    l.setAttribute('for', id);

    // Select
    const s = document.createElement('select');
    s.id = id;
    s.addEventListener('change', this.applyFilters.bind(this));
    s.innerHTML = '<option value="">- None -</option>';

    sorts.forEach(cast => {
      var o;
      o = document.createElement('option');
      o.value = 'ASC:' + cast.idx;
      o.textContent = cast.header.textContent + ' (A-Z)';
      s.appendChild(o);

      o = document.createElement('option');
      o.value = 'DESC:' + cast.idx;
      o.textContent =  cast.header.textContent + ' (Z-A)';
      s.appendChild(o);
    });

    const d = document.createElement('div');
    d.classList.add('arr-filter', 'arr-filter--sort');
    d.appendChild(l);
    d.appendChild(s);

    this.sortBy = s;

    this.ui.appendChild(d);
  }

  addTextFilter(cast) {
    const id = 'arr' + (ARResponsiveTable.lastId++);

    // Label
    const l = document.createElement('label');
    l.textContent = cast.header.textContent;
    l.setAttribute('for', id);

    // Input
    const i = document.createElement('input');
    i.type = 'text';
    i.id = id;
    i.addEventListener('input', this.applyFilters.bind(this));

    const d = document.createElement('div');
    d.classList.add('arr-filter', 'arr-filter--text');
    d.appendChild(l);
    d.appendChild(i);

    cast.filterMatches = (el) => {
      return el.arData.indexOf(i.value.toLocaleLowerCase()) > -1;
    };

    this.ui.appendChild(d);
  }

  addValuesFilter(cast) {
    const id = 'arr' + (ARResponsiveTable.lastId++);

    // Label
    const l = document.createElement('label');
    l.textContent = cast.header.textContent;
    l.setAttribute('for', id);

    // Select
    const s = document.createElement('select');
    s.id = id;
    s.addEventListener('change', this.applyFilters.bind(this));

    s.innerHTML = '<option value="">- Any -</option>';
    var o;
    // The keys of rowsByValue are trimmed and lower cased.
    // However, we have no guarantee they're in alpha order, so we sort those now.
    var sorted = [];
    for (var v in cast.rowsByValue) {
      if (cast.rowsByValue.hasOwnProperty(v)) {
        sorted.push({key: v, label:  `${cast.rowsByValue[v].label} (${cast.rowsByValue[v].rows.length})`});
      }
    }
    sorted.sort((a, b) => (a.key < b.key) ? -1 : (a.key > b.key) ? 1 : 0);
    sorted.forEach(i => {
        o = document.createElement('option');
        o.value = i.key;
        o.textContent = i.label;
        s.appendChild(o);
    });

    const d = document.createElement('div');
    d.classList.add('arr-filter', 'arr-filter--values');
    d.appendChild(l);
    d.appendChild(s);

    cast.filterMatches = (el) => {
      return s.value === '' || el.arData == s.value;
    };

    this.ui.appendChild(d);
  }

  applyFilters() {

    var filters = this.casts.filter(cast => ('filterMatches' in cast));

    // Make a copy of all matching Trs, it will make sorting faster.
    var matchingTrs = [];

    // Nb. bodyTrs is all the rows before we added aggregates.
    this.bodyTrs.forEach(tr => {

      var match = true;

      filters.forEach(cast => {
        const cell = tr.children[cast.idx];
        if (!cell) {
          match = false;
        }
        else {
          match &= cast.filterMatches(cell);
        }
      });

      if (match) {
        // This row matches, remove the style that hid it.
        tr.arFiltered = true;
        tr.style.display = '';
        if (this.narrowVersion) {
          tr.arrCard.style.display = '';
        }
        matchingTrs.push(tr);
      }
      else {
        tr.arFiltered = false;
        // This row does not match, add style to hide it.
        tr.style.display = 'none';
        if (this.narrowVersion) {
          tr.arrCard.style.display = 'none';
        }
      }
    });

    this.showingFiltered = (matchingTrs.length < this.bodyTrs.length);

    // Apply sort.
    if ('sortBy' in this) {
      // We have to sort.
      if (this.sortBy) {
        var [ direction, idx ] = this.sortBy.value.split(':');
        var cast = this.casts[idx];

        // Nb. we sort backwards(!) because we insert the matches into the
        // table using prepend (this is so the aggregate rows stay at the
        // bottom)
        matchingTrs.sort((b, a) => {
          var cellA = a.children[idx];
          var cellB = b.children[idx];
          // First on cell existence.
          if (!cellA && !cellB) { return 0; }
          if (!cellA && cellB) { return 1; }
          if (cellA && !cellB) { return -1; }

          // Now we have both cells, do the real sort.
          if (cellA.arData < cellB.arData) {
            return (direction === 'ASC') ? -1 : 1;
          }
          if (cellA.arData > cellB.arData) {
            return (direction === 'ASC') ? 1 : -1;
          }
          return 0;
        });
      }

      // Sort the things.
      if (matchingTrs.length > 0) {
        const tbody = matchingTrs[0].parentElement;
        matchingTrs.forEach(tr => {
          tbody.insertAdjacentElement('afterbegin', tr);
          if (this.narrowVersion) {
            this.narrowVersion.insertAdjacentElement('afterbegin', tr.arrCard);
          }
        });
      }
    }

    this.calculateAggregates();
  }

  handleResize() {
    const parentWidth = this.tableNode.parentElement.clientWidth;
    // Say a minimum of 100px per column.
    const needNarrowLayout = (this.minWidth > parentWidth);
    if (needNarrowLayout && this.layout === 'normal') {
      this.switchToNarrowLayout();
    }
    else if (!needNarrowLayout && this.layout === 'narrow') {
      this.switchToNormalLayout();
    }
  }

  switchToNarrowLayout() {
    if (!this.narrowVersion) {
      this.createNarrowVersion();
    }
    this.layout = 'narrow';
    this.tableNode.style.display = 'none';
    this.narrowVersion.style.display = 'block';
  }

  switchToNormalLayout() {
    this.layout = 'normal';
    this.narrowVersion.style.display = 'none';
    this.tableNode.style.display = 'block';
  }

  createNarrowVersion() {
    if (this.bodyTrs.length === 0) {
      // fail.
      this.narrowVersion = this.tableNode;
      return;
    }

    this.narrowVersion = document.createElement('div');
    this.narrowVersion.classList.add('arr-table');

    const ths = this.headerCells;
    // Loop body rows.
    this.bodyTrs.forEach((tr, trIndex) => {
      const arrTr = document.createElement('div');
      arrTr.classList.add('arr-tr', (trIndex % 2) ? 'even' : 'odd');

      var html = '';
      [].forEach.call(tr.children, (el, i) => {
        if (el.innerHTML) {
          html += `<div class="arr-th">${ths[i].innerHTML}</div><div class="arr-td">${el.innerHTML}</div>`;
        }
      });
      arrTr.innerHTML = html;
      arrTr.originalTr = tr;
      tr.arrCard = arrTr;

      this.narrowVersion.appendChild(arrTr);
    });
    // Aggregate row.
    const agDiv = document.createElement('div');
    agDiv.classList.add('aggregate', 'arr-tr');

    this.casts.forEach(cast => {
      this.supportedAggregates.forEach(ag => {
        if (ag.name in cast.aggregates) {
          const h = document.createElement('div');
          h.classList.add('arr-th');
          h.textContent = cast.header.textContent + ' ' + ag.label;
          agDiv.appendChild(h);

          const agValue = document.createElement('div')
          agValue.classList.add('arr-td');
          // Copy existing cell's data (we are always called after calculateAggregates)
          agValue.textContent = cast.aggregates[ag.name].cell.textContent;
          agDiv.appendChild(agValue);
          // Keep a ref for easy updating.
          cast.aggregates[ag.name].arCell = agValue;
        }
      });
    });
    if (agDiv.children.length > 0) {
      this.narrowVersion.appendChild(agDiv);
    }

    this.tableNode.insertAdjacentElement('afterend', this.narrowVersion);

    this.applyFilters();
  }

}
window.ARResponsiveTable = ARResponsiveTable;
ARResponsiveTable.version = '1.0';

document.addEventListener('DOMContentLoaded', e => {
  [].forEach.call(document.querySelectorAll('table.ar-responsive'), (el, index, array) => {
    new ARResponsiveTable(el);
  });
});
