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
        this.rows = [
            {
                'name': 'Claudine Neal',
                'gender': 'female',
                'company': 'Sealoud'
            },
            {
                'name': 'Beryl Rice',
                'gender': 'female',
                'company': 'Velity'
            }
        ];
        this.columns = [
            new index_1.TableColumn({ name: 'Name' }),
            new index_1.TableColumn({ name: 'Gender' }),
            new index_1.TableColumn({ name: 'Company' })
        ];
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 'auto',
            columns: []
        });
    }
    App.prototype.toggle = function (col) {
        var idx = this.options.columns.findIndex(function (c) {
            return c.name === col.name;
        });
        if (idx > -1) {
            this.options.columns.splice(idx, 1);
        }
        else {
            this.options.columns.push(col);
        }
    };
    App.prototype.isChecked = function (col) {
        var idx = this.options.columns.findIndex(function (c) {
            return c.name === col.name;
        });
        return idx > -1;
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>column add/remove</h3>\n      <div style='width:60%;display:inline-block;'>\n        <datatable\n          style='width:100%'\n          class='material'\n          [rows]='rows'\n          [options]='options'>\n          </datatable>\n      </div>\n      <div style='width:20%;display:inline-block;vertical-align:top;text-align:left;padding:20px;'>\n        <div *ngFor='let col of columns'>\n          <input\n            type='checkbox'\n            (click)='toggle(col)'\n            [checked]='isChecked(col)'>\n            {{col.name}}\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=column-toggle.js.map