import { TableOptions, TableColumn } from '../index';
import '../themes/material.scss';
export declare class App {
    rows: {
        'name': string;
        'gender': string;
        'company': string;
    }[];
    columns: TableColumn[];
    options: TableOptions;
    toggle(col: any): void;
    isChecked(col: any): boolean;
}
