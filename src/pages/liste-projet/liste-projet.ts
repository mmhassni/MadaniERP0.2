import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListeChantierPage} from "../liste-chantier/liste-chantier";
import {HttpClient} from "@angular/common/http";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {Subscription} from "rxjs";
import {AjouterProjetPage} from "../ajouter-projet/ajouter-projet";

/**
 * Generated class for the ListeProjetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-projet',
  templateUrl: 'liste-projet.html',
})
export class ListeProjetPage {

  public listeProjets = [
    {"idProjet":12,
      "nomProjet":"projet bengurir",
      "date":'12/02/2019'},
    {"idProjet":13,
      "nomProjet":"projet khemisset",
      "date":'02/12/2018'},
    {"idProjet":14,
      "nomProjet":"projet temara",
      "date":'03/11/2018'}

  ];


  public utilisateurSubscription : Subscription;
  public utilisateur = {
      "id":1,
      "nom":'issam',
      "prenom":'madani'

  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public utilisateurProvider: UtilisateurProvider) {

    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        console.log(this.utilisateur);

        // on ne doit recuperer la liste des projet que lorsque les donnes sur les roles de l utilisateur sont recuperees
        if(this.utilisateur != null){



        }


      }

    ); // fin code subscription


    this.httpClient.get("http://192.168.43.85:9090/requestAny/select id as idprojet, * from projet")
      .subscribe(data => {
        console.log(data);
        this.listeProjets = (data as any).features;

      });



  }

  ajouterProjet(){

    this.navCtrl.push(AjouterProjetPage, {
      informationsActuelles: ""
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeProjetPage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    if(this.utilisateur != {}){

      item["utilisateur"]=this.utilisateur;
      this.navCtrl.push(ListeChantierPage, {
        informationsActuelles: item
      });

    }

  }

}
