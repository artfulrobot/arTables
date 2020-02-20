# Responsive tables.

## Build

Use one of:

```
npm run prod

npm run watch
```

Then use the `dist/arTables.js` file.

## Usage

Either add the `ar-responsive` class to your tables, or call
`new ARResponsiveTable(yourTableElement)`

Adding the `data-min-width=N` attribute to the table will set the minimum width
(in CSS pixels) required to maintain the original table. If the containing
element changes to be below this width it will trigger swapping to the narrow
version.

The HTML for the narrow version looks like this

```
div.arr-table
  div.arr-tr
    div.arr-th
    div.arr-td
    ... repeated pairs for all cells ...
  ... repeated for all rows ...

```

# Copyright, Licence, Author

Author: Rich Lott / Artful Robot forums@artfulrobot.uk

Copyright: 2020 Rich Lott / Artful Robot

Licence: GPL-3.0-or-later see COPYING

