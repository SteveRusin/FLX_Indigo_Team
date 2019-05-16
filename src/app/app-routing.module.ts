import { Routes } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './home-page/home-page.module#HomePageModule',
    data: {animation: 'Home'}
  },
  {
    path: 'profile',
    loadChildren: './player-profile/player-profile.module#PlayerProfileModule',
    data: { animation: 'Profile' },
    canActivate: [AuthGuard]
  },
  {
    path: 'game',
    loadChildren: './battle/battle.module#BattleModule',
    data: { animation: 'Game' },
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    loadChildren: './pokemon-shop/pokemon-shop.module#PokemonShopModule',
  },
  { path: '**', redirectTo: '', data: {animation: 'Home'} }
];
