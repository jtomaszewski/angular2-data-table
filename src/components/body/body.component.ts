import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostBinding,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Keys, selectRows, selectRowsBetween, translateXY } from '../../utils';
import { StateService } from '../../services';
import { SelectionType, ClickType } from '../../types';
import { Scroller } from '../../directives';

@Component({
  selector: 'datatable-body',
  template: `
    <div>
      <datatable-progress
        *ngIf="state.options.loadingIndicator">
      </datatable-progress>
      <div
        *ngIf="state.rows.length"
        scroller
        (onScroll)="onBodyScroll($event)"
        [rowHeight]="state.options.rowHeight"
        [scrollbarV]="state.options.scrollbarV"
        [scrollbarH]="state.options.scrollbarH"
        [count]="state.rowCount"
        [scrollWidth]="state.columnGroupWidths.total">
        <datatable-body-row
          *ngFor="let row of rows; let i = index; trackBy: trackRowBy"
          [row]="row"
          [columns]="state.options.columns"
          [dimensions]="state.dimensions"
          [rowHeight]="state.options.rowHeight"
          [ngStyle]="getRowsStyles(row, i)"
          [style.height]="state.options.rowHeight + 'px'"
          [attr.tabindex]="i"
          (click)="rowClicked($event, i, row)"
          (dblclick)="rowClicked($event, i, row)"
          (keydown)="rowKeydown($event, i, row)"
          [class.active]="state.isRowSelected(row)"
          [class.datatable-row-even]="(this.state.indexes.first + i) % 2 === 0"
          [class.datatable-row-odd]="(this.state.indexes.first + i) % 2 !== 0">
        </datatable-body-row>
      </div>
      <div
        class="empty-row"
        *ngIf="!rows.length"
        [innerHTML]="state.options.emptyMessage">
      </div>
    </div>
  `
})
export class DataTableBody implements OnInit, OnDestroy {

  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

  @ViewChild(Scroller) scroller: Scroller;

  public rows: Object[];

  public trackRowBy: Function = this._trackRowBy.bind(this);

  private prevIndex: number;
  private sub: Subscription;

  get selectEnabled() {
    return !!this.state.options.selectionType;
  }

  @HostBinding('style.height')
  get bodyHeight() {
    if (this.state.options.scrollbarV) {
      return this.state.bodyHeight + 'px';
    } else {
      return 'auto';
    }
  }

  @HostBinding('style.width')
  get bodyWidth() {
    if (this.state.options.scrollbarH) {
      return this.state.dimensions.innerWidth + 'px';
    } else {
      return '100%';
    }
  }

  constructor(
    public state: StateService,
    element: ElementRef,
    renderer: Renderer) {

    renderer.setElementClass(element.nativeElement, 'datatable-body', true);
  }

  ngOnInit(): void {
    this.rows = [...this.state.rows];
    this.updateRows();

    this.sub = this.state.onPageChange.subscribe((action) => {
      this.updateRows();
      this.hideIndicator();

      if(this.state.options.scrollbarV && action.type === 'pager-event') {
        const offset = (this.state.options.rowHeight * action.limit) * action.offset;
        this.scroller.setOffset(offset);
      }
    });

    this.sub.add(this.state.onRowsUpdate.subscribe(rows => {
      this.updateRows();
      this.hideIndicator();
    }));

    this.sub.add(this.state.onSortChange.subscribe(() => {
      if (this.state.options.scrollbarV) {
        this.scroller.setOffset(0);
      }
    }));
  }

  onBodyScroll(props) {
    this.state.updateDimensions({
      offsetY: props.scrollYPos,
      offsetX: props.scrollXPos
    });

    this.updatePage(props.direction);
    this.updateRows();
  }

  updatePage(direction) {
    const idxs = this.state.indexes;
    let page = idxs.first / this.state.pageSize;

    if(direction === 'up') {
      page = Math.floor(page);
    } else if(direction === 'down') {
      page = Math.ceil(page);
    }

    if(direction !== undefined && !isNaN(page)) {
      // pages are offset + 1 ;)
      this.state.setPage({
        type: 'body-event',
        value: page + 1
      });
    }
  }

  updateRows(refresh?: boolean) {
    const idxs = this.state.indexes;
    let idx = 0;
    let rowIndex = idxs.first;

    let endSpliceIdx = refresh ? this.state.rowCount : idxs.last - idxs.first;
    this.rows = this.rows.slice(0, endSpliceIdx);

    while (rowIndex < idxs.last && rowIndex < this.state.rowCount) {
      let row = this.state.rows[rowIndex];

      if(row) {
        this.rows[idx] = row;
      }

      idx++;
      rowIndex++;
    }
  }

  getRowsStyles(row: Object, idx: number) {
    const rowHeight = this.state.options.rowHeight;

    const styles = {
      height: rowHeight + 'px'
    };

    if(this.state.options.scrollbarV) {
      const rowIndex = row ? this.state.indexes.first + idx : 0;
      const pos = rowIndex * rowHeight;
      translateXY(styles, 0, pos);
    }

    return styles;
  }

  hideIndicator(): void {
    setTimeout(() => this.state.options.loadingIndicator = false, 500);
  }

  rowClicked(event, index, row): void {
    let clickType = event.type === 'dblclick' ? ClickType.double : ClickType.single;
    this.onRowClick.emit({ type: clickType, event, row });
    this.selectRow(event, index, row);
  }

  rowKeydown(event, index, row) {
    if (event.keyCode === Keys.return && this.selectEnabled) {
      this.selectRow(event, index, row);
    } else if (event.keyCode === Keys.up || event.keyCode === Keys.down) {
      const dom = event.keyCode === Keys.up ?
        event.target.previousElementSibling :
        event.target.nextElementSibling;
      if (dom) dom.focus();
    }
  }

  selectRow(event, index, row) {
    if (!this.selectEnabled) return;

    const multiShift = this.state.options.selectionType === SelectionType.multiShift;
    const multiClick = this.state.options.selectionType === SelectionType.multi;

    let selections = [];
    if (multiShift || multiClick) {
      if (multiShift && event.shiftKey) {
        selections = selectRowsBetween(this.state.selected, this.rows, index, this.prevIndex);
      } else if (multiShift && !event.shiftKey) {
        selections.push(row);
      } else {
        selections = selectRows(this.state.selected, row);
      }
    } else {
      selections.push(row);
    }

    this.prevIndex = index;
    this.onRowSelect.emit(selections);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private _trackRowBy(index: number, row: Object) {
    return this.state.options.rowIdentityFunction(row);
  }

}
