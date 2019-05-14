import { Component, ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {ListeProjetPage} from "../pages/liste-projet/liste-projet";
import {UtilisateurProvider} from "../providers/utilisateur/utilisateur";
import {Subscription} from "rxjs";
import {ListeFournisseurPage} from "../pages/liste-fournisseur/liste-fournisseur";
import {SuiviGasoilListeProjetPage} from "../pages/suivi-gasoil-liste-projet/suivi-gasoil-liste-projet";
import {GestionProjetListeProjetPage} from "../pages/gestion-projet-liste-projet/gestion-projet-liste-projet";
import {GestionVehiculeListeVehiculePage} from "../pages/gestion-vehicule-liste-vehicule/gestion-vehicule-liste-vehicule";
import {GestionPointageListeProjetPage} from "../pages/gestion-pointage-liste-projet/gestion-pointage-liste-projet";
import {GestionOuvrierListeOuvrierPage} from "../pages/gestion-ouvrier-liste-ouvrier/gestion-ouvrier-liste-ouvrier";
import {GestionArticleProjetListeArticleProjetPage} from "../pages/gestion-article-projet-liste-article-projet/gestion-article-projet-liste-article-projet";
import {GestionIntervenantListeIntervenantPage} from "../pages/gestion-intervenant-liste-intervenant/gestion-intervenant-liste-intervenant";
import {GestionIncidentListeProjetPage} from "../pages/gestion-incident-liste-projet/gestion-incident-liste-projet";
import {GestionCaisseListeProjetPage} from "../pages/gestion-caisse-liste-projet/gestion-caisse-liste-projet";
import {GestionPaiementChoixActionPage} from "../pages/gestion-paiement-choix-action/gestion-paiement-choix-action";
import {Pro} from "@ionic/pro";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = ListeProjetPage;

  pages: Array<{title: string, component: any}>;

  public utilisateurSubscription : Subscription;
  public utilisateur : any;

  public progressBar = 0;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public utilisateurProvider: UtilisateurProvider) {
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [

      { title: "Demandes d'achats", component: ListeProjetPage },
      { title: 'Achat caisse', component:  GestionCaisseListeProjetPage},

      { title: 'Fournisseurs', component: ListeFournisseurPage },
      { title: 'Véhicules', component: GestionVehiculeListeVehiculePage },
      { title: 'Ouvrier', component:  GestionOuvrierListeOuvrierPage},
      { title: 'Article Projet', component:  GestionArticleProjetListeArticleProjetPage},
      { title: 'Intervenant', component:  GestionIntervenantListeIntervenantPage},
      { title: 'Incident', component:  GestionIncidentListeProjetPage},

      { title: 'Suivi gasoil', component: SuiviGasoilListeProjetPage },
      { title: "Pointage", component: GestionPointageListeProjetPage },
      { title: 'Paiement', component: GestionPaiementChoixActionPage },
      { title: 'Gestion Projet', component: GestionProjetListeProjetPage },
      { title: 'Utilisateurs', component: HomePage }


    ];

    this.utilisateurProvider.emitUtilisateur();


    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        console.log(this.utilisateur);

      }

    );

  }

  async getVersionInfo(){
    const versionInfo = await Pro.deploy.getCurrentVersion();
  }

  async checkChannel() {
    try {
      const res = await Pro.deploy.getConfiguration();
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }
  }

  async performManualUpdate() {

    /*
      Here we are going through each manual step of the update process:
      Check, Download, Extract, and Redirect.

      Ex: Check, Download, Extract when a user logs into your app,
        but Redirect when they logout for an app that is always running
        but used with multiple users (like at a doctors office).
    */

    try {
      const update = await Pro.deploy.checkForUpdate();

      await Pro.deploy.downloadUpdate((progress) => {this.progressBar = progress;});
      await Pro.deploy.extractUpdate();
      await Pro.deploy.reloadApp();

      if (update.available){
      }
      else{
        alert("MAJ Effectué");
      }




    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:
      alert(JSON.stringify(err));

      // Pro.monitoring.exception(err);
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      Pro.deploy.configure({channel: 'Production',updateMethod:"auto"}).then( onsucces => {

        this.getVersionInfo();

        this.checkChannel();

        this.performManualUpdate();

      })



    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
