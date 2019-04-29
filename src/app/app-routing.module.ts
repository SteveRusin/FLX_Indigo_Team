import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'profile', loadChildren: './player-profile/player-profile.module#PlayerProfileModule', data: {animation: 'Profile'} },
  { path: '', loadChildren: './home-page/home-page.module#HomePageModule', data: {animation: 'Home'}}
];
