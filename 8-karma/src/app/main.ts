import {Component} from '@angular/core';
import {hello} from './hello';

@Component({
  selector: 'app',
  template: `<h1>{{hello}}</h1>`
})
export class MainComponent {
  public hello: string = hello;
}
