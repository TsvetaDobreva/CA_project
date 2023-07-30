import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ComponentModule } from './component/component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MainComponent } from './main/main.component';
import { environment } from '../environments/environment.development';
import { MaterialModule } from './material/material.module';
import { AdminModule } from './views/adminView/admin.module';
import { UserModule } from './views/userView/user.module';


// const app = AngularFireModule.initializeApp(environment.firebaseConfig);
// const db = getFirestore(app);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AuthModule,
    AdminModule,
    UserModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    CoreModule,
    ComponentModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
