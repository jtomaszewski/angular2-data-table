import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HotApp } from 'hot-app';

import { AppModule } from './module';

let app = (<any>window).app = new HotApp({
  oldApp: (<any>window).app,
  getRootElement: () => document.body,
  startFn: (app, onStart) => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err))
      .then(moduleRef => {
        (<any>app).moduleRef = moduleRef;
        onStart();
      });
  },
  stopFn: (app, onStop) => {
    (<any>app).moduleRef.destroy();
    onStop();
  }
});

app.startOnDOMReady();

// Webpack hot reload support
if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    app.stop();
  });
}
