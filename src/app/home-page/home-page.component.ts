import { Component, OnInit } from '@angular/core';
import { homePageAnimationsComponent } from './home-page.animation';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    homePageAnimationsComponent.animate
  ]
})
export class HomePageComponent implements OnInit {
  public isClicked: boolean = true;

  constructor() { }

  public ngOnInit(): void { }

  public changeStyles(id: number): void {
    const el: any = document.getElementById(`${id}`);
    this.isClicked = !this.isClicked;
  }

}
