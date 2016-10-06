import { TemplateRef } from '@angular/core';
import { TableOptions } from '../index';
import '../themes/material.scss';
export declare class App {
    editTmpl: TemplateRef<any>;
    hdrTpl: TemplateRef<any>;
    rows: any[];
    options: TableOptions;
    constructor();
    ngOnInit(): void;
    fetch(cb: any): void;
}
