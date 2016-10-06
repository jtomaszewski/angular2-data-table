import { TableOptions } from '../index';
import '../themes/material.scss';
export declare class App {
    rows: any[];
    temp: any[];
    val: string;
    options: TableOptions;
    constructor();
    fetch(cb: any): void;
    updateFilter(val: any): void;
}
