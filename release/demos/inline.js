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
var index_1 = require('../index');
require('../themes/material.scss');
var App = (function () {
    function App() {
        var _this = this;
        this.editing = {};
        this.rows = [];
        this.options = new index_1.TableOptions({
            headerHeight: 50,
            columnMode: 'force',
            footerHeight: 50,
            rowHeight: 'auto'
        });
        this.fetch(function (data) {
            _this.rows = data.slice();
        });
    }
    App.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    App.prototype.updateValue = function (event, cell, cellValue, row) {
        this.editing[row.$$index] = false;
        this.rows[row.$$index][cell] = event.target.value;
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>inline editing</h3>\n      <datatable\n        class='material'\n        [rows]='rows'\n        [options]='options'>\n        <datatable-column name=\"Name\">\n          <template let-value=\"value\" let-row=\"row\">\n            <span\n              title=\"Double click to edit\"\n              (dblclick)=\"editing[row.$$index] = true\"\n              *ngIf=\"!editing[row.$$index]\">\n              {{value}}\n            </span>\n            <input\n              autofocus\n              (blur)=\"updateValue($event, 'name', value, row)\"\n              *ngIf=\"editing[row.$$index]\"\n              type=\"text\"\n              [value]=\"value\"\n            />\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\">\n          <template let-row=\"row\" let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=inline.js.map