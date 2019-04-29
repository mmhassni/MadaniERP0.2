import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ListeProduitFournisseurPage} from "../liste-produit-fournisseur/liste-produit-fournisseur";
import {ListeProjetFournisseurAssociePage} from "../liste-projet-fournisseur-associe/liste-projet-fournisseur-associe";
import {GestionProjetListeEnginPage} from "../gestion-projet-liste-engin/gestion-projet-liste-engin";
import {GestionProjetListeChantierPage} from "../gestion-projet-liste-chantier/gestion-projet-liste-chantier";
import {GestionProjetListeArticleProjetAssociePage} from "../gestion-projet-liste-article-projet-associe/gestion-projet-liste-article-projet-associe";

/**
 * Generated class for the GestionProjetChoixActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-projet-choix-action',
  templateUrl: 'gestion-projet-choix-action.html',
})
export class GestionProjetChoixActionPage {



  public informationsActuelles = {};


  public objetActuel = {};
  public listeObjetActuelle = [];

  public nomTableActuelle = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl : ToastController) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    console.log(this.informationsActuelles);

  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad ChoixActionFournisseurPage');


  }


  clickChoix1($event , item )  {

    this.pushInformationsActuelles(this.informationsActuelles,{},ListeProduitFournisseurPage,"passer")
  }

  clickChoix2($event , item ) {

  }

  clickChoix3($event , item ) {
    this.pushInformationsActuelles(this.informationsActuelles,{},GestionProjetListeEnginPage,"passer")


  }

  clickChoix4($event , item ) {
    this.pushInformationsActuelles(this.informationsActuelles,{},GestionProjetListeArticleProjetAssociePage,"passer")


  }

  clickChoix5($event , item ) {
    this.pushInformationsActuelles(this.informationsActuelles,{},GestionProjetListeChantierPage,"passer")


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
