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
        this.temp = [];
        this.val = '';
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 'auto',
            limit: 10,
            columns: [
                new index_1.TableColumn({ name: 'Name' }),
                new index_1.TableColumn({ name: 'Gender' }),
                new index_1.TableColumn({ name: 'Company' })
            ]
        });
        this.fetch(function (data) {
            // cache our list
            _this.temp = data.slice();
            // push our inital complete list
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
    App.prototype.updateFilter = function (val) {
        this.rows = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>client filter / search</h3>\n      <input\n        type='text'\n        style='padding:8px;margin:15px;width:30%;'\n        placeholder='Type to filter the name column...'\n        [ngModel]='val'\n        (ngModelChange)='updateFilter($event)'\n      />\n      <datatable\n        class='material'\n        [rows]='rows'\n        [options]='options'>\n        </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=filter.js.map