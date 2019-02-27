import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListeDemandePage} from "../liste-demande/liste-demande";

/**
 * Generated class for the ListeChantierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-chantier',
  templateUrl: 'liste-chantier.html',
})
export class ListeChantierPage {

  public informationsActuelles = {};

  public listeChantiers = [
    {"idChantier":22,
      "nomChantier":"bengurir1",
      "zoneChantier":'commune benzri'},
    {"idChantier":23,
      "nomChantier":"bengurir2",
      "zoneChantier":'commune bentri'},
    {"idChantier":44,
      "nomChantier":"bengurir3",
      "zoneChantier":'commune benfri'}

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      console.log(this.navParams.data);
      this.informationsActuelles = this.navParams.data.informationsActuelles;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeChantierPage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    //On complete nos informations actuelles pour y ajouter les informations concernant le chantier selectionnee
    this.informationsActuelles["idChantier"] = item.idChantier;
    this.informationsActuelles["nomChantier"] = item.nomChantier;
    this.informationsActuelles["zoneChantier"] = item.zoneChantier;
    this.navCtrl.push(ListeDemandePage, {
      informationsActuelles: this.informationsActuelles
    });
  }

}
