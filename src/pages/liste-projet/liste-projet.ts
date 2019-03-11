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

  public projetTableauMappingBDD = [
    ["idprojet","id","number"],
    ["nomprojet","nomprojet","text"],
    ["montantprojet","montantprojet","number"],
    ["delaisrealisationprojet","delaisrealisation","number"],
    ["idregion","refregion","number"],
    ["numeromarcheprojet","numeromarche","text"],
    ["maitredouvrageprojet","maitredouvrage","text"],
    ["bureaudetudeprojet","bureaudetude","text"],
    ["bureaudecontroleprojet","bureaudecontrole","text"],
    ["laboratoireprojet","laboratoire","text"],
    ["dateordreservice","dateordreservice","date"],
    ["chefdeprojet","chefdeprojet","number"],
    ["objetprojet","objetprojet","text"]
  ];

  public listeProjets = [

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


    this.getProjet("projet").subscribe(data => {
      console.log(data);
      this.listeProjets = (data as any).features;
    });



  }



  getProjet(nomTable){

    let requeteGetProjet = "http://192.168.43.85:9090/requestAny/select";
    for (let i = 0; i < this.projetTableauMappingBDD.length; i++) {

      requeteGetProjet = requeteGetProjet + " " + this.projetTableauMappingBDD[i][1] + " as " + this.projetTableauMappingBDD[i][0] + ",";

    }

    requeteGetProjet = requeteGetProjet + " * from " + nomTable + " order by " + this.projetTableauMappingBDD[0][1] + " desc";

    return this.httpClient.get(requeteGetProjet);

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
      item["nomprojet"]=item.nomprojet;

      this.navCtrl.push(ListeChantierPage, {
        informationsActuelles: item
      });

    }

  }



  refresh(){

    this.getProjet("projet").subscribe(data => {
      console.log(data);
      this.listeProjets = (data as any).features;
    });

  }

  ionViewDidEnter() {
    this.refresh();
  }


  detailTapped($event, item) {

    event.stopPropagation();
    console.log(item);


    this.navCtrl.push(AjouterProjetPage, {
      informationsActuelles: item,
      parentPage: this
    });

  }

}
