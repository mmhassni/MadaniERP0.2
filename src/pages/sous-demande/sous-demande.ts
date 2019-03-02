import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the SousDemandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sous-demande',
  templateUrl: 'sous-demande.html',
})
export class SousDemandePage {


  public selectFournisseursOptions = {
    title: 'Fournisseurs',
    mode: 'md'
  };

  public informationsActuelles = {};
  public listeFournisseurs = [];
  public listeArticles = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    this.informationsActuelles["modalitepaiement"] = "cheque";
    this.informationsActuelles["numerobl"] = "";
    this.informationsActuelles["photobl"] = "";
    this.informationsActuelles["observations"] = "";

    this.httpClient.get("http://localhost:9090/requestAny/select fournisseur.id as idfournisseur, fournisseur.raisonsociale as raisonsocialefournisseur, * from utilisateurfournisseurassocie, fournisseur where utilisateurfournisseurassocie.refutilisateur =" + (this.informationsActuelles as any).utilisateur.id)
      .subscribe(data => {
        console.log(data);

        this.listeFournisseurs = (data as any).features;

      });

    console.log(this.informationsActuelles);

    this.httpClient.get("http://localhost:9090/requestAny/select article.prix as prixarticle, article.tva as tvaarticle, article.id as idarticle, * from article, sousdemande, produitfournisseur where article.refsousdemande = sousdemande.id   and article.refproduitfournisseur = produitfournisseur.id and article.refsousdemande = " + (this.informationsActuelles as any).idsousdemande)
      .subscribe(data => {
        console.log(data);

        this.listeArticles = (data as any).features;

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SousDemandePage');
  }

  Number(tvaarticle: any) {
    return 0;
  }
}
