import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [],
    exports: []
})
export class CoreModule {
    constructor(
    @Optional() @SkipSelf() private parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }
}
