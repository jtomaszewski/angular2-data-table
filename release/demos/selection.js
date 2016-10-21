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
        this.selections = [{ name: 'Ethel Price' }, { name: 'Beryl Rice' }];
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 50,
            limit: 5,
            rowHeight: 'auto',
            selectionType: index_1.SelectionType.multi,
            mutateSelectionState: false,
            columns: [
                new index_1.TableColumn({ name: 'Name' }),
                new index_1.TableColumn({ name: 'Gender' }),
                new index_1.TableColumn({ name: 'Company' })
            ],
            rowIdentityFunction: (function (x) { return x.name; })
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
    App.prototype.onSelectionChange = function (selected) {
        console.log('Selection!', selected);
        this.selections = selected;
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>selection</h3>\n      <div style='float:left;width:75%'>\n        <datatable\n          class='material'\n          [rows]='rows'\n          [options]='options'\n          [selected]='selections'\n          (onSelectionChange)='onSelectionChange($event)'>\n        </datatable>\n      </div>\n\n      <div class='selected-column' style='float:right;width:25%;'>\n        <h4>Selections</h4>\n        <ul>\n          <li *ngFor='let sel of selections'>\n            {{sel.name}}\n          </li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=selection.js.map