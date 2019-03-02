import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {ListeProjetPage} from "../pages/liste-projet/liste-projet";
import {UtilisateurProvider} from "../providers/utilisateur/utilisateur";
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListeProjetPage;

  pages: Array<{title: string, component: any}>;

  public utilisateurSubscription : Subscription;
  public utilisateur : any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public utilisateurProvider: UtilisateurProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Demandes d'achats", component: ListeProjetPage },
      { title: 'Fournisseurs', component: HomePage },
      { title: 'Projets', component: ListPage },
      { title: 'Utilisateurs', component: ListPage }

    ];

    this.utilisateurProvider.emitUtilisateur();


    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        console.log(this.utilisateur);

      }

    );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
