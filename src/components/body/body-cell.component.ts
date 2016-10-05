import {
  Component, 
  Input,
  PipeTransform,
  HostBinding,
  Renderer,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { TableColumn } from '../../models';
import { deepValueGetter } from '../../utils';
import { StateService } from '../../services';

@Component({
  selector: 'datatable-body-cell',
  template: `
    <div class="datatable-body-cell-label">
      <span
        *ngIf="!column.cellTemplate"
        [innerHTML]="value">
      </span>
      <template
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngOutletContext]="{ value: value, row: row, column: column }">
      </template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableBodyCell {

  @Input() column: TableColumn;
  @Input() row: any;
  @Input() rowHeight: number;

  constructor(element: ElementRef, renderer: Renderer, private state: StateService) {
    renderer.setElementClass(element.nativeElement, 'datatable-body-cell', true);
  }

  get value() {
    if (!this.row) return '';
    const prop: any = deepValueGetter(this.row, this.column.prop);
    const userPipe: PipeTransform = this.column.pipe;
    return userPipe ? userPipe.transform(prop) : prop;
  }

  @HostBinding('style.width.px') get width(): any {
    return this.column.width;
  }

  @HostBinding('style.height') get height(): any {
    if(isNaN(this.rowHeight)) return this.rowHeight;
    return this.rowHeight + 'px';
  }

}
