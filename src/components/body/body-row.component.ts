import {
  Component,
  Input,
  ElementRef,
  Renderer,
  ChangeDetectionStrategy
} from '@angular/core';
import { columnsByPin, columnGroupWidths, translateXY } from '../../utils';

import { TableColumn } from '../../models';

@Component({
  selector: 'datatable-body-row',
  template: `
    <div>
      <div
        class="datatable-row-left datatable-row-group"
        *ngIf="columnsByPin.left.length"
        [ngStyle]="stylesByGroup('left')"
        [style.width]="columnGroupWidths.left + 'px'">
        <datatable-body-cell
          *ngFor="let column of columnsByPin.left; trackBy: trackColBy"
          [row]="row"
          [column]="column"
          [rowHeight]="rowHeight">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-center datatable-row-group"
        [style.width]="columnGroupWidths.center + 'px'"
        [ngStyle]="stylesByGroup('center')"
        *ngIf="columnsByPin.center.length">
        <datatable-body-cell
          *ngFor="let column of columnsByPin.center; trackBy: trackColBy"
          [row]="row"
          [column]="column"
          [rowHeight]="rowHeight">
        </datatable-body-cell>
      </div>
      <div
        class="datatable-row-right datatable-row-group"
        *ngIf="columnsByPin.right.length"
        [ngStyle]="stylesByGroup('right')"
        [style.width]="columnGroupWidths.right + 'px'">
        <datatable-body-cell
          *ngFor="let column of columnsByPin.right; trackBy: trackColBy"
          [row]="row"
          [column]="column"
          [rowHeight]="rowHeight">
        </datatable-body-cell>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyRow {

  @Input() row: any;
  @Input() columns: TableColumn[];
  @Input() dimensions: any;
  @Input() rowHeight: number;

  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementClass(element.nativeElement, 'datatable-body-row', true);
  }

  get columnsByPin() {
    return columnsByPin(this.columns);
  }

  get columnGroupWidths() {
    return columnGroupWidths(this.columnsByPin, this.columns);
  }

  trackColBy(index: number, column: TableColumn) {
    return column.$$id;
  }

  stylesByGroup(group) {
    const widths = this.columnGroupWidths;
    const offsetX = this.dimensions.offsetX;

    let styles = {
      width: `${widths[group]}px`
    };

    if(group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if(group === 'right') {
      const totalDiff = widths.total - this.dimensions.innerWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.dimensions.scrollbarWidth) * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

}
