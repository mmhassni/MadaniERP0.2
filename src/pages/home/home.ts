import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Subscription} from "rxjs";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public utilisateurSubscription : Subscription;

  public utilisateur = {};

  constructor(public navCtrl: NavController, public utilisateurProvider: UtilisateurProvider) {

    this.utilisateurProvider.emitUtilisateur();




    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        console.log(this.utilisateur);

      }

    );


  }


  seConnecter() {

    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.utilisateurProvider.checkUser();

  }


}
