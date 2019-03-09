import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

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
import { FilePath } from '@ionic-native/file-path/ngx';
import { EmailComposer } from '@ionic-native/email-composer';
import {AjouterProjetPage} from "../pages/ajouter-projet/ajouter-projet";
import {DetailProjetPage} from "../pages/detail-projet/detail-projet";
import {ListeFournisseurPage} from "../pages/liste-fournisseur/liste-fournisseur";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListeChantierPage,
    ListeDemandePage,
    ListeProjetPage,
    ListeSousDemandePage,
    NouveauProduitPage,
    SousDemandePage,
    AjouterProjetPage,
    DetailProjetPage,
    ListeFournisseurPage

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListeProjetPage,
    ListeChantierPage,
    ListeSousDemandePage,
    ListeDemandePage,
    NouveauProduitPage,
    SousDemandePage,
    AjouterProjetPage,
    DetailProjetPage,
    ListeFournisseurPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FilePath,
    EmailComposer,
    Base64ToGallery,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilisateurProvider
  ]
})
export class AppModule {}
