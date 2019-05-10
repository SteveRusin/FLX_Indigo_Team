import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { PokemonChooserService } from '../services/pokemon-chooser.service';

@NgModule({
    exports: [
        PreloaderComponent
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        PreloaderComponent
    ],
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [
            PokemonChooserService
          ],
        };
      }
}
