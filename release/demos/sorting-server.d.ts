import { TableOptions } from '../index';
import '../themes/material.scss';
export declare class App {
    rows: any[];
    options: TableOptions;
    sorter(rows: any, dirs: any): void;
    constructor();
    fetch(cb: any): void;
}
