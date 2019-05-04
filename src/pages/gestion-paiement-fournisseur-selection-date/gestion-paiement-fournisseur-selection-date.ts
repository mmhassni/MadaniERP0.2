import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GestionVehiculeListeChantierAssociePage} from "../gestion-vehicule-liste-chantier-associe/gestion-vehicule-liste-chantier-associe";
import {GestionPaiementFournisseurListeSommeSituationPage} from "../gestion-paiement-fournisseur-liste-somme-situation/gestion-paiement-fournisseur-liste-somme-situation";

/**
 * Generated class for the GestionPaiementFournisseurSelectionDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-paiement-fournisseur-selection-date',
  templateUrl: 'gestion-paiement-fournisseur-selection-date.html',
})
export class GestionPaiementFournisseurSelectionDatePage {


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

    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPaiementFournisseurListeSommeSituationPage,"passer")
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
    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPaiementFournisseurListeSommeSituationPage,"passer")


  }


}
