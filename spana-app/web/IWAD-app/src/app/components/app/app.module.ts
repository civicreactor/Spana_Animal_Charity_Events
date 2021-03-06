import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { API_FIREBASE_KEY } from './mock-api';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { AppComponent } from './app.component';
import { AddEventCmp } from '../addevent/add-event';
import { HomeCmp } from '../home/home';
import { MapCmp } from '../map/map';
import { MapInputCmp } from '../map-input/map-input';
import { NewsCmp } from '../news/news';
import { SuggestionsCmp } from '../suggestions/suggestions';

import { PostcodeService } from '../../services/postcode';
import { NewsService } from '../../services/news';
import { PopupService } from '../../services/popup';
import { CarehomesService } from '../../services/carehomes';
import { EmailService } from '../../services/email';
import { UserService } from '../../services/users';
import { MessageService } from "../../services/message";
import { CookieLawModule } from "angular2-cookie-law";

  // Initialize Firebase
  export const firebaseConfig =  {
    apiKey: API_FIREBASE_KEY.API_FIREBASE_KEY,
    authDomain: "spana-app.firebaseapp.com",
    databaseURL: "https://spana-app.firebaseio.com",
    projectId: "spana-app",
    storageBucket: "spana-app.appspot.com",
    messagingSenderId: "118007510455"
  };

  export const myFirebaseAuthConfig = {
    provider: AuthProviders.Facebook,
    method: AuthMethods.Popup
  }



const appRoutes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  { 
    path: '', component: HomeCmp},
  { path: 'news', component: NewsCmp},
  { path: 'suggestions', component: SuggestionsCmp}
]

@NgModule({
  declarations: [
    AppComponent,
    AddEventCmp,
    HomeCmp,
    MapCmp,
    NewsCmp,
    MapInputCmp,
    SuggestionsCmp
  ],
  imports: [
    BrowserModule,
    CookieLawModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [
    MessageService,
    PostcodeService,
    CarehomesService,
    NewsService,
    PopupService,
    EmailService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
