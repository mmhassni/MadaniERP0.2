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
import {GestionVehiculeListeVehiculePage} from "../pages/gestion-vehicule-liste-vehicule/gestion-vehicule-liste-vehicule";
import {GestionVehiculeChoixActionPage} from "../pages/gestion-vehicule-choix-action/gestion-vehicule-choix-action";
import {GestionVehiculeListeChantierAssociePage} from "../pages/gestion-vehicule-liste-chantier-associe/gestion-vehicule-liste-chantier-associe";
import {GestionVehiculeAjouterChantierAssociePage} from "../pages/gestion-vehicule-ajouter-chantier-associe/gestion-vehicule-ajouter-chantier-associe";
import {GestionPointageListeProjetPage} from "../pages/gestion-pointage-liste-projet/gestion-pointage-liste-projet";
import {GestionPointageListeChantierPage} from "../pages/gestion-pointage-liste-chantier/gestion-pointage-liste-chantier";
import {GestionVehiculeAjouterVehiculePage} from "../pages/gestion-vehicule-ajouter-vehicule/gestion-vehicule-ajouter-vehicule";
import {GestionPointageChoixActionPage} from "../pages/gestion-pointage-choix-action/gestion-pointage-choix-action";
import {GestionPointageListeOuvrierPage} from "../pages/gestion-pointage-liste-ouvrier/gestion-pointage-liste-ouvrier";
import {GestionPointageListeEnginPage} from "../pages/gestion-pointage-liste-engin/gestion-pointage-liste-engin";
import {GestionOuvrierListeOuvrierPage} from "../pages/gestion-ouvrier-liste-ouvrier/gestion-ouvrier-liste-ouvrier";
import {GestionOuvrierAjouterOuvrierPage} from "../pages/gestion-ouvrier-ajouter-ouvrier/gestion-ouvrier-ajouter-ouvrier";
import {GestionOuvrierListeChantierAssociePage} from "../pages/gestion-ouvrier-liste-chantier-associe/gestion-ouvrier-liste-chantier-associe";
import {GestionOuvrierAjouterChantierAssociePage} from "../pages/gestion-ouvrier-ajouter-chantier-associe/gestion-ouvrier-ajouter-chantier-associe";
import {GestionPointageListePointageOuvrierPage} from "../pages/gestion-pointage-liste-pointage-ouvrier/gestion-pointage-liste-pointage-ouvrier";
import {GestionPointageListePointageEnginPage} from "../pages/gestion-pointage-liste-pointage-engin/gestion-pointage-liste-pointage-engin";
import {GestionPointageAjouterPointageEnginPage} from "../pages/gestion-pointage-ajouter-pointage-engin/gestion-pointage-ajouter-pointage-engin";
import {GestionPointageAjouterPointageOuvrierPage} from "../pages/gestion-pointage-ajouter-pointage-ouvrier/gestion-pointage-ajouter-pointage-ouvrier";


import { CalendarComponent } from "ap-angular2-fullcalendar/src/calendar/calendar";


import {Test1Page} from "../pages/test1/test1";

import { Calendar } from '@ionic-native/calendar';
import {GestionArticleProjetListeArticleProjetPage} from "../pages/gestion-article-projet-liste-article-projet/gestion-article-projet-liste-article-projet";
import {GestionArticleProjetAjouterArticleProjetPage} from "../pages/gestion-article-projet-ajouter-article-projet/gestion-article-projet-ajouter-article-projet";
import {GestionArticleProjetListeProjetAssociePage} from "../pages/gestion-article-projet-liste-projet-associe/gestion-article-projet-liste-projet-associe";
import {GestionArticleProjetAjouterProjetAssociePage} from "../pages/gestion-article-projet-ajouter-projet-associe/gestion-article-projet-ajouter-projet-associe";
import {GestionArticleProjetListeSousTraitancePage} from "../pages/gestion-article-projet-liste-sous-traitance/gestion-article-projet-liste-sous-traitance";
import {GestionArticleProjetAjouterSousTraitancePage} from "../pages/gestion-article-projet-ajouter-sous-traitance/gestion-article-projet-ajouter-sous-traitance";
import {GestionIntervenantListeIntervenantPage} from "../pages/gestion-intervenant-liste-intervenant/gestion-intervenant-liste-intervenant";
import {GestionIntervenantAjouterIntervenantPage} from "../pages/gestion-intervenant-ajouter-intervenant/gestion-intervenant-ajouter-intervenant";

