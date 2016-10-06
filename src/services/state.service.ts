import { Injectable, EventEmitter } from '@angular/core';

import { columnsByPin, columnGroupWidths, scrollbarWidth, nextSortDir, sortRows } from '../utils';
import { TableOptions, TableColumn, Sort } from '../models';
import { SortType } from '../types';

export interface TableDimensionsI {
  scrollbarWidth?: number;
  offsetX?: number;
  offsetY?: number;
  innerWidth?: number;
};

@Injectable()
export class StateService {

  rows: any[] = [];
  selected: any[] = [];
  options: TableOptions = new TableOptions();
  dimensions: TableDimensionsI = {
    scrollbarWidth: scrollbarWidth(),
    offsetX: 0,
    offsetY: 0,
    innerWidth: 0
  };

  onRowsUpdate: EventEmitter<any> = new EventEmitter();
  onSelectionChange: EventEmitter<any> = new EventEmitter();
  onOptionsUpdate: EventEmitter<any> = new EventEmitter();
  onSortChange: EventEmitter<any> = new EventEmitter();
  onPageChange: EventEmitter<any> = new EventEmitter();
  onColumnChange: EventEmitter<any> = new EventEmitter();

  private selectedIdentities: Array<any> = [];

  // this body height is a placeholder
  // its only used internally, if you
  // need to set the tables element style height
  private _bodyHeight: number = 300;

  get bodyHeight(): number {
    return this._bodyHeight || (this.options.tableHeight - this.options.headerHeight - this.options.footerHeight);
  }
  set bodyHeight(value: number)
  {
    this._bodyHeight = value;
  }

  get columnsByPin() {
    return columnsByPin(this.options.columns);
  }

  get columnGroupWidths() {
    return columnGroupWidths(this.columnsByPin, this.options.columns);
  }

  get rowCount(): number {
    if (!this.options.externalPaging) {
      return this.rows.length;
    } else {
      return this.options.count;
    }
  }

  get pageSize(): number {
    if (this.options.scrollbarV) {
      return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;
    } else if (this.options.limit) {
      return this.options.limit;
    } else {
      return this.rows.length;
    }
  }

  get indexes() {
    let first = 0;
    let last = 0;

    if (this.options.scrollbarV) {
      const floor = Math.floor((this.dimensions.offsetY || 0) / this.options.rowHeight);
      first = Math.max(floor, 0);
      last = Math.min(first + this.pageSize, this.rowCount);
    } else {
      first = Math.max(this.options.offset * this.pageSize, 0);
      last = Math.min(first + this.pageSize, this.rowCount);
    }

    return { first, last };
  }

  setRows(rows: any[]): StateService {
    this.rows = rows ? [...rows] : [];
    this.cacheSelected();
    this.onRowsUpdate.emit(rows);

    return this;
  }

  setSelected(selected: any[]): StateService {
    this.selectedIdentities = (selected || []).map(this.options.rowIdentityFunction);
    this.cacheSelected();
    this.onSelectionChange.emit(this.selected);

    return this;
  }

  setOptions(options: TableOptions): StateService {
    this.options = options;
    this.onOptionsUpdate.emit(options);
    return this;
  }

  updateOptions(newOptions: any): StateService {
    this.setOptions(new TableOptions(Object.assign({}, this.options, newOptions)));
    return this;
  }

  updateDimensions(dimensions: TableDimensionsI): void {
    this.dimensions = Object.assign({}, this.dimensions, dimensions);
  }

  setPage({ type, value }): void {
    this.options.offset = value - 1;

    this.onPageChange.emit({
      type,
      offset: this.options.offset,
      limit: this.pageSize,
      count: this.rowCount
    });
  }

  isRowSelected(row: any): boolean {
    const rowIdentity = this.options.rowIdentityFunction(row);
    return this.selectedIdentities.indexOf(rowIdentity) !== -1;
  }

  resizeColumn(column: TableColumn, width: number): void {
    // TODO dont mutate inplace
    column.width = width;
    this.options.columns = [...this.options.columns];

    this.onColumnChange.emit({
      type: 'resize',
      value: column
    });
  }

  reorderColumns(column: TableColumn, prevIndex: number, newIndex: number): void {
    const columns = [...this.options.columns];
    columns.splice(prevIndex, 1);
    columns.splice(newIndex, 0, column);

    // TODO dont mutate inplace
    this.options.columns = columns;

    this.onColumnChange.emit({
      type: 'reorder',
      value: column
    });
  }

  nextSort(column: TableColumn): void {
    const idx = this.options.sorts.findIndex(s => {
      return s.prop === column.prop;
    });

    let curSort = this.options.sorts[idx];
    let curDir = undefined;
    if (curSort) curDir = curSort.dir;

    // TODO don't change options in place
    const dir = nextSortDir(this.options.sortType, curDir);
    const sorts = [...this.options.sorts];
    if (dir === undefined) {
      sorts.splice(idx, 1);
    } else if (curSort) {
      sorts[idx] = new Sort(Object.assign({}, sorts[idx], {dir}));
    } else {
      if (this.options.sortType === SortType.single) {
        sorts.splice(0, sorts.length);
      }

      sorts.push(new Sort({dir, prop: column.prop}));
    }
    this.updateOptions({sorts});

    if (!column.comparator) {
      this.setRows(sortRows(this.rows, this.options.sorts));
    } else {
      // NOTE why is it async?
      // Shouldnt it be sync, or maybe we should at least add some callback here,
      // so there's no race condition?
      column.comparator(this.rows, this.options.sorts);
    }

    this.onSortChange.emit({ column });
    this.onColumnChange.emit({
      type: 'sort',
      value: column
    });
  }

  private cacheSelected(): void {
    this.selected = this.rows.filter(row => this.isRowSelected(row));
  }

}
