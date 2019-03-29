import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GestionProjetAjouterEnginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-projet-ajouter-engin',
  templateUrl: 'gestion-projet-ajouter-engin.html',
})
export class GestionProjetAjouterEnginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionProjetAjouterEnginPage');
  }

}
