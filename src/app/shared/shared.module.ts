import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { PokemonChooserService } from '../services/pokemon-chooser.service';

import { AddPokemonService } from '../services/add-pokemon.service';
import { ShopCardComponent } from '../pokemon-shop/shop-card/shop-card.component';

@NgModule({
    exports: [
        PreloaderComponent,
        ShopCardComponent
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        PreloaderComponent,
        ShopCardComponent
    ],
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [
            PokemonChooserService,
            AddPokemonService
          ],
        };
      }
}
