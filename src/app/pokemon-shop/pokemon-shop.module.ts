import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonShopComponent } from './pokemon-shop.component';
import { SharedModule } from '../shared/shared.module';
import { shopRoutes } from './shop-routing.module';

@NgModule({
  declarations: [ PokemonShopComponent ],
  imports: [ CommonModule, RouterModule.forChild(shopRoutes), SharedModule ],
  exports: [ PokemonShopComponent ]
})
export class PokemonShopModule { }
