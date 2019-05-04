import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListeDemandePage} from "../liste-demande/liste-demande";
import {HttpClient} from "@angular/common/http";
import {AjouterChantierPage} from "../ajouter-chantier/ajouter-chantier";

/**
 * Generated class for the ListeChantierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-chantier',
  templateUrl: 'liste-chantier.html',
})
export class ListeChantierPage {

  public informationsActuelles = {};

  public listeChantiers = [  ];

  public chantierTableauMappingBDD = [
    ["idchantier","id","id"],
    ["nomchantier","nom","number"],
    ["zonechantier","zone","number"]
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

    console.log(this.navParams.data);
    this.informationsActuelles = this.navParams.data.informationsActuelles;

    this.getTable("chantier").subscribe(data => {
      console.log(data);
      this.listeChantiers = (data as any).features;
    });

  }

  getTable(nomTable){

    let requeteGetProjet = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select";
    for (let i = 0; i < this.chantierTableauMappingBDD.length; i++) {

      requeteGetProjet = requeteGetProjet + " " + this.chantierTableauMappingBDD[i][1] + " as " + this.chantierTableauMappingBDD[i][0] + ",";

    }

    requeteGetProjet = requeteGetProjet + " * from " + nomTable + " where chantier.refprojet = " + (this.informationsActuelles as any).idprojet +  " order by " + this.chantierTableauMappingBDD[0][1] + " desc";

    return this.httpClient.get(requeteGetProjet);

  }

  ajouterChantier(){


    this.informationsActuelles["refprojet"] = (this.informationsActuelles as any).idprojet;

    this.navCtrl.push(AjouterChantierPage, {
      informationsActuelles: this.informationsActuelles,
      action: "ajouterChantier"

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeProjetPage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!

    this.informationsActuelles["idchantier"] = item.idchantier;
    this.informationsActuelles["nomchantier"] = item.nomchantier;
    this.informationsActuelles["zonechantier"] = item.zonechantier;

    item["nomprojet"]=this.informationsActuelles["nomprojet"];


    this.navCtrl.push(ListeDemandePage, {
      informationsActuelles: item
    });


  }

  refresh(){

    this.getTable("chantier").subscribe(data => {
      console.log(data);
      this.listeChantiers = (data as any).features;
    });

  }

  ionViewDidEnter() {
    this.refresh();
  }

  detailTapped($event, item) {

    event.stopPropagation();
    console.log(item);

    this.informationsActuelles["idchantier"] = item.idchantier;
    this.informationsActuelles["nomchantier"] = item.nomchantier;
    this.informationsActuelles["zonechantier"] = item.zonechantier;
    this.informationsActuelles["refprojet"] = item.refprojet;


    this.navCtrl.push(AjouterChantierPage, {
      informationsActuelles: item,
      parentPage: this
    });

  }

}
