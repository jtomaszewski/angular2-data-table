import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './module';

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

export class App {
  public moduleRef: any;
  public bodyTemplate: string;
  private _isRunning: boolean = false;

  constructor(oldApp?: App) {
    if (oldApp) {
      this.bodyTemplate = oldApp.bodyTemplate;
    }
  }

  isRunning(): boolean {
    return this._isRunning;
  }

  start() {
    if (this.bodyTemplate) {
      document.body.outerHTML = this.bodyTemplate;
    } else {
      this.bodyTemplate = document.body.outerHTML;
    }

    main().then(moduleRef => {
      this.moduleRef = moduleRef;
    });

    this._isRunning = true;
    console.debug('app has been started.');
  }

  stop() {
    if (this.isRunning()) {
      this.moduleRef.destroy();
      this._isRunning = false;
      console.debug('app has been stopped.');
    }
  }

  restart() {
    console.debug('app restarting...');
    this.stop();
    this.start();
  }
}


let app = (<any>window).app;

// create the app and set as a global variable
app = new App(app);
(<any>window).app = app;

// init the app when the DOM is ready
if (document.readyState === 'complete') {
  app.start();
} else {
  document.addEventListener('DOMContentLoaded', () => (<any>window).app.start());
}

// Webpack hot reload support
if (module.hot) {
  module.hot.accept();

  module.hot.dispose(() => {
    app.stop();
  });
}
