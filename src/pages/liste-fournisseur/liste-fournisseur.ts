import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the ListeFournisseurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-fournisseur',
  templateUrl: 'liste-fournisseur.html',
})
export class ListeFournisseurPage {

  public listeFournisseurs = [];
  public listeFournisseursFiltree = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {


    this.httpClient.get("http://192.168.43.85:9090/requestAny/select fournisseur.*, string_agg(produitfournisseur.nomproduit,',') as listeproduits from fournisseur, produitfournisseur where fournisseur.id = produitfournisseur.reffournisseur group by fournisseur.id")
      .subscribe(data => {

        this.listeFournisseurs = (data as any).features;
        this.listeFournisseursFiltree = (data as any).features;
        console.log(data);


      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeFournisseurPage');
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listeFournisseursFiltree = this.listeFournisseursFiltree.filter((item) => {
        return ( (item.listeproduits + item.raisonsociale).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeItems(){
    this.listeFournisseursFiltree = this.listeFournisseurs;
  }


  itemTapped($event: MouseEvent, item: any) {
    
  }
}
