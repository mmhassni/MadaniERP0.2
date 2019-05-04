import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GestionVehiculeListeChantierAssociePage} from "../gestion-vehicule-liste-chantier-associe/gestion-vehicule-liste-chantier-associe";
import {GestionPaiementOuvrieListeSommePointageOuvrierPage} from "../gestion-paiement-ouvrie-liste-somme-pointage-ouvrier/gestion-paiement-ouvrie-liste-somme-pointage-ouvrier";

/**
 * Generated class for the GestionPaiementOuvrierSelectionDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-paiement-ouvrier-selection-date',
  templateUrl: 'gestion-paiement-ouvrier-selection-date.html',
})
export class GestionPaiementOuvrierSelectionDatePage {


  public informationsActuelles = {};


  public moisdebut = (new Date()).toISOString().substring(0,7);
  public moisfin = (new Date()).toISOString().substring(0,7);

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl : ToastController) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    this.informationsActuelles["refvehiculechantierenginassocie"] = (this.informationsActuelles as any)["idvehicule"];
    console.log(this.informationsActuelles);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoixActionFournisseurPage');
  }

  clickChoix1($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},GestionVehiculeListeChantierAssociePage,"passer")
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


  genererPaiement() {

    (this.informationsActuelles as any).moisdebut = this.moisdebut;
    (this.informationsActuelles as any).moisfin = this.moisfin;
    console.log(this.informationsActuelles);
    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPaiementOuvrieListeSommePointageOuvrierPage,"passer")


  }


}
