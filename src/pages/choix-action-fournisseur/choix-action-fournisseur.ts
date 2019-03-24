import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ListeProduitFournisseurPage} from "../liste-produit-fournisseur/liste-produit-fournisseur";
import {ListeProjetFournisseurAssociePage} from "../liste-projet-fournisseur-associe/liste-projet-fournisseur-associe";

/**
 * Generated class for the ChoixActionFournisseurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choix-action-fournisseur',
  templateUrl: 'choix-action-fournisseur.html',
})
export class ChoixActionFournisseurPage {


  public informationsActuelles = {};


  public objetActuel = {};
  public listeObjetActuelle = [];

  public nomTableActuelle = "";

  public tableauMappingBDD = [
    ["idfournisseur","id","number"],
    ["raisonsocialefournisseur","raisonsociale","text"],
    ["adressefournisseur","adresse","text"],
    ["telephonefournisseur","tel","text"],
    ["faxfournisseur","fax","text"],
    ["emailfournisseur","email","text"],
    ["patentefournisseur","patente","text"],
    ["rcfournisseur","rc","text"],
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl : ToastController) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    console.log(this.informationsActuelles);

  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad ChoixActionFournisseurPage');


  }


  listerProduit($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},ListeProduitFournisseurPage,"passer")
  }

  listerPaiement($event , item ) {

  }

  listerAffectationProjet($event , item ) {
    this.pushInformationsActuelles(this.informationsActuelles,{},ListeProjetFournisseurAssociePage,"passer")


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
