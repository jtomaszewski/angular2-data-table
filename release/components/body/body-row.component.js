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
var utils_1 = require('../../utils');
var DataTableBodyRow = (function () {
    function DataTableBodyRow(element, renderer) {
        renderer.setElementClass(element.nativeElement, 'datatable-body-row', true);
    }
    Object.defineProperty(DataTableBodyRow.prototype, "columnsByPin", {
        get: function () {
            return utils_1.columnsByPin(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRow.prototype, "columnGroupWidths", {
        get: function () {
            return utils_1.columnGroupWidths(this.columnsByPin, this.columns);
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRow.prototype.trackColBy = function (index, column) {
        return column.$$id;
    };
    DataTableBodyRow.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.dimensions.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.dimensions.innerWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.dimensions.scrollbarWidth) * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "row", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableBodyRow.prototype, "columns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRow.prototype, "dimensions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyRow.prototype, "rowHeight", void 0);
    DataTableBodyRow = __decorate([
        core_1.Component({
            selector: 'datatable-body-row',
            template: "\n    <div>\n      <div\n        class=\"datatable-row-left datatable-row-group\"\n        *ngIf=\"columnsByPin.left.length\"\n        [ngStyle]=\"stylesByGroup('left')\"\n        [style.width]=\"columnGroupWidths.left + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of columnsByPin.left; trackBy: trackColBy\"\n          [row]=\"row\"\n          [column]=\"column\"\n          [rowHeight]=\"rowHeight\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-center datatable-row-group\"\n        [style.width]=\"columnGroupWidths.center + 'px'\"\n        [ngStyle]=\"stylesByGroup('center')\"\n        *ngIf=\"columnsByPin.center.length\">\n        <datatable-body-cell\n          *ngFor=\"let column of columnsByPin.center; trackBy: trackColBy\"\n          [row]=\"row\"\n          [column]=\"column\"\n          [rowHeight]=\"rowHeight\">\n        </datatable-body-cell>\n      </div>\n      <div\n        class=\"datatable-row-right datatable-row-group\"\n        *ngIf=\"columnsByPin.right.length\"\n        [ngStyle]=\"stylesByGroup('right')\"\n        [style.width]=\"columnGroupWidths.right + 'px'\">\n        <datatable-body-cell\n          *ngFor=\"let column of columnsByPin.right; trackBy: trackColBy\"\n          [row]=\"row\"\n          [column]=\"column\"\n          [rowHeight]=\"rowHeight\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableBodyRow);
    return DataTableBodyRow;
}());
exports.DataTableBodyRow = DataTableBodyRow;
//# sourceMappingURL=body-row.component.js.map