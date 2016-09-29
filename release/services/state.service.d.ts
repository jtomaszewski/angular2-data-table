
import { EventEmitter } from '@angular/core';
import { TableOptions, TableColumn } from '../models';
export declare class StateService {
    options: TableOptions;
    rows: Array<any>;
    selected: Array<any>;
    onSortChange: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    onRowsUpdate: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    scrollbarWidth: number;
    offsetX: number;
    offsetY: number;
    innerWidth: number;
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
    private cacheSelected();
    setSelected(selected: any[]): StateService;
    setRows(rows: any[]): StateService;
    setOptions(options: TableOptions): StateService;
    setPage({type, value}: {
        type: any;
        value: any;
    }): void;
    isRowSelected(row: any): boolean;
    nextSort(column: TableColumn): void;
}
