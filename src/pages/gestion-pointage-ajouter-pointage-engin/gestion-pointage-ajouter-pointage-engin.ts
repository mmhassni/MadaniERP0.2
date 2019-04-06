import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GestionPointageAjouterPointageEnginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-pointage-ajouter-pointage-engin',
  templateUrl: 'gestion-pointage-ajouter-pointage-engin.html',
})
export class GestionPointageAjouterPointageEnginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionPointageAjouterPointageEnginPage');
  }

}
