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

class ARResponsiveTable {

  constructor(table) {
    this.tableNode = table;
    table.arTable = this;
    window.addEventListener('resize', this.handleResize.bind(this));

    // Parse the table.
    this.firstHeaderRow = this.tableNode.querySelector('thead>tr');
    if (this.firstHeaderRow.length === 0) {
      this.firstHeaderRow = this.tableNode.querySelector('tr');
    }
    if (table.dataset && table.dataset.minWidth) {
      this.minWidth = table.dataset.minWidth;
    }
    else {
      // By default, require 100px per column.
      this.minWidth = this.firstHeaderRow.children.length * 100;
    }

    this.layout = 'normal';

    // Identify body rows
    this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tbody tr'));
    if (this.bodyTrs.length === 0) {
      // Try without tbody.
      this.bodyTrs = [].slice.call(this.tableNode.querySelectorAll('tr'));
      this.bodyTrs.shift();
    }

    this.handleResize();
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

    var html = '';

    // Build array of headers
    var ths = [].slice.call(this.firstHeaderRow.children);

    // Loop body rows.
    this.bodyTrs.forEach((tr, trIndex) => {
      html += `<div class="arr-tr ${(trIndex % 2) ? 'even' : 'odd'}">`;
        [].forEach.call(tr.children, (el, i) => {
          if (el.innerHTML) {
            html += `<div class="arr-th">${ths[i].innerHTML}</div><div class="arr-td">${el.innerHTML}</div>`;
          }
        })
      html += '</div>';
    });

    this.narrowVersion = document.createElement('div');
    this.narrowVersion.classList.add('arr-table');
    this.narrowVersion.innerHTML = html;
    this.tableNode.insertAdjacentElement('afterend', this.narrowVersion);
  }

}
window.ARResponsiveTable = ARResponsiveTable;
ARResponsiveTable.version = '1.0';

document.addEventListener('DOMContentLoaded', e => {
  [].forEach.call(document.querySelectorAll('table.ar-responsive'), (el, index, array) => {
    new ARResponsiveTable(el);
  });
});
