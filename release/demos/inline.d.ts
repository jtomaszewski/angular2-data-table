import { TableOptions } from '../index';
import '../themes/material.scss';
export declare class App {
    editing: {};
    rows: any[];
    options: TableOptions;
    constructor();
    fetch(cb: any): void;
    updateValue(event: any, cell: any, cellValue: any, row: any): void;
}
