import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'profile', loadChildren: './player-profile/player-profile.module#PlayerProfileModule' },
  { path: '', loadChildren: './home-page/home-page.module#HomePageModule'}
];
