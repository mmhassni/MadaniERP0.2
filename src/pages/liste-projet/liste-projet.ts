import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListeChantierPage} from "../liste-chantier/liste-chantier";

/**
 * Generated class for the ListeProjetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-projet',
  templateUrl: 'liste-projet.html',
})
export class ListeProjetPage {

  public listeProjets = [
    {"idProjet":12,
      "nomProjet":"projet bengurir",
      "date":'12/02/2019'},
    {"idProjet":13,
      "nomProjet":"projet khemisset",
      "date":'02/12/2018'},
    {"idProjet":14,
      "nomProjet":"projet temara",
      "date":'03/11/2018'}

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeProjetPage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListeChantierPage, {
      informationsActuelles: item
    });
  }

}
