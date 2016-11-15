// Polyfills
import 'core-js/client/shim';
import 'zone.js/dist/zone';

import '@angular/common';
import 'rxjs';

// Module
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from './app/main';

@NgModule({
  imports: [BrowserModule],
  declarations: [MainComponent],
  bootstrap: [MainComponent]
})
export class AppModule {}

// Bootstrap
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);
