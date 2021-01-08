# Responsive tables.

Make normal (and simple) HTML tables responsive, filterable and sortable.
8kB library.

See the [demo](https://artfulrobot.uk/lil/arTables/).

## Tutorial

### Tutorial: Install

Copy the the `dist/arTables.js` file to your website. Make whatever edits
are necessary to load that file for the pages you want to use it on. You
could, for example, put it before the closing `</body>` tag in a page
template.

### Tutorial: Usage

- Create a table in the normal way you would. For this tutorial I'm going
  to make one with headers: Name, Favourite colour, Hobbies. My rows will
  include

   - Barney, Yellow, knitting.
   - Wilma, Green, rolling rocks down hills.
   - Betty, Yellow, eating dinosaurs

- You do need to make sure that the table is properly formed, with
  a single row of header cells at the top. (Header cells are like `<th>`
  instead of `<td>`)

- You'll need to be able to edit the raw HTML of your page, so if you use
  a point-and-click/WYSIWYG editor, look for an option to disable it, or
  it may have a button allowing you to edit source. When you've got to the
  HTML, continue.

- In HTML, text in `<angle-brackets>` are called *elements*. Within those
  brackets there might also be *attributes*, e.g. `<p class="food">` would
  be a `p` element (it means *paragraph*) and `class` is an *attribute*
  whose value is `food`.

- We need to activate arTables for this table. To do this, look for the
  `<table>` element, and add the `ar-responsive` class as
  follows.

   - If there is already a `class` attribute, add the new class in after
     a space. e.g.  
     Original: `<table class="some things" ...>`  
     New: `<table class="some things ar-responsive" ...>`

   - If there was NOT already a `class` attribute, just add one, e.g.  
     Original: `<table ...>`  
     New: `<table class="ar-responsive" ...>`

You can save your page and see if it's working - make your browser window
skinny to see how the table responds.

Let’s now add some filters to our table, on Colour and Hobbies, and make the
name and colour columns sortable. It makes sense to have a drop-down list for
colours, whereas for hobbies we just want to search the text.

- Find each header cell (`<th>`) and add the attribute
  `data-cast="text"` which tells arTables to treat the contents as text. This
  is required for any columns that you want to either sort or filter on. e.g.
  `<th data-cast="text">`.

- Find the name header cell and add `data-sortable=""`

- Find the colour header cell and add the drop down filter by adding another attribute: `data-filter="values"` and to make it sortable, add `data-sortable=""`.

- Find the hobbies header cell again and add a text filter by adding another attribute: `data-filter="text"`.


- Your HTML might now look something like:

   ```
   <table class="ar-responsive">
     <thead>
       <tr>
          <th data-sortable="">Name</th>
          <th data-cast="text" data-sortable="">Name</th>
          <th data-cast="text" data-sortable="" data-filter="values">Favourite Colour</th>
          <th data-cast="text" data-filter="text">Hobbies</th>
        </tr>
      </thead>
      ...
   ```

Save your page and check out your fancy new table!

You may find the [demo page](https://artfulrobot.uk/lil/arTables/) helpful. You can use your browser's View Source option on that demo page to see the table (or take a look at it on [github](https://github.com/artfulrobot/arTables/blob/master/src/index.html))



## Reference: Usage

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

### Reference: Filters and sorts

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

## Reference: Changelog

- v1.0.1 When creating select options, ignore whitespace in text data and
  sort.

- v1.0.0 Initial release

## Reference: Copyright, Licence, Author

Author: Rich Lott / Artful Robot forums@artfulrobot.uk

Copyright: 2020 Rich Lott / Artful Robot

Licence: GPL-3.0-or-later see COPYING

## How-to build (for developers)

Use one of:

```
npm run prod

npm run watch
```

Then use the `dist/arTables.js` file.

