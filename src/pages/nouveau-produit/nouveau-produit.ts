import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the NouveauProduitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nouveau-produit',
  templateUrl: 'nouveau-produit.html',
})
export class NouveauProduitPage {

  public selectUniteOptions = {
    title: 'Unités',
    mode: 'md'
  };

  public listeUnites = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient) {

    this.httpClient.get("http://192.168.43.42:9090/requestAny/select%20*%20from%20unites")
      .subscribe(data => {
        console.log(data);

        this.listeUnites = (data as any).features;

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NouveauProduitPage');
  }

}
