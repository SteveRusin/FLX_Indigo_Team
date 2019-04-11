import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [],
    imports: [
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule
    ]
})
export class CoreModule {
    constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }
}
