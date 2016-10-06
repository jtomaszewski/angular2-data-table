import { Renderer, ElementRef } from '@angular/core';
import { TableColumn } from '../../models';
export declare class DataTableBodyCell {
    column: TableColumn;
    row: any;
    rowHeight: number;
    constructor(element: ElementRef, renderer: Renderer);
    readonly value: any;
    readonly width: any;
    readonly height: any;
}
