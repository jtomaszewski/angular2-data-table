"use strict";
var types_1 = require('../types');
var TableOptions = (function () {
    function TableOptions(props) {
        // Columns
        this.columns = [];
        // Enable vertical scrollbars
        this.scrollbarV = false;
        // Enable horz scrollbars
        this.scrollbarH = false;
        // The row height; which is necessary
        // to calculate the height for the lazy rendering.
        this.rowHeight = 30;
        // This will be used when displaying or selecting rows:
        // when tracking/comparing them, we'll use the value of this fn,
        // instead of comparing the objects directly
        // (`fn(x) === fn(y)` instead of `x === y`)
        this.rowIdentityFunction = (function (x) { return x; });
        // flex
        // force
        // standard
        this.columnMode = types_1.ColumnMode.standard;
        // Loading message presented when the array is undefined
        this.loadingMessage = 'Loading...';
        // Message to show when array is presented
        // but contains no values
        this.emptyMessage = 'No data to display';
        // The minimum header height in pixels.
        // pass falsey for no header
        // note: number|string does not work right
        this.headerHeight = 30;
        // The minimum footer height in pixels.
        // pass falsey for no footer
        this.footerHeight = 0;
        // The minimum table height in pixels.
        this.tableHeight = 300;
        // if external paging is turned on
        this.externalPaging = false;
        // Page size
        this.limit = undefined;
        // Total count
        this.count = 0;
        // Page offset
        this.offset = 0;
        // Loading indicator
        this.loadingIndicator = false;
        // Should we mutate the [selected] array on our own,
        // or just publish the selection events?
        //
        // True is the old behaviour - after selecting the row,
        // it will automatically update the selected's array.
        //
        // If false, DataTable component will just propagate
        // a onSelectionChange event: after that, you will have
        // to change the selected's array value on your own.
        this.mutateSelectionState = true;
        // if you can reorder columns
        this.reorderable = true;
        // type of sorting
        this.sortType = types_1.SortType.single;
        // sorts
        this.sorts = [];
        Object.assign(this, props);
        this.validate();
    }
    TableOptions.prototype.validate = function () {
        if (this.scrollbarV === true && isNaN(this.rowHeight)) {
            throw new Error('Vertical scrolling and auto row height is not support!');
        }
    };
    return TableOptions;
}());
exports.TableOptions = TableOptions;
//# sourceMappingURL=table-options.model.js.map