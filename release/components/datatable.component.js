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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var utils_1 = require('../utils');
var types_1 = require('../types');
var models_1 = require('../models');
var datatable_column_directive_1 = require('./datatable-column.directive');
var services_1 = require('../services');
var DataTable = (function () {
    function DataTable(state, renderer, element, cd) {
        var _this = this;
        this.state = state;
        this.cd = cd;
        this.onPageChange = new core_1.EventEmitter();
        this.onRowsUpdate = new core_1.EventEmitter();
        this.onRowClick = new core_1.EventEmitter();
        this.onSelectionChange = new core_1.EventEmitter();
        this.onColumnChange = new core_1.EventEmitter();
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable', true);
        this.state.onColumnChange.subscribe(function (event) {
            _this.onColumnChange.next(event);
        });
        this.state.onOptionsUpdate.subscribe(function () {
            _this.adjustSizes();
        });
    }
    DataTable.prototype.ngOnInit = function () {
        var _this = this;
        this.pageSubscriber = this.state.onPageChange.subscribe(function (action) {
            _this.onPageChange.emit({
                page: action.value,
                offset: _this.state.options.offset,
                limit: _this.state.pageSize,
                count: _this.state.rowCount
            });
        });
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.adjustSizes();
    };
    DataTable.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.adjustColumns();
        if (this.columns.length) {
            // changing the columns without a timeout
            // causes a interesting timing bug
            setTimeout(function () {
                // this translates the expressive columns
                // that are defined into the markup to
                // column objects
                for (var _i = 0, _a = _this.columns.toArray(); _i < _a.length; _i++) {
                    var col = _a[_i];
                    _this.state.options.columns.push(new models_1.TableColumn(col));
                }
            });
        }
    };
    DataTable.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('options')) {
            this.state.setOptions(changes.options.currentValue);
        }
        if (changes.hasOwnProperty('rows')) {
            this.state.setRows(changes.rows.currentValue);
        }
        if (changes.hasOwnProperty('selected')) {
            this.state.setSelected(changes.selected.currentValue);
        }
    };
    DataTable.prototype.adjustSizes = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.state.updateDimensions({
            innerWidth: this.state.options.minimumTableWidth || Math.floor(width)
        });
        if (this.state.options.scrollbarV) {
            if (this.state.options.headerHeight)
                height = height - this.state.options.headerHeight;
            if (this.state.options.footerHeight)
                height = height - this.state.options.footerHeight;
            this.state.bodyHeight = height;
        }
        this.adjustColumns();
    };
    DataTable.prototype.adjustColumns = function (forceIdx) {
        if (!this.state.options.columns)
            return;
        var width = this.state.dimensions.innerWidth;
        if (this.state.options.scrollbarV) {
            width = width - this.state.dimensions.scrollbarWidth;
        }
        if (this.state.options.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(this.state.options.columns, width, forceIdx);
        }
        else if (this.state.options.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(this.state.options.columns, width);
        }
        this.state.options.columns = this.state.options.columns.slice();
    };
    DataTable.prototype.onRowSelect = function (event) {
        if (this.state.options.mutateSelectionState) {
            this.state.setSelected(event);
        }
        this.onSelectionChange.emit(event);
    };
    DataTable.prototype.resize = function () {
        this.adjustSizes();
    };
    Object.defineProperty(DataTable.prototype, "isFixedHeader", {
        get: function () {
            var headerHeight = this.state.options.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isFixedRow", {
        get: function () {
            var rowHeight = this.state.options.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isVertScroll", {
        get: function () {
            return this.state.options.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isHorScroll", {
        get: function () {
            return this.state.options.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isSelectable", {
        get: function () {
            return this.state.options.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', models_1.TableOptions)
    ], DataTable.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTable.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onPageChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowsUpdate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onRowClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onSelectionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTable.prototype, "onColumnChange", void 0);
    __decorate([
        core_1.ContentChildren(datatable_column_directive_1.DataTableColumn), 
        __metadata('design:type', core_1.QueryList)
    ], DataTable.prototype, "columns", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTable.prototype, "resize", null);
    __decorate([
        core_1.HostBinding('class.fixed-header'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedHeader", null);
    __decorate([
        core_1.HostBinding('class.fixed-row'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isFixedRow", null);
    __decorate([
        core_1.HostBinding('class.scroll-vertical'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isVertScroll", null);
    __decorate([
        core_1.HostBinding('class.scroll-horz'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isHorScroll", null);
    __decorate([
        core_1.HostBinding('class.selectable'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "isSelectable", null);
    DataTable = __decorate([
        core_1.Component({
            selector: 'datatable',
            providers: [services_1.StateService],
            template: "\n    <div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header\n        *ngIf=\"state.options.headerHeight\">\n      </datatable-header>\n      <datatable-body\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"onRowSelect($event)\">\n      </datatable-body>\n      <datatable-footer\n         *ngIf=\"state.options.footerHeight\"\n        (onPageChange)=\"state.setPage($event)\">\n      </datatable-footer>\n    </div>\n  "
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [services_1.StateService, core_1.Renderer, core_1.ElementRef, core_1.ChangeDetectorRef])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=datatable.component.js.map