import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GestionVehiculeListeChantierAssociePage} from "../gestion-vehicule-liste-chantier-associe/gestion-vehicule-liste-chantier-associe";
import {GestionPointageListeOuvrierPage} from "../gestion-pointage-liste-ouvrier/gestion-pointage-liste-ouvrier";
import {GestionPointageListeEnginPage} from "../gestion-pointage-liste-engin/gestion-pointage-liste-engin";

/**
 * Generated class for the GestionPointageChoixActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-pointage-choix-action',
  templateUrl: 'gestion-pointage-choix-action.html',
})
export class GestionPointageChoixActionPage {

  public informationsActuelles = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl : ToastController) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    this.informationsActuelles["refvehiculechantierenginassocie"] = (this.informationsActuelles as any)["idvehicule"];
    console.log(this.informationsActuelles);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoixActionFournisseurPage');
  }

  clickChoix1($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPointageListeOuvrierPage,"passer")
  }

  pushInformationsActuelles(objetInformationsActuelles,objetComplement,PageSuivante,action){

    //Object.assign(target, source); projet les informations "target" ------> dans les informations de "source"


    let objetFusion = Object.assign(objetComplement,objetInformationsActuelles);

    console.log(objetFusion);
    this.navCtrl.push(PageSuivante, {
      informationsActuelles: objetFusion,
      action: action
    });

  }


  clickChoix2() {
    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPointageListeEnginPage,"passer")

  }
}
