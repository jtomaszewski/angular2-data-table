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
        this.rows = [];
        this.expanded = {};
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.standard,
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 50,
            scrollbarV: true,
        });
        this.fetch(function (data) {
            _this.rows = data.slice();
        });
    }
    App.prototype.paged = function (event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            console.log('paged!', event);
        }, 100);
    };
    App.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    App.prototype.rowClick = function (args) {
        console.log('rowClick', args);
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>virtual scroll</h3>\n\n      <datatable\n        class='material'\n        [rows]='rows'\n        (onPageChange)=\"paged($event)\"\n        (onRowClick)=\"rowClick($event)\"\n        [options]='options'>\n\n        <datatable-column name=\"Name\" width=\"200\">\n          <template let-value=\"value\">\n            <strong>{{value}}</strong>\n          </template>\n        </datatable-column>\n\n        <datatable-column name=\"Gender\" width=\"300\">\n          <template let-row=\"row\" let-value=\"value\">\n            <i [innerHTML]=\"row['name']\"></i> and <i>{{value}}</i>\n          </template>\n        </datatable-column>\n\n        <datatable-column name=\"Age\" width=\"80\">\n        </datatable-column>\n\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=virtual.js.map