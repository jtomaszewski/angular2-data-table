"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var module_1 = require('./module');
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(module_1.AppModule)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
var App = (function () {
    function App(oldApp) {
        this._isRunning = false;
        if (oldApp) {
            this.bodyTemplate = oldApp.bodyTemplate;
        }
    }
    App.prototype.isRunning = function () {
        return this._isRunning;
    };
    App.prototype.start = function () {
        var _this = this;
        if (this.bodyTemplate) {
            document.body.outerHTML = this.bodyTemplate;
        }
        else {
            this.bodyTemplate = document.body.outerHTML;
        }
        main().then(function (moduleRef) {
            _this.moduleRef = moduleRef;
        });
        this._isRunning = true;
        console.debug('app has been started.');
    };
    App.prototype.stop = function () {
        if (this.isRunning()) {
            this.moduleRef.destroy();
            this._isRunning = false;
            console.debug('app has been stopped.');
        }
    };
    App.prototype.restart = function () {
        console.debug('app restarting...');
        this.stop();
        this.start();
    };
    return App;
}());
exports.App = App;
var app = window.app;
// create the app and set as a global variable
app = new App(app);
window.app = app;
// init the app when the DOM is ready
if (document.readyState === 'complete') {
    app.start();
}
else {
    document.addEventListener('DOMContentLoaded', function () { return window.app.start(); });
}
// Webpack hot reload support
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
        app.stop();
    });
}
//# sourceMappingURL=bootstrap.js.map