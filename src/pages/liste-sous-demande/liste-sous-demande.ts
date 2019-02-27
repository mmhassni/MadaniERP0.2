import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  public listeSousDemandes = [
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

  ];



  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeDemandePage');
  }

  itemTapped(event, item) {

    // That's right, we're pushing to ourselves!
    //On complete nos informations actuelles pour y ajouter les informations concernant le chantier selectionnee
    this.informationsActuelles["idFournisseur"] = item.idFournisseur;
    this.informationsActuelles["raisonSocialeFournisseur"] = item.raisonSocialeFournisseur;
    this.informationsActuelles["photoBL"] = item.photoBL;
    this.informationsActuelles["observations"] = item.observations;
    this.informationsActuelles["dateModificationSousDemande"] = item.dateModificationSousDemande;
    this.informationsActuelles["sousDemandeTraitee"] = item.sousDemandeTraitee;
    this.informationsActuelles["sousDemandeValidee"] = item.sousDemandeValidee;
    this.informationsActuelles["sousDemandeReceptionnee"] = item.sousDemandeReceptionnee;

    this.navCtrl.push(ListeSousDemandePage, {
      informationsActuelles: this.informationsActuelles
    });

  }

}
