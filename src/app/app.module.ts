import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ToBattleService } from './services/to-battle.service';
import { UploadFileService } from './services/upload-file.service';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { PreloaderService } from './shared/preloader/preloader.service';

import { environment } from '../environments/environment';
import { routes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes),
    CoreModule.forRoot(),
    AngularFireModule.
      initializeApp(environment.fireConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ToBattleService,
    UploadFileService,
    PreloaderService,
  ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
