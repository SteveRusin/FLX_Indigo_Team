import { Routes } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './home-page/home-page.module#HomePageModule'
  },
  {
    path: 'profile',
    loadChildren: './player-profile/player-profile.module#PlayerProfileModule',
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];
