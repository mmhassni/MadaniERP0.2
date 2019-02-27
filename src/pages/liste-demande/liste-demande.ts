import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListeSousDemandePage} from "../liste-sous-demande/liste-sous-demande";

/**
 * Generated class for the ListeDemandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-demande',
  templateUrl: 'liste-demande.html',
})
export class ListeDemandePage {

  public informationsActuelles = {};

  public listeDemandes = [
    {"idDemande":122,
      "dateDemande":"12/12/2018",
      "idDemandeur":12,
      "nomDemandeur":'Hakim Sefrioui'},
    {"idDemande":148,
      "dateDemande":"01/01/2019",
      "idDemandeur":12,
      "nomDemandeur":'Hakim Sefrioui'},
    {"idDemande":172,
      "dateDemande":"11/01/2019",
      "idDemandeur":12,
      "nomDemandeur":'Hakim Sefrioui'}

  ];



  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeDemandePage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    //On complete nos informations actuelles pour y ajouter les informations concernant le chantier selectionnee
    this.informationsActuelles["idDemande"] = item.idDemande;
    this.informationsActuelles["dateDemande"] = item.dateDemande;
    this.informationsActuelles["idDemandeur"] = item.idDemandeur;
    this.informationsActuelles["nomDemandeur"] = item.nomDemandeur;
    this.navCtrl.push(ListeSousDemandePage, {
      informationsActuelles: this.informationsActuelles
    });
  }


}
