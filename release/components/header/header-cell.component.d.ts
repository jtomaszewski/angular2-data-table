
import { ElementRef, Renderer } from '@angular/core';
import { StateService } from '../../services';
import { TableColumn } from '../../models';
import { SortDirection } from '../../types';
export declare class DataTableHeaderCell {
    element: ElementRef;
    private state;
    column: TableColumn;
    sortDirection: SortDirection | null;
    sort: Function;
    readonly name: string;
    constructor(element: ElementRef, state: StateService, renderer: Renderer);
    getSortBtnClasses(): {
        'sort-asc icon-down': boolean;
        'sort-desc icon-up': boolean;
    };
    onSort(): void;
}
