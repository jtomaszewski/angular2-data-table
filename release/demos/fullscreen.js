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
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 0,
            rowHeight: 50,
            scrollbarV: true,
            scrollbarH: true
        });
        this.fetch(function (data) {
            _this.rows = data.slice();
        });
    }
    App.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <datatable\n        class='material'\n        style=\"position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100vh;\"\n        [rows]='rows'\n        [options]='options'>\n        <datatable-column name=\"Id\" [width]=\"80\"></datatable-column>\n        <datatable-column name=\"Name\" [width]=\"300\"></datatable-column>\n        <datatable-column name=\"Gender\"></datatable-column>\n        <datatable-column name=\"Age\"></datatable-column>\n        <datatable-column name=\"City\" [width]=\"300\" prop=\"address.city\"></datatable-column>\n        <datatable-column name=\"State\" [width]=\"300\" prop=\"address.state\"></datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=fullscreen.js.map