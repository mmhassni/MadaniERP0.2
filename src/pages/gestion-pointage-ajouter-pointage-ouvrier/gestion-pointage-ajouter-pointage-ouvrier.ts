import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GestionPointageAjouterPointageOuvrierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-pointage-ajouter-pointage-ouvrier',
  templateUrl: 'gestion-pointage-ajouter-pointage-ouvrier.html',
})
export class GestionPointageAjouterPointageOuvrierPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionPointageAjouterPointageOuvrierPage');
  }

}
