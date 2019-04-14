import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  applyClass: boolean = true;

  constructor() { }

  public ngOnInit(): void {
  }

  changeStyles(): void {
    this.applyClass = !this.applyClass;
  }

}
