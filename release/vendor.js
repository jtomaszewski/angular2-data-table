"use strict";
// ng2
var platform_browser_1 = require('@angular/platform-browser');
require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
require('@angular/common');
// RxJS
require('rxjs/Rx');
// optimization for production
// https://github.com/AngularClass/angular2-webpack-starter/blob/master/src/platform/environment.ts#L17
if (IS_PRODUCTION) {
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
}
//# sourceMappingURL=vendor.js.map