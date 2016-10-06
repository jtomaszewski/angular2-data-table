
import { EventEmitter } from '@angular/core';
import { TableOptions, TableColumn } from '../models';
export interface TableDimensionsI {
    scrollbarWidth?: number;
    offsetX?: number;
    offsetY?: number;
    innerWidth?: number;
}
export declare class StateService {
    rows: Object[];
    selected: Object[];
    options: TableOptions;
    dimensions: TableDimensionsI;
    onRowsUpdate: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    onOptionsUpdate: EventEmitter<any>;
    onSortChange: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    onColumnChange: EventEmitter<any>;
    private selectedIdentities;
    private _bodyHeight;
    bodyHeight: number;
    readonly columnsByPin: {
        left: any[];
        center: any[];
        right: any[];
    };
    readonly columnGroupWidths: {
        left: number;
        center: number;
        right: number;
        total: number;
    };
    readonly rowCount: number;
    readonly pageSize: number;
    readonly indexes: {
        first: number;
        last: number;
    };
    setRows(rows: Object[]): StateService;
    setSelected(selected: Object[]): StateService;
    setOptions(options: TableOptions): StateService;
    updateOptions(newOptions: Object): StateService;
    updateDimensions(dimensions: TableDimensionsI): void;
    setPage({type, value}: {
        type: any;
        value: any;
    }): void;
    isRowSelected(row: any): boolean;
    resizeColumn(column: TableColumn, width: number): void;
    reorderColumns(column: TableColumn, prevIndex: number, newIndex: number): void;
    nextSort(column: TableColumn): void;
    private cacheSelected();
}
