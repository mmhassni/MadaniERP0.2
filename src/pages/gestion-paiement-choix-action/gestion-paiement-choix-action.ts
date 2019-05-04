import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GestionPaiementOuvrierListeProjetPage} from "../gestion-paiement-ouvrier-liste-projet/gestion-paiement-ouvrier-liste-projet";
import {GestionPaiementFournisseurListeProjetPage} from "../gestion-paiement-fournisseur-liste-projet/gestion-paiement-fournisseur-liste-projet";
import {GestionPaiementGasoilListeProjetPage} from "../gestion-paiement-gasoil-liste-projet/gestion-paiement-gasoil-liste-projet";

/**
 * Generated class for the GestionPaiementChoixActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-paiement-choix-action',
  templateUrl: 'gestion-paiement-choix-action.html',
})
export class GestionPaiementChoixActionPage {


  public informationsActuelles = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl : ToastController) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    //this.informationsActuelles["refvehiculechantierenginassocie"] = (this.informationsActuelles as any)["idvehicule"];
    console.log(this.informationsActuelles);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoixActionFournisseurPage');
  }

  clickChoix1($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPaiementOuvrierListeProjetPage,"passer")
  }

  clickChoix2($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPaiementGasoilListeProjetPage,"passer")
  }

  clickChoix3($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPaiementFournisseurListeProjetPage,"passer")
  }

  clickChoix4($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},GestionPaiementOuvrierListeProjetPage,"passer")
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



}
