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
        this.fetch(function (data) {
            _this.rows = data.splice(0, 5);
        });
    }
    App.prototype.ngOnInit = function () {
        this.options = new index_1.TableOptions({
            columnMode: index_1.ColumnMode.force,
            headerHeight: 50,
            footerHeight: 50,
            rowHeight: 'auto',
            columns: [
                new index_1.TableColumn({
                    cellTemplate: this.editTmpl,
                    headerTemplate: this.hdrTpl,
                    name: 'Gender'
                })
            ]
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
    __decorate([
        core_1.ViewChild('editTmpl'), 
        __metadata('design:type', core_1.TemplateRef)
    ], App.prototype, "editTmpl", void 0);
    __decorate([
        core_1.ViewChild('hdrTpl'), 
        __metadata('design:type', core_1.TemplateRef)
    ], App.prototype, "hdrTpl", void 0);
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <h3>template refs</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [options]=\"options\">\n      </datatable>\n\n      <template #hdrTpl let-column=\"column\" >\n        <strong>Fancy</strong>: {{column.name}} !!\n      </template>\n\n      <template #editTmpl let-row=\"row\" let-value=\"value\" let-i=\"index\">\n        <img\n          *ngIf=\"value === 'male'\"\n          width=\"150\"\n          src=\"https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif\"\n        />\n        <img\n          *ngIf=\"value === 'female'\"\n          width=\"150\"\n          src=\"https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif\"\n        />\n      </template>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=template-obj.js.map