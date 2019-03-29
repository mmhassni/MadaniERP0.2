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
import {AjouterChantierPage} from "../pages/ajouter-chantier/ajouter-chantier";
import {AjouterFournisseurPage} from "../pages/ajouter-fournisseur/ajouter-fournisseur";
import {AjouterNouvelArticlePage} from "../pages/ajouter-nouvel-article/ajouter-nouvel-article";
import {Toast} from "@ionic-native/toast";
import {ChoixActionFournisseurPage} from "../pages/choix-action-fournisseur/choix-action-fournisseur";
import {ListeProduitFournisseurPage} from "../pages/liste-produit-fournisseur/liste-produit-fournisseur";
import {AjouterProduitFournisseurPage} from "../pages/ajouter-produit-fournisseur/ajouter-produit-fournisseur";
import {ListeProjetFournisseurAssociePage} from "../pages/liste-projet-fournisseur-associe/liste-projet-fournisseur-associe";
import {AjouterProjetFournisseurAssociePage} from "../pages/ajouter-projet-fournisseur-associe/ajouter-projet-fournisseur-associe";
import {SuiviGasoilListeProjetPage} from "../pages/suivi-gasoil-liste-projet/suivi-gasoil-liste-projet";
import {SuiviGasoilListeChantierPage} from "../pages/suivi-gasoil-liste-chantier/suivi-gasoil-liste-chantier";
import {SuiviGasoilListeBonGasoilPage} from "../pages/suivi-gasoil-liste-bon-gasoil/suivi-gasoil-liste-bon-gasoil";
import {SuiviGasoilAjouterBonGasoilPage} from "../pages/suivi-gasoil-ajouter-bon-gasoil/suivi-gasoil-ajouter-bon-gasoil";
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { CameraProvider } from '../providers/camera/camera';
import {GestionProjetListeProjetPage} from "../pages/gestion-projet-liste-projet/gestion-projet-liste-projet";
import {GestionProjetChoixActionPage} from "../pages/gestion-projet-choix-action/gestion-projet-choix-action";
import {GestionProjetListeEnginPage} from "../pages/gestion-projet-liste-engin/gestion-projet-liste-engin";
import {GestionProjetListeChantierPage} from "../pages/gestion-projet-liste-chantier/gestion-projet-liste-chantier";
import {GestionProjetChoixActionChantierPage} from "../pages/gestion-projet-choix-action-chantier/gestion-projet-choix-action-chantier";
import {GestionProjetAjouterEnginPage} from "../pages/gestion-projet-ajouter-engin/gestion-projet-ajouter-engin";

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
    ListeFournisseurPage,
    AjouterChantierPage,
    AjouterFournisseurPage,
    AjouterNouvelArticlePage,
    ChoixActionFournisseurPage,
    ListeProduitFournisseurPage,
    AjouterProduitFournisseurPage,
    ListeProjetFournisseurAssociePage,
    AjouterProjetFournisseurAssociePage,
    SuiviGasoilListeProjetPage,
    SuiviGasoilListeChantierPage,
    SuiviGasoilListeBonGasoilPage,
    SuiviGasoilAjouterBonGasoilPage,
    GestionProjetListeProjetPage,
    GestionProjetChoixActionPage,
    GestionProjetListeEnginPage,
    GestionProjetListeChantierPage,
    GestionProjetChoixActionChantierPage,
    GestionProjetAjouterEnginPage

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
    ListeFournisseurPage,
    AjouterChantierPage,
    AjouterFournisseurPage,
    AjouterNouvelArticlePage,
    ChoixActionFournisseurPage,
    ListeProduitFournisseurPage,
    AjouterProduitFournisseurPage,
    ListeProjetFournisseurAssociePage,
    AjouterProjetFournisseurAssociePage,
    SuiviGasoilListeProjetPage,
    SuiviGasoilListeChantierPage,
    SuiviGasoilListeBonGasoilPage,
    SuiviGasoilAjouterBonGasoilPage,
    GestionProjetListeProjetPage,
    GestionProjetChoixActionPage,
    GestionProjetListeEnginPage,
    GestionProjetListeChantierPage,
    GestionProjetChoixActionChantierPage,
    GestionProjetAjouterEnginPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FilePath,
    EmailComposer,
    Base64ToGallery,
    Toast,
    Diagnostic,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilisateurProvider,
    CameraProvider
  ]
})
export class AppModule {}
