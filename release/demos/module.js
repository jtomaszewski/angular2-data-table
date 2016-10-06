"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var index_1 = require('../index');
require('../components/datatable.scss');
// import { App } from './basic-fixed';
// import { App } from './basic-auto';
// import { App } from './paging-client';
// import { App } from './paging-server';
// import { App } from './sorting-server';
// import { App } from './sorting-client';
var selection_1 = require('./selection');
// import { App } from './virtual';
// import { App } from './inline';
// import { App } from './scrolling';
// import { App } from './pinning';
// import { App } from './multiple';
// import { App } from './column-toggle';
// import { App } from './column-standard';
// import { App } from './column-force';
// import { App } from './column-flex';
// import { App } from './fullscreen';
// import { App } from './template-dom';
// import { App } from './template-obj';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [selection_1.App],
            imports: [platform_browser_1.BrowserModule, index_1.Angular2DataTableModule],
            bootstrap: [selection_1.App]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=module.js.map