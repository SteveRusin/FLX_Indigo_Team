import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
})

export class PreloaderComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public loadingSubscription: Subscription;

  constructor(private loadingScreenService: PreloaderService) {
  }

  public ngOnInit(): void {
    this.loadingSubscription = this.loadingScreenService.loadingStatus
    .subscribe((value: any) => {
      this.loading = value;
    });
  }

  public ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
