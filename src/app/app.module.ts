import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat/';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)), 
        AngularFireModule.initializeApp(environment.firebaseConfig),
        provideAuth(()=>getAuth()),
        provideStorage(()=>getStorage()),
        AngularFireDatabaseModule
        ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AngularFireDatabase],
  bootstrap: [AppComponent],
})
export class AppModule {}
