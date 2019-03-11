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

  /* public listeSousDemandes = [
    {"idSousDemande":1228,
      "idFournisseur":564,
      "raisonSocialeFournisseur":'Betton Fourni',
      "photoBL":'',
      "observations":'Des observations de test 1',
      "dateModificationSousDemande":'11/02/2019',
      "sousDemandeTraitee":true,
      "sousDemandeValidee":true,
      "sousDemandeReceptionnee":false,
    },
    {"idSousDemande":1228,
      "idFournisseur":464,
      "raisonSocialeFournisseur":'Betton Maroc',
      "photoBL":'',
      "observations":'Des observations de test 2',
      "dateModificationSousDemande":'18/01/2019',
      "sousDemandeTraitee":true,
      "sousDemandeValidee":true,
      "sousDemandeReceptionnee":true,
    },
    {"idSousDemande":1228,
      "idFournisseur":864,
      "raisonSocialeFournisseur":'LP Kayas',
      "photoBL":'',
      "observations":'Des observations de test 3',
      "dateModificationSousDemande":'11/03/2019',
      "sousDemandeTraitee":true,
      "sousDemandeValidee":false,
      "sousDemandeReceptionnee":false,
    }

  ]; */

  public listeSousDemandes = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

    //on recupere la liste de tout les fournisseurs de la bdd qui sont affecte a ce fournisseur

    console.log(this.navParams.data.informationsActuelles);

    //pour cela on doit dabord recuperer l id de l utilisateur pour voir la liste des fournisseur qui lui sont affectes

    this.informationsActuelles = this.navParams.data.informationsActuelles;

    this.refresh();





  }

  refresh(){

    this.httpClient.get("http://192.168.43.85:9090/requestAny/select fournisseur.adresse as adressefournisseur, fournisseur.email as emailfournisseur, sousdemande.id as idsousdemande, sousdemande.datemodification as datemodificationsousdemande, fournisseur.id as idfournisseur, fournisseur.raisonsociale as raisonsocialefournisseur, * from sousdemande LEFT OUTER JOIN fournisseur ON sousdemande.reffournisseur= fournisseur.id LEFT OUTER JOIN demande ON demande.id= sousdemande.refdemande where demande.id = " + (this.informationsActuelles as any).iddemande)
      .subscribe(data => {
        console.log(data);
        this.listeSousDemandes = (data as any).features;

      });


  }

  creerNouvelleSousDemande(){

    this.httpClient.get("http://192.168.43.85:9090/requestAny/insert into sousdemande (refdemande) values (" + (this.informationsActuelles as any).iddemande + ")")
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

  itemTapped(event, item) {

    // That's right, we're pushing to ourselves!
    //On complete nos informations actuelles pour y ajouter les informations concernant le chantier selectionnee

    this.informationsActuelles["idfournisseur"] = item.idfournisseur;
    this.informationsActuelles["idsousdemande"] = item.idsousdemande;
    this.informationsActuelles["raisonsocialefournisseur"] = item.raisonsocialefournisseur;
    this.informationsActuelles["adressefournisseur"] = item.adressefournisseur;
    this.informationsActuelles["emailfournisseur"] = item.emailfournisseur;
    this.informationsActuelles["photobl"] = item.photobl;
    this.informationsActuelles["observations"] = item.observations;
    this.informationsActuelles["datemodificationsousdemande"] = item.datemodificationsousdemande;
    this.informationsActuelles["traitee"] = item.traitee;
    this.informationsActuelles["validee"] = item.validee;
    this.informationsActuelles["receptionnee"] = item.receptionnee;

    this.navCtrl.push(SousDemandePage, {
      informationsActuelles: this.informationsActuelles
    });

  }

}
