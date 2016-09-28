
import { EventEmitter } from '@angular/core';
import { TableOptions } from '../models/TableOptions';
import { TableColumn } from '../models/TableColumn';
export declare class StateService {
    options: TableOptions;
    rows: Array<any>;
    onSelectionChange: EventEmitter<any>;
    onRowsUpdate: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    scrollbarWidth: number;
    offsetX: number;
    offsetY: number;
    innerWidth: number;
    private selectedIdentities;
    private bodyheight;
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
    readonly selected: any[];
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
