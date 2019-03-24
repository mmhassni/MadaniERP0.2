import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the AjouterChantierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-chantier',
  templateUrl: 'ajouter-chantier.html',
})
export class AjouterChantierPage {

  //le mode edition se divise en deux modes : le mode modification et le mode creation
  public modeModificationCreation = false; //modeModification est l'opposé du mode Creation
  public modeEditionAffichage = false; //modeAffichage est l'opposé du mode Affichage

  public tableauMappingBDD = [
    ["idchantier","id","number"],
    ["nomchantier","nom","text"],
    ["zonechantier","zone","text"],
    ["refprojet","refprojet","number"]
  ];

  public chantierActuel = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient : HttpClient) {


    //on recupere les informations recuperees de la bdd
    this.chantierActuel = navParams.data.informationsActuelles;

    console.log(this.chantierActuel);

    //on saisie les champs manquants


    //si on a des informations dans le navParams alors on va ajouter passer au mode affichage
    if(navParams.data.action &&  navParams.data.action == "ajouterChantier"){

      (this.chantierActuel as any) = this.remplirChampManquant(this.chantierActuel,this.tableauMappingBDD,["nomchantier","zonechantier"]);

      console.log(this.chantierActuel);
      this.modeModificationCreation = false;
      this.modeEditionAffichage = true;


    }
    else{

      (this.chantierActuel as any) = this.remplirChampManquant(this.chantierActuel,this.tableauMappingBDD,[]);

      this.modeModificationCreation = false;
      this.modeEditionAffichage = false;

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterChantierPage');
  }

  enregistrerNouvelObjet(){

    this.createObjet(this.chantierActuel,"chantier",this.tableauMappingBDD);

    //console.log(this.navParams.data.parentPage);

    //this.navParams.data.parentPage.refresh();

    this.navCtrl.pop();


  }

  enregistrerModificationObjet(){

    console.log(this.chantierActuel);

    this.updateObjet(this.chantierActuel,"chantier",(this.chantierActuel as any)[Object.keys(this.chantierActuel as any)[0]],this.tableauMappingBDD);

    this.navCtrl.pop();


  }

  createObjet(objetAEnregistrer, nomTableBDD, tableauMappingBDD){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD,[]);

    //debut de la construction de la requete
    let requeteUpdate = "http://172.20.10.2:9090/requestAny/insert into " + nomTableBDD + " (";

    //on commence par l'indice 1 pour ne pas inclure la cle de la table
    for (let i = 1; i < tableauMappingBDD.length; i++){

      requeteUpdate = requeteUpdate + tableauMappingBDD[i][1] + ",";

    }

    //on enleve la derniere virgule
    requeteUpdate = requeteUpdate.substring(0, requeteUpdate.length - 1);
    requeteUpdate = requeteUpdate + ") values (";

    //apres on doit parcourir tout les champs de notre objet
    for (var property in objetAEnregistrer) {

      // on doit recuperer les informations du mapping
      for(let i = 1; i < tableauMappingBDD.length; i++){

        if( property == tableauMappingBDD[i][0]){

          if(tableauMappingBDD[i][2] == "text"){

            requeteUpdate = requeteUpdate + "'" + objetAEnregistrer[property] + "',";

          }

          else if(tableauMappingBDD[i][2] == "date"){

            if(objetAEnregistrer[property] != "NULL"){
              objetAEnregistrer[property] = "'" + objetAEnregistrer[property] + "'";
            }
            requeteUpdate = requeteUpdate + "" + objetAEnregistrer[property] + ",";

          }
          //les autres cas se traitent de la meme facon
          else{
            requeteUpdate = requeteUpdate + "" + objetAEnregistrer[property] + ",";
          }

        }

      }

    }

    //on doit enlever la derniere virgule
    requeteUpdate = requeteUpdate.substring(0, requeteUpdate.length - 1);
    requeteUpdate = requeteUpdate + ")";



    this.httpClient.get(requeteUpdate)
      .subscribe(data => {
        console.log(data);

      });


  }

  updateObjet(objetAEnregistrer, nomTableBDD, idEnregistrementAModifier, tableauMappingBDD){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD,[]);

    console.log(objetAEnregistrer);

    //debut de la construction de la requete
    let requeteUpdate = "http://172.20.10.2:9090/requestAny/Update " + nomTableBDD + " set";


    //apres on doit parcourir tout les champs de notre objet
    for (var property in objetAEnregistrer) {



      // on doit recuperer les informations du mapping
      for(let i = 0; i < tableauMappingBDD.length; i++){


        //si on trouve les informations du mapping
        if( property == tableauMappingBDD[i][0]){



          if(tableauMappingBDD[i][2] == "text"){
            requeteUpdate = requeteUpdate + " " + tableauMappingBDD[i][1] + " = '" + objetAEnregistrer[property] + "',";
          }

          else if(tableauMappingBDD[i][2] == "date"){
            if(objetAEnregistrer[property] != "NULL"){
              objetAEnregistrer[property] = "'" + objetAEnregistrer[property] + "'";
            }
            requeteUpdate = requeteUpdate + " " + tableauMappingBDD[i][1] + " = " + objetAEnregistrer[property] + ",";
          }

          //les autres cas se traitent de la meme facon
          else{
            requeteUpdate = requeteUpdate + " " + tableauMappingBDD[i][1] + " = " + objetAEnregistrer[property] + ",";
          }

        }

      }

    }

    //on doit enlever la derniere virgule
    requeteUpdate = requeteUpdate.substring(0, requeteUpdate.length - 1);


    requeteUpdate = requeteUpdate + " where " + tableauMappingBDD[0][1] + " = " + idEnregistrementAModifier;

    this.httpClient.get(requeteUpdate)
      .subscribe(data => {
        console.log(data);

      });


  }

  remplirChampManquant(objetBDD , tableauMappingBDD, tableauChampAIgnorer ){

    console.log(objetBDD);

    let objetBDDRempli = new Object();

    objetBDDRempli = this.initialiserObjetBDD(objetBDD,tableauMappingBDD);

    for(let i = 0; i < tableauMappingBDD.length; i++){

      if(tableauChampAIgnorer.indexOf(tableauMappingBDD[i][0]) < 0) {

        //apres on doit chercher si ce champ est deja renseignés dans l objet et qui ne sont pas null
        for (var property in objetBDD) {
          //une fois le cemp trouve on doti verifier si il est null
          if (property == tableauMappingBDD[i][0] && objetBDD[property] != null) {
            objetBDDRempli[property] = objetBDD[property];
          }
        }
      }

    }

    console.log(objetBDDRempli);

    return objetBDDRempli;

  }

  initialiserObjetBDD(objetBDD, tableauMappingBDDPar ){



    let tableauMappingBDD = tableauMappingBDDPar.slice();

    let objetBDDInitialise = {};

    for(let i = 0; i < tableauMappingBDD.length; i++){

      //on initialise d'abord l'objet
      if(tableauMappingBDD[i][2] == "number" || tableauMappingBDD[i][2] == "date"){
        objetBDDInitialise[tableauMappingBDD[i][0]] = "NULL";
      }
      //sinon le champ sera de type text
      else{
        objetBDDInitialise[tableauMappingBDD[i][0]] = "";
      }

    }

    return objetBDDInitialise;

  }

  modeEdition() {
    this.modeModificationCreation = true;
    this.modeEditionAffichage = true;
  }


}
