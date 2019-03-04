import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the AjouterProjetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-projet',
  templateUrl: 'ajouter-projet.html',
})
export class AjouterProjetPage {

  public listeRegions = [];
  public projetActuel = {
    nomregion: "",
    idregion: 1,

  };

  public selectRegionsOptions = {
    title: 'Regions',
    mode: 'md'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient : HttpClient) {


    this.httpClient.get("http://192.168.43.85:9090/requestAny/select * from region")
      .subscribe(data => {
        console.log(data);

        this.listeRegions = (data as any).features;

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterProjetPage');
  }

}
