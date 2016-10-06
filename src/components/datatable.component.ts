import {
  Component,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  HostListener,
  ContentChildren,
  OnInit,
  OnChanges,
  QueryList,
  AfterViewInit,
  HostBinding,
  Host,
  Renderer,
  ChangeDetectorRef
} from '@angular/core';

import { forceFillColumnWidths, adjustColumnWidths } from '../utils';
import { ColumnMode } from '../types';
import { TableOptions, TableColumn } from '../models';
import { DataTableColumn } from './datatable-column.directive';
import { StateService } from '../services';

@Component({
  selector: 'datatable',
  providers: [StateService],
  template: `
    <div
      visibility-observer
      (onVisibilityChange)="adjustSizes()">
      <datatable-header
        *ngIf="state.options.headerHeight">
      </datatable-header>
      <datatable-body
        (onRowClick)="onRowClick.emit($event)"
        (onRowSelect)="onRowSelect($event)">
      </datatable-body>
      <datatable-footer
         *ngIf="state.options.footerHeight"
        (onPageChange)="state.setPage($event)">
      </datatable-footer>
    </div>
  `
})
export class DataTable implements OnInit, OnChanges, AfterViewInit {

  @Input() options: TableOptions;
  @Input() rows: any[];
  @Input() selected: any[];

  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowsUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter();
  @Output() onColumnChange: EventEmitter<any> = new EventEmitter();

  @ContentChildren(DataTableColumn) columns: QueryList<DataTableColumn>;

  private element: HTMLElement;
  private pageSubscriber: any;

  constructor(
    @Host() public state: StateService,
    renderer: Renderer,
    element: ElementRef,
    private cd: ChangeDetectorRef) {

    this.element = element.nativeElement;
    renderer.setElementClass(this.element, 'datatable', true);

    this.state.onColumnChange.subscribe((event) => {
      this.onColumnChange.next(event);
      this.cd.markForCheck();
    });
  }

  ngOnInit(): void {
    this.pageSubscriber = this.state.onPageChange.subscribe((action) => {
      this.onPageChange.emit({
        page: action.value,
        offset: this.state.options.offset,
        limit: this.state.pageSize,
        count: this.state.rowCount
      });
    });

    // need to call this immediatly to size
    // if the table is hidden the visibility
    // listener will invoke this itself upon show
    this.adjustSizes();
  }

  ngAfterViewInit() {
    this.adjustColumns();

    if (this.columns.length) {
      // changing the columns without a timeout
      // causes a interesting timing bug
      setTimeout(() => {

        // this translates the expressive columns
        // that are defined into the markup to
        // column objects
        for (let col of this.columns.toArray()) {
          this.options.columns.push(new TableColumn(col));
        }
      });
    }
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('options')) {
      this.state.setOptions(changes.options.currentValue);
      this.cd.markForCheck();
    }

    if (changes.hasOwnProperty('rows')) {
      this.state.setRows(changes.rows.currentValue);
    }

    if (changes.hasOwnProperty('selected')) {
      this.state.setSelected(changes.selected.currentValue);
    }
  }

  adjustSizes() {
    let { height, width } = this.element.getBoundingClientRect();
    this.state.updateDimensions({
      innerWidth: Math.floor(width)
    });

    if (this.options.scrollbarV) {
      if (this.options.headerHeight) height = height - this.options.headerHeight;
      if (this.options.footerHeight) height = height - this.options.footerHeight;
      this.state.bodyHeight = height;
    }

    this.adjustColumns();
  }

  adjustColumns(forceIdx?: number) {
    if (!this.options.columns) return;

    let width: number = this.state.dimensions.innerWidth;
    if (this.options.scrollbarV) {
      width = width - this.state.dimensions.scrollbarWidth;
    }

    if (this.options.columnMode === ColumnMode.force) {
      forceFillColumnWidths(this.options.columns, width, forceIdx);
    } else if (this.options.columnMode === ColumnMode.flex) {
      adjustColumnWidths(this.options.columns, width);
    }

    this.cd.markForCheck();
  }

  onRowSelect(event) {
    if (this.options.mutateSelectionState) {
      this.state.setSelected(event);
    }
    this.onSelectionChange.emit(event);
  }

  @HostListener('window:resize')
  resize() {
    this.adjustSizes();
  }

  @HostBinding('class.fixed-header')
  get isFixedHeader() {
    const headerHeight: number|string = this.options.headerHeight;

    return (typeof headerHeight === 'string') ?
      (<string>headerHeight) !== 'auto' : true;
  }

  @HostBinding('class.fixed-row')
  get isFixedRow() {
    const rowHeight: number|string = this.options.rowHeight;

    return (typeof rowHeight === 'string') ?
      (<string>rowHeight) !== 'auto' : true;
  }

  @HostBinding('class.scroll-vertical')
  get isVertScroll() {
    return this.options.scrollbarV;
  }

  @HostBinding('class.scroll-horz')
  get isHorScroll() {
    return this.options.scrollbarH;
  }

  @HostBinding('class.selectable')
  get isSelectable() {
    return this.options.selectionType !== undefined;
  }

}
