import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {GestionProjetListeEnginPage} from "../gestion-projet-liste-engin/gestion-projet-liste-engin";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the GestionProjetChoixActionChantierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-projet-choix-action-chantier',
  templateUrl: 'gestion-projet-choix-action-chantier.html',
})
export class GestionProjetChoixActionChantierPage {


  public informationsActuelles = {};


  public objetActuel = {};
  public listeObjetActuelle = [];

  public nomTableActuelle = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl: ToastController) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    console.log(this.informationsActuelles);

  }


  clickChoix1($event, item) {

    this.pushInformationsActuelles(this.informationsActuelles, {}, GestionProjetListeEnginPage, "passer")
  }

  clickChoix2($event, item) {
    this.pushInformationsActuelles(this.informationsActuelles, {}, GestionProjetListeEnginPage, "passer")

  }


  pushInformationsActuelles(objetInformationsActuelles, objetComplement, PageSuivante, action) {

    //Object.assign(target, source); projet les informations "target" ------> dans les informations de "source"


    let objetFusion = Object.assign(objetComplement, objetInformationsActuelles);

    console.log(objetFusion);
    this.navCtrl.push(PageSuivante, {
      informationsActuelles: objetFusion,
      action: action
    });

  }

}
