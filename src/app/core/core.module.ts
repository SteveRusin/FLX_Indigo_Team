import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { LoginDialogComponent } from './header/navbar/login-dialog/login-dialog.component';
import { LoginFormComponent } from './header/navbar/login-dialog/login-form/login-form.component';
import { AuthorizationFormComponent } from './header/navbar/login-dialog/authorization-form/authorization-form.component';
import { LoginDialogService } from './header/navbar/login-dialog/login-dialog.service';

@NgModule({
    declarations: [
      HeaderComponent,
      LogoComponent,
      NavbarComponent,
      LoginDialogComponent,
      LoginFormComponent,
      AuthorizationFormComponent
    ],
    imports: [
      BrowserAnimationsModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatToolbarModule,
    ],
    exports: [
      HeaderComponent
    ],
    entryComponents: [
      LoginDialogComponent
    ]
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
      providers: [
        LoginDialogService
      ],
    };
  }
}
