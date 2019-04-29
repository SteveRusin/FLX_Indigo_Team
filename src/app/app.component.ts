import { Component } from '@angular/core';
import { slideInAnimation } from './app-routing-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ],
})

export class AppComponent {
  public title:string = 'indigo-project';
}
