import { Routes, CanActivate  } from '@angular/router';
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
    loadChildren: './home-page/home-page.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];
