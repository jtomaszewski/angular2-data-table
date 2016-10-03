import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Angular2DataTableModule } from '../index';
import '../components/datatable.scss';

// import { App } from './basic-fixed';
// import { App } from './basic-auto';
// import { App } from './paging-client';
// import { App } from './paging-server';
// import { App } from './sorting-server';
// import { App } from './sorting-client';
// import { App } from './selection';
import { App } from './virtual';
// import { App } from './inline';
// import { App } from './scrolling';
// import { App } from './pinning';
// import { App } from './multiple';
// import { App } from './column-toggle';
// import { App } from './column-standard';
// import { App } from './column-force';
// import { App } from './column-flex';
// import { App } from './fullscreen';
// import { App } from './template-dom';
// import { App } from './template-obj';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, Angular2DataTableModule],
  bootstrap: [App]
})
export class AppModule { }
