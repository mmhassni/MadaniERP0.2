import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GestionProjetAjouterArticleProjetAssociePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-projet-ajouter-article-projet-associe',
  templateUrl: 'gestion-projet-ajouter-article-projet-associe.html',
})
export class GestionProjetAjouterArticleProjetAssociePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionProjetAjouterArticleProjetAssociePage');
  }

}
