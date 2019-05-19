import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { HomePageCardsComponent } from './home-page-cards/home-page-cards.component';

import { homeRoutes } from './home-page-routing.module';

import { MatAutocompleteModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
  ],
  declarations: [
    HomePageComponent,
    HomePageCardsComponent
  ]
})

export class HomePageModule { }
