import { TableOptions } from '../index';
import '../themes/material.scss';
export declare class App {
    rows: any[];
    expanded: {};
    timeout: any;
    options: TableOptions;
    constructor();
    paged(event: any): void;
    fetch(cb: any): void;
    rowClick(args: any): void;
}
