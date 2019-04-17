import { Component, OnInit } from '@angular/core';
import { HomePageAnimationsComponent } from './home-page.animation';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    HomePageAnimationsComponent.animate
  ]
})
export class HomePageComponent implements OnInit {
  public applyClass: boolean = true;

  constructor() { }

  public ngOnInit(): void {
  }

  public changeStyles(): void { }

}
