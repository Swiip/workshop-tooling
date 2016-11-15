// Polyfills
import 'core-js/client/shim';
import 'zone.js/dist/zone';

import '@angular/common';
import 'rxjs';

// Composant
import {Component} from '@angular/core';
import {hello} from './hello';

@Component({
  selector: 'app',
  template: `<h1>{{hello}}</h1>`
})
export class MainComponent {
  public hello: string = hello;
}

// Module
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule],
  declarations: [MainComponent],
  bootstrap: [MainComponent]
})
export class AppModule {}

// Bootstrap
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);
