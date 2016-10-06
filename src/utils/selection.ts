export function selectRows(selected, row) {
  const newSelected = [...selected];
  const selectedIndex = newSelected.indexOf(row);

  if(selectedIndex > -1) {
    newSelected.splice(selectedIndex, 1);
  } else {
    newSelected.push(row);
  }

  return newSelected;
}

export function selectRowsBetween(selected, rows, index, prevIndex) {
  const reverse = index < prevIndex;
  const newSelected = [...selected];

  for(let i = 0, len = rows.length; i < len; i++) {
    const row = rows[i];
    const greater = i >= prevIndex && i <= index;
    const lesser = i <= prevIndex && i >= index;

    let range = { start: 0, end: 0 };
    if (reverse) {
      range = {
        start: index,
        end: (prevIndex - index)
      };
    } else {
      range = {
        start: prevIndex,
        end: index + 1
      };
    }

    if((reverse && lesser) || (!reverse && greater)) {
      const idx = newSelected.indexOf(row);

      // if reverse shift selection (unselect) and the
      // row is already selected, remove it from selected
      if (reverse && idx > -1) {
        newSelected.splice(idx, 1);
        continue;
      }

      // if in the positive range to be added to `selected`, and
      // not already in the selected array, add it
      if( i >= range.start && i < range.end) {
        if (idx === -1) {
          newSelected.push(row);
        }
      }
    }
  }

  return newSelected;
}
