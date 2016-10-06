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
        this.rows = [];
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 'auto',
            externalPaging: true,
            limit: 10,
            columns: [
                new index_1.TableColumn({ name: 'Name' }),
                new index_1.TableColumn({ name: 'Gender' }),
                new index_1.TableColumn({ name: 'Company' })
            ]
        });
        this.page();
    }
    App.prototype.page = function () {
        var _this = this;
        this.fetch(function (results) {
            _this.options.count = results.length;
            var start = _this.options.offset * _this.options.limit;
            var end = start + _this.options.limit;
            // let paged = results.slice(start, end);
            // splice doesn't let u insert at
            // a new out of bounds index :(
            // this.rows.splice(0, this.rows.length);
            // this.rows.push(...paged)
            // this.rows.splice(start, 0, ...paged);
            var rows = _this.rows.slice();
            for (var i = start; i < end; i++) {
                rows[i] = results[i];
            }
            _this.rows = rows;
            console.log('updated', start, end, _this.rows);
        });
    };
    App.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    App.prototype.onPage = function (_a) {
        var offset = _a.offset, limit = _a.limit, count = _a.count;
        console.log('Paged!', offset, limit, count);
        this.page();
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>server-paging</h3>\n      <datatable\n        class='material'\n        [rows]='rows'\n        [options]='options'\n        (onPageChange)='onPage($event)'>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=paging-server.js.map