import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailProjetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-projet',
  templateUrl: 'detail-projet.html',
})
export class DetailProjetPage {

  public informationsActuelles = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.informationsActuelles = navParams.data.informationsActuelles;


    /*

    let tableProp = [];

    for(let property in navParams.data.informationsActuelles){

      tableProp.push({

        "valeurchamp": property.toString(),
        "nomchamp": navParams.data.informationsActuelles[property.toString()]

      });

      this.informationsActuelles = tableProp;


    }

    */

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailProjetPage');
  }

}
