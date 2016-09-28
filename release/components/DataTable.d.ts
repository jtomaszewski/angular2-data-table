import { ElementRef, EventEmitter, KeyValueDiffers, OnInit, OnChanges, QueryList, AfterViewInit, Renderer } from '@angular/core';
import { TableOptions } from '../models/TableOptions';
import { DataTableColumn } from './DataTableColumn';
import { StateService } from '../services/State';
export declare class DataTable implements OnInit, OnChanges, AfterViewInit {
    state: StateService;
    options: TableOptions;
    rows: any[];
    selected: any[];
    onPageChange: EventEmitter<any>;
    onRowsUpdate: EventEmitter<any>;
    onRowClick: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    onColumnChange: EventEmitter<any>;
    columns: QueryList<DataTableColumn>;
    private element;
    private rowDiffer;
    private colDiffer;
    private pageSubscriber;
    constructor(state: StateService, renderer: Renderer, element: ElementRef, differs: KeyValueDiffers);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    adjustSizes(): void;
    adjustColumns(forceIdx?: number): void;
    onRowSelect(event: any): void;
    resize(): void;
    readonly isFixedHeader: boolean;
    readonly isFixedRow: boolean;
    readonly isVertScroll: boolean;
    readonly isHorScroll: boolean;
    readonly isSelectable: boolean;
}
