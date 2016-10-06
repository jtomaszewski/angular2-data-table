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
            { name: 'Larry', gender: 'Male', company: 'Cisco' },
            { name: 'Lauren', gender: 'Female', company: 'HP' }
        ];
        this.rows2 = [
            { name: 'Callie', gender: 'Female' },
            { name: 'Maggie', gender: 'Female' }
        ];
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 0,
            rowHeight: 100,
            columns: [
                new index_1.TableColumn({ prop: 'name' }),
                new index_1.TableColumn({ name: 'Gender' }),
                new index_1.TableColumn({ name: 'Company' })
            ]
        });
        this.options2 = new index_1.TableOptions({
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 'auto',
            columns: [
                new index_1.TableColumn({ prop: 'name', Name: '^^NAME^^' }),
                new index_1.TableColumn({ name: 'Gender' })
            ]
        });
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>table 1</h3>\n      <datatable\n        class='material'\n        [rows]='rows'\n        [options]='options'>\n      </datatable>\n\n      <h3>table 2</h3>\n      <datatable\n        class='material'\n        [rows]='rows2'\n        [options]='options2'>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=multiple.js.map