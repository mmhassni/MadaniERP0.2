import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListeProjetPage} from "../pages/liste-projet/liste-projet";
import {ListeChantierPage} from "../pages/liste-chantier/liste-chantier";
import {ListeDemandePage} from "../pages/liste-demande/liste-demande";
import {ListeSousDemandePage} from "../pages/liste-sous-demande/liste-sous-demande";
import {NouveauProduitPage} from "../pages/nouveau-produit/nouveau-produit";
import {HttpClientModule} from "@angular/common/http";
import {SousDemandePage} from "../pages/sous-demande/sous-demande";
import { UtilisateurProvider } from '../providers/utilisateur/utilisateur';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListeProjetPage,
    ListeChantierPage,
    ListeDemandePage,
    ListeSousDemandePage,
    NouveauProduitPage,
    SousDemandePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListeProjetPage,
    ListeChantierPage,
    ListeDemandePage,
    ListeSousDemandePage,
    NouveauProduitPage,
    SousDemandePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilisateurProvider
  ]
})
export class AppModule {}
