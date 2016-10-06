import {
  Component,
  ElementRef,
  Renderer
} from '@angular/core';

import { StateService } from '../../services';
import { translateXY } from '../../utils';
import { TableColumn } from '../../models';
import { SortDirection } from '../../types';

@Component({
  selector: 'datatable-header',
  template: `
    <div
      [style.width]="state.columnGroupWidths.total + 'px'"
      class="datatable-header-inner"
      orderable
      (onReorder)="columnReordered($event)">
      <div
        class="datatable-row-left"
        [ngStyle]="getStylesByGroup('left')"
        *ngIf="state.columnsByPin.left.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.left; trackBy: trackColBy"
          [column]="column"
          [sortDirection]="getColumnSortDirection(column)"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-center"
        [ngStyle]="getStylesByGroup('center')"
        *ngIf="state.columnsByPin.center.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.center; trackBy: trackColBy"
          [column]="column"
          [sortDirection]="getColumnSortDirection(column)"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false">
        </datatable-header-cell>
      </div>
      <div
        class="datatable-row-right"
        [ngStyle]="getStylesByGroup('right')"
        *ngIf="state.columnsByPin.right.length">
        <datatable-header-cell
          *ngFor="let column of state.columnsByPin.right; trackBy: trackColBy"
          [column]="column"
          [sortDirection]="getColumnSortDirection(column)"
          resizeable
          [resizeEnabled]="column.resizeable"
          (onResize)="columnResized($event, column)"
          long-press
          (onLongPress)="drag = true"
          (onLongPressEnd)="drag = false"
          draggable
          [dragX]="column.draggable && drag"
          [dragY]="false">
        </datatable-header-cell>
      </div>
    </div>
  `,
  host: {
    '[style.width]': 'headerWidth',
    '[style.height]': 'headerHeight'
  }
})
export class DataTableHeader {

  constructor(private state: StateService, element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-header', true);
  }

  get headerWidth() {
    if(this.state.options.scrollbarH) {
      return this.state.dimensions.innerWidth + 'px';
    }

    return '100%';
  }

  get headerHeight() {
    let height = this.state.options.headerHeight;
    if(height !== 'auto') {
      return `${height}px`;
    }
    return height;
  }

  trackColBy(index: number, obj: any) {
    return obj.$$id;
  }

  columnResized(width, column) {
    if (width <= column.minWidth) {
      width = column.minWidth;
    } else if(width >= column.maxWidth) {
      width = column.maxWidth;
    }

    this.state.resizeColumn(column, width);
  }

  columnReordered({ prevIndex, newIndex, model }) {
    this.state.reorderColumns(model, prevIndex, newIndex);
  }

  getStylesByGroup(group) {
    const widths = this.state.columnGroupWidths;
    const offsetX = this.state.dimensions.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'center') {
      translateXY(styles, offsetX * -1, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.state.dimensions.innerWidth;
      const offset = totalDiff * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

  getColumnSortDirection(column: TableColumn): SortDirection | null {
    const sort = this.state.options.sorts.find(s => {
      return s.prop === column.prop;
    });

    return sort ? sort.dir : null;
  }

}
