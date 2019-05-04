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

  //contient la liste des unites de la table stockee dans la bdd
  public listeUnites = [];

  //les attributs du produit actuel en databinding
  public produitActuel = {
    "reffournisseur":-1,
    "auteurduproduit":-1,
    "nomduproduit":"",
    "prixht":"",
    "tvaenpourcentage":20,
    "unite":"",

  };


  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient) {

    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select%20*%20from%20unites")
      .subscribe(data => {
        console.log(data);

        this.listeUnites = (data as any).features;

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NouveauProduitPage');
  }

  creerNouveauProduit() {

    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/insert%20into%20produitfournisseur%20" +
      "(%22reffournisseur%22,%22auteurduproduit%22,%22nomproduit%22,%22prixht%22,%22tvaenpourcentage%22,%22unite%22)%20" +
      " values%20(null,null,'"+ this.produitActuel.nomduproduit +"',"+ this.produitActuel.prixht + "," + this.produitActuel.tvaenpourcentage +",'"+ this.produitActuel.unite +"')")
      .subscribe(data => {
        console.log(data);

        this.listeUnites = (data as any).features;

      });


  }

}
