# Responsive tables.

Make normal (and simple) HTML tables responsive, filterable and sortable.
8kB library. See the [demo](https://artfulrobot.uk/lil/arTables/).

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

### Filters and sorts

To use either a filter or a sort you must apply `data-cast="<casttype>"`
to the `<th>` cell for that column, where `<casttype>` is one of: `text`,
`number`, `date`.

Filters are available by adding `data-filter="<filtertype>"` where
`<filtertype>` is one of:

- `text` Free text search (substring, case independent)

- `values` Drop-down (select) element from unique possibilities, shows
  count.

- `range` Not implemented yet.

To make a column sortable simply add `data-sortable=""` to the `<th>`.

The filters UI looks like this:

```
div.arr-filters
  div.arr-filter.arr-filter--<casttype>
  ...
```

Where `<casttype>` is as above, or `sort` for the sort by select.

# Changelog

- v1.0.1 When creating select options, ignore whitespace in text data and
  sort.

- v1.0.0 Initial release

## Copyright, Licence, Author

Author: Rich Lott / Artful Robot forums@artfulrobot.uk

Copyright: 2020 Rich Lott / Artful Robot

Licence: GPL-3.0-or-later see COPYING

