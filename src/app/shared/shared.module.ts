import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';

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
export class SharedModule {}