import {GestionIncidentListeChantierPage} from "../pages/gestion-incident-liste-chantier/gestion-incident-liste-chantier";
import {GestionIncidentListeProjetPage} from "../pages/gestion-incident-liste-projet/gestion-incident-liste-projet";
import {GestionIncidentListeIncidentPage} from "../pages/gestion-incident-liste-incident/gestion-incident-liste-incident";
import {GestionIncidentAjouterIncidentPage} from "../pages/gestion-incident-ajouter-incident/gestion-incident-ajouter-incident";
import {GestionProjetListeArticleProjetAssociePage} from "../pages/gestion-projet-liste-article-projet-associe/gestion-projet-liste-article-projet-associe";
import {GestionProjetAjouterArticleProjetAssociePage} from "../pages/gestion-projet-ajouter-article-projet-associe/gestion-projet-ajouter-article-projet-associe";
import {GestionProjetListeAvancementArticleProjetPage} from "../pages/gestion-projet-liste-avancement-article-projet/gestion-projet-liste-avancement-article-projet";
import {GestionProjetAjouterAvancementArticleProjetPage} from "../pages/gestion-projet-ajouter-avancement-article-projet/gestion-projet-ajouter-avancement-article-projet";
import {GestionCaisseListeFournisseurPage} from "../pages/gestion-caisse-liste-fournisseur/gestion-caisse-liste-fournisseur";
import {GestionCaisseListeProjetPage} from "../pages/gestion-caisse-liste-projet/gestion-caisse-liste-projet";
import {GestionCaisseAjouterFournisseurPage} from "../pages/gestion-caisse-ajouter-fournisseur/gestion-caisse-ajouter-fournisseur";
import {GestionCaisseListeAchatPage} from "../pages/gestion-caisse-liste-achat/gestion-caisse-liste-achat";
import {GestionCaisseAjouterAchatPage} from "../pages/gestion-caisse-ajouter-achat/gestion-caisse-ajouter-achat";




//@ts-ignore
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
    GestionProjetAjouterEnginPage,
    GestionProjetListeArticleProjetAssociePage,
    GestionProjetAjouterArticleProjetAssociePage,
    GestionProjetListeAvancementArticleProjetPage,
    GestionProjetAjouterAvancementArticleProjetPage,

    GestionVehiculeListeVehiculePage,
    GestionVehiculeAjouterVehiculePage,
    GestionVehiculeChoixActionPage,
    GestionVehiculeListeChantierAssociePage,
    GestionVehiculeAjouterChantierAssociePage,

    GestionPointageListeProjetPage,
    GestionPointageListeChantierPage,
    GestionPointageChoixActionPage,
    GestionPointageListeOuvrierPage,
    GestionPointageListeEnginPage,
    GestionPointageListePointageOuvrierPage,
    GestionPointageListePointageEnginPage,
    GestionPointageAjouterPointageOuvrierPage,
    GestionPointageAjouterPointageEnginPage,

    GestionOuvrierListeOuvrierPage,
    GestionOuvrierAjouterOuvrierPage,
    GestionOuvrierListeChantierAssociePage,
    GestionOuvrierAjouterChantierAssociePage,
    Test1Page,
    CalendarComponent,

    GestionArticleProjetListeArticleProjetPage,
    GestionArticleProjetAjouterArticleProjetPage,
    GestionArticleProjetListeProjetAssociePage,
    GestionArticleProjetAjouterProjetAssociePage,
    GestionArticleProjetListeSousTraitancePage,
    GestionArticleProjetAjouterSousTraitancePage,

    GestionIntervenantListeIntervenantPage,
    GestionIntervenantAjouterIntervenantPage,

    GestionIncidentListeProjetPage,
    GestionIncidentListeChantierPage,
    GestionIncidentListeIncidentPage,
    GestionIncidentAjouterIncidentPage,

    GestionCaisseListeProjetPage,
    GestionCaisseListeFournisseurPage,
    GestionCaisseAjouterFournisseurPage,
    GestionCaisseListeAchatPage,
    GestionCaisseAjouterAchatPage

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
    GestionProjetAjouterEnginPage,
    GestionProjetListeArticleProjetAssociePage,
    GestionProjetAjouterArticleProjetAssociePage,
    GestionProjetListeAvancementArticleProjetPage,
    GestionProjetAjouterAvancementArticleProjetPage,


    GestionVehiculeListeVehiculePage,
    GestionVehiculeAjouterVehiculePage,
    GestionVehiculeChoixActionPage,
    GestionVehiculeListeChantierAssociePage,
    GestionVehiculeAjouterChantierAssociePage,

    GestionPointageListeProjetPage,
    GestionPointageListeChantierPage,
    GestionPointageChoixActionPage,
    GestionPointageListeOuvrierPage,
    GestionPointageListeEnginPage,
    GestionPointageListePointageOuvrierPage,
    GestionPointageListePointageEnginPage,
    GestionPointageAjouterPointageOuvrierPage,
    GestionPointageAjouterPointageEnginPage,

    GestionOuvrierListeOuvrierPage,
    GestionOuvrierAjouterOuvrierPage,
    GestionOuvrierListeChantierAssociePage,
    GestionOuvrierAjouterChantierAssociePage,
    Test1Page,

    GestionArticleProjetListeArticleProjetPage,
    GestionArticleProjetAjouterArticleProjetPage,
    GestionArticleProjetListeProjetAssociePage,
    GestionArticleProjetAjouterProjetAssociePage,
    GestionArticleProjetListeSousTraitancePage,
    GestionArticleProjetAjouterSousTraitancePage,

    GestionIntervenantListeIntervenantPage,
    GestionIntervenantAjouterIntervenantPage,

    GestionIncidentListeProjetPage,
    GestionIncidentListeChantierPage,
    GestionIncidentListeIncidentPage,
    GestionIncidentAjouterIncidentPage,

    GestionCaisseListeProjetPage,
    GestionCaisseListeFournisseurPage,
    GestionCaisseAjouterFournisseurPage,
    GestionCaisseListeAchatPage,
    GestionCaisseAjouterAchatPage


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
    CameraProvider,
      Calendar
  ]
})

export class AppModule {}
