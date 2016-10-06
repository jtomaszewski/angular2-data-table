import { TableOptions } from '../index';
import '../themes/material.scss';
export declare class App {
    rows: any[];
    options: TableOptions;
    constructor();
    page(): void;
    fetch(cb: any): void;
    onPage({offset, limit, count}: {
        offset: any;
        limit: any;
        count: any;
    }): void;
}
