import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './app-routing-animation';
import { PreloaderService } from './shared/preloader/preloader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ],
})

export class AppComponent implements OnInit{
  public title:string = 'indigo-project';
  public preloader$: Observable<boolean>;

  constructor(private preloader: PreloaderService) {}

  public ngOnInit(): void {
    this.preloader$ = this.preloader.getStream();
  }
}
