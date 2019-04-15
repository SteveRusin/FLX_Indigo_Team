import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public applyClass: boolean = true;

  constructor() { }

  public ngOnInit(): void {
  }

  public changeStyles(): void { }

}
