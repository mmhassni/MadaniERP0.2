import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SousDemandePage} from "../sous-demande/sous-demande";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the ListeSousDemandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-sous-demande',
  templateUrl: 'liste-sous-demande.html',
})
export class ListeSousDemandePage {

  public informationsActuelles = {};

  public listeFournisseurs = [];

  public listeSousDemandes = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

    //on recupere la liste de tout les fournisseurs de la bdd qui sont affecte a ce fournisseur

    //console.log(this.navParams.data.informationsActuelles);

    //pour cela on doit dabord recuperer l id de l utilisateur pour voir la liste des fournisseur qui lui sont affectes

    this.informationsActuelles = this.navParams.data.informationsActuelles;

    this.refresh();





  }

  refresh(){

    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/" +
      "select fournisseur.adresse as adressefournisseur, fournisseur.email as emailfournisseur, sousdemande.id as idsousdemande, sousdemande.datemodification as datemodificationsousdemande, fournisseur.id as idfournisseur, fournisseur.raisonsociale as raisonsocialefournisseur, * " +
      "from sousdemande " +
      "LEFT OUTER JOIN fournisseur ON sousdemande.reffournisseur= fournisseur.id LEFT OUTER JOIN demande ON demande.id= sousdemande.refdemande " +
      "where demande.id = " + (this.informationsActuelles as any).iddemande +
    " order by sousdemande.id desc")
      .subscribe(data => {
        console.log(data);
        this.listeSousDemandes = (data as any).features;

      });


  }

  creerNouvelleSousDemande(){

    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/insert into sousdemande (refdemande) values (" + (this.informationsActuelles as any).iddemande + ")")
      .subscribe(data => {
        console.log(data);
        this.refresh();


      }, err => {
        this.refresh();

      });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeDemandePage');
  }

  ionViewDidEnter() {
    this.refresh();
  }

  itemTapped(event, item) {

    // That's right, we're pushing to ourselves!
    //On complete nos informations actuelles pour y ajouter les informations concernant le chantier selectionnee

    this.informationsActuelles["idfournisseur"] = item.idfournisseur;
    this.informationsActuelles["idsousdemande"] = item.idsousdemande;
    this.informationsActuelles["raisonsocialefournisseur"] = item.raisonsocialefournisseur;
    this.informationsActuelles["adressefournisseur"] = item.adressefournisseur;
    this.informationsActuelles["emailfournisseur"] = item.emailfournisseur;
    this.informationsActuelles["photobl"] = item.photobl;
    this.informationsActuelles["photofourniture"] = item.photofourniture;
    this.informationsActuelles["numerobl"] = item.numerobl;
    this.informationsActuelles["observations"] = item.observations;
    this.informationsActuelles["datemodificationsousdemande"] = item.datemodificationsousdemande;
    this.informationsActuelles["traitee"] = this.stringToBoolean(item.traitee);
    this.informationsActuelles["validee"] = this.stringToBoolean(item.validee);
    this.informationsActuelles["receptionnee"] = this.stringToBoolean(item.receptionnee);
    this.informationsActuelles["suprimee"] = this.stringToBoolean(item.suprimee);

    this.navCtrl.push(SousDemandePage, {
      informationsActuelles: this.informationsActuelles
    });

  }


  public stringToBoolean(string){

    if(string == "t"){
      return true;
    }
    else{
      return false;
    }

  }

}
