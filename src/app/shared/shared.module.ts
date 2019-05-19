import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonChooserService } from '../services/pokemon-chooser.service';

import { AddPokemonService } from '../services/add-pokemon.service';
import { ShopCardComponent } from '../pokemon-shop/shop-card/shop-card.component';

import { PreloaderComponent } from './preloader/preloader.component';
import { PreloaderService } from './preloader/preloader.service';

@NgModule({
    exports: [
        ShopCardComponent,
        PreloaderComponent,
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        ShopCardComponent,
        PreloaderComponent,
    ],
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [
            PokemonChooserService,
            AddPokemonService,
            PreloaderService,
          ],
        };
      }
}
