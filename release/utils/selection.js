"use strict";
function selectRows(selected, row) {
    var newSelected = selected.slice();
    var selectedIndex = newSelected.indexOf(row);
    if (selectedIndex > -1) {
        newSelected.splice(selectedIndex, 1);
    }
    else {
        newSelected.push(row);
    }
    return newSelected;
}
exports.selectRows = selectRows;
function selectRowsBetween(selected, rows, index, prevIndex) {
    var reverse = index < prevIndex;
    var newSelected = selected.slice();
    for (var i = 0, len = rows.length; i < len; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: (prevIndex - index)
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            var idx = newSelected.indexOf(row);
            // if reverse shift selection (unselect) and the
            // row is already selected, remove it from selected
            if (reverse && idx > -1) {
                newSelected.splice(idx, 1);
                continue;
            }
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i < range.end) {
                if (idx === -1) {
                    newSelected.push(row);
                }
            }
        }
    }
    return newSelected;
}
exports.selectRowsBetween = selectRowsBetween;
//# sourceMappingURL=selection.js.map