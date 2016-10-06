import { ElementRef, Renderer } from '@angular/core';
import { StateService } from '../../services';
import { TableColumn } from '../../models';
import { SortDirection } from '../../types';
export declare class DataTableHeader {
    private state;
    constructor(state: StateService, element: ElementRef, renderer: Renderer);
    readonly headerWidth: string;
    readonly headerHeight: any;
    trackColBy(index: number, obj: any): any;
    columnResized(width: any, column: any): void;
    columnReordered({prevIndex, newIndex, model}: {
        prevIndex: any;
        newIndex: any;
        model: any;
    }): void;
    getStylesByGroup(group: any): {
        width: string;
    };
    getColumnSortDirection(column: TableColumn): SortDirection | null;
}
