import { TableOptions } from '../index';
import '../themes/material.scss';
export declare class App {
    rows: any[];
    selections: {
        name: string;
    }[];
    options: TableOptions;
    constructor();
    fetch(cb: any): void;
    onSelectionChange(selected: any): void;
}
