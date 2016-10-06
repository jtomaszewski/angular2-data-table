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
            columnMode: index_1.ColumnMode.flex,
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 'auto'
        });
        this.fetch(function (data) {
            _this.rows = data.splice(0, 5);
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
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>column mode: flex</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [options]=\"options\">\n        <datatable-column name=\"Name\" [flexGrow]=\"3\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\" [flexGrow]=\"1\">\n          <template let-row=\"row\" let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\" [flexGrow]=\"1\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=column-flex.js.map