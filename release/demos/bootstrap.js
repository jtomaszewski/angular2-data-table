"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var hot_app_1 = require('hot-app');
var module_1 = require('./module');
var app = window.app = new hot_app_1.HotApp({
    oldApp: window.app,
    getRootElement: function () { return document.body; },
    startFn: function (app, onStart) {
        platform_browser_dynamic_1.platformBrowserDynamic()
            .bootstrapModule(module_1.AppModule)
            .catch(function (err) { return console.error(err); })
            .then(function (moduleRef) {
            app.moduleRef = moduleRef;
            onStart();
        });
    },
    stopFn: function (app, onStop) {
        app.moduleRef.destroy();
        onStop();
    }
});
app.startOnDOMReady();
// Webpack hot reload support
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
        app.stop();
    });
}
//# sourceMappingURL=bootstrap.js.map