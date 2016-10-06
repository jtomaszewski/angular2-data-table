import { ElementRef, Renderer } from '@angular/core';
import { TableColumn } from '../../models';
export declare class DataTableBodyRow {
    row: any;
    columns: TableColumn[];
    dimensions: any;
    rowHeight: number;
    constructor(element: ElementRef, renderer: Renderer);
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
    trackColBy(index: number, column: TableColumn): string;
    stylesByGroup(group: any): {
        width: string;
    };
}
