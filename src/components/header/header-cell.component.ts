import {
  Component,
  Input,
  ElementRef,
  Renderer,
  ChangeDetectionStrategy
} from '@angular/core';

import { StateService } from '../../services';
import { TableColumn } from '../../models';
import { SortDirection } from '../../types';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div>
      <span
        class="datatable-header-cell-label draggable"
        *ngIf="!column.headerTemplate"
        (click)="onSort()"
        [innerHTML]="name">
      </span>
      <template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngOutletContext]="{ column: column, sort: sort }">
      </template>
      <span
        class="sort-btn"
        [ngClass]="getSortBtnClasses()">
      </span>
    </div>
  `,
  host: {
    '[class.sortable]': 'column.sortable',
    '[class.resizable]': 'column.resizable',
    '[style.width]': 'column.width + "px"',
    '[style.minWidth]': 'column.minWidth + "px"',
    '[style.maxWidth]': 'column.maxWidth + "px"',
    '[style.height]': 'column.height + "px"',
    '[attr.title]': 'name'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableHeaderCell {

  @Input() column: TableColumn;
  @Input() sortDirection: SortDirection | null;

  sort: Function = this.onSort.bind(this);

  get name() {
    return this.column.name || this.column.prop;
  }

  constructor(public element: ElementRef, private state: StateService, renderer: Renderer) {
    renderer.setElementClass(this.element.nativeElement, 'datatable-header-cell', true);
  }

  getSortBtnClasses() {
    return {
      'sort-asc icon-down': this.sortDirection === SortDirection.asc,
      'sort-desc icon-up': this.sortDirection === SortDirection.desc
    };
  }

  onSort() {
    if(this.column.sortable) {
      this.state.nextSort(this.column);
    }
  }

}
