import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListeSousDemandePage} from "../liste-sous-demande/liste-sous-demande";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the ListeDemandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-demande',
  templateUrl: 'liste-demande.html',
})
export class ListeDemandePage {

  public informationsActuelles = {};

  public listeDemandes = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;

    this.httpClient.get("http://localhost:9090/requestAny/select utilisateur.nom as nomdemandeur,  utilisateur.prenom as prenomdemandeur, demande.id as iddemande , *  from chantier, demande, utilisateur where  demande.refutilisateur = utilisateur.id and demande.refchantier = chantier.id  and chantier.id = " + (this.informationsActuelles as any).idchantier)
      .subscribe(data => {
        console.log(data);
        this.listeDemandes = (data as any).features;

      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeDemandePage');
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    //On complete nos informations actuelles pour y ajouter les informations concernant le chantier selectionnee
    this.informationsActuelles["iddemande"] = item.iddemande;
    this.informationsActuelles["datedemande"] = item.datedemande;
    this.informationsActuelles["iddemandeur"] = item.iddemandeur;
    this.informationsActuelles["nomdemandeur"] = item.nomdemandeur;
    this.informationsActuelles["prenomdemandeur"] = item.nomdemandeur;
    this.navCtrl.push(ListeSousDemandePage, {
      informationsActuelles: this.informationsActuelles
    });
  }


}
