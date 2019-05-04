import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the AjouterProjetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-projet',
  templateUrl: 'ajouter-projet.html',
})
export class AjouterProjetPage {

  public listeRegions = [];
  public listeChefsProjet = [];

  //le mode edition se divise en deux modes : le mode modification et le mode creation
  public modeModificationCreation = false; //modeModification est l'opposé du mode Creation
  public modeEditionAffichage = false; //modeAffichage est l'opposé du mode Affichage


  public projetActuel = {
    idprojet:"",
    nomprojet: "",
    objetprojet: "",
    montantprojet: "NULL",
    delaisrealisationprojet: "",
    nomregion: "",
    numeromarcheprojet: "",
    maitredouvrageprojet: "",
    bureaudetudeprojet: "",
    laboratoireprojet: "",
    bureaudecontrole: "",
    dateordreservice: "NULL",
    chefsprojet: "NULL",
    idregion: "NULL",
    chefdeprojet: "NULL"

  };


  public selectRegionsOptions = {
    title: 'Regions',
    mode: 'md'
  };

  public selectChefProjetsOptions = {
    title: 'Chefs de projet',
    mode: 'md'
  };
  public tableauMappingBDD = [
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient : HttpClient) {

    console.log(navParams);

    //si on a des informations dans le navParams alors on va ajouter passer au mode affichage
    if(navParams.data.informationsActuelles != ""){

      for (var property in navParams.data.informationsActuelles) {
        if(navParams.data.informationsActuelles[property] != null){
          this.projetActuel[property] = navParams.data.informationsActuelles[property];
        }
      }

      console.log(this.projetActuel);

      this.modeModificationCreation = false;
      this.modeEditionAffichage = false;
      this.projetActuel = navParams.data.informationsActuelles;

    }
    else{
      this.modeModificationCreation = false;
      this.modeEditionAffichage = true;
      let tableauMappingBDDParam = this.tableauMappingBDD;
      (this.projetActuel as any) = this.initialiserObjetBDD(this.projetActuel,tableauMappingBDDParam);
      console.log(this.projetActuel);


    }


    //on recupere la liste des regions
    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select * from region")
      .subscribe(data => {
        console.log(data);

        this.listeRegions = (data as any).features;

      });

    //on recupere la liste des utilisateurs
    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select * from utilisateur")
      .subscribe(data => {
        console.log(data);

        this.listeChefsProjet = (data as any).features;

      });

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterProjetPage');
  }

  enregistrerNouveauProjet(){

    this.createObjet(this.projetActuel,"projet",this.tableauMappingBDD);

    //console.log(this.navParams.data.parentPage);

    //this.navParams.data.parentPage.refresh();

    this.navCtrl.pop();


  }

  enregistrerModificationProjet(){

    console.log(this.projetActuel);

    this.updateObjet(this.projetActuel,"projet",this.projetActuel.idprojet,this.tableauMappingBDD);

    this.navCtrl.pop();


  }

  createObjet(objetAEnregistrer, nomTableBDD, tableauMappingBDD){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD);

    //debut de la construction de la requete
    let requeteUpdate = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/insert into " + nomTableBDD + " (";

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
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD);

    console.log(objetAEnregistrer);

    //debut de la construction de la requete
    let requeteUpdate = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/Update " + nomTableBDD + " set";


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

  remplirChampManquant(objetBDD , tableauMappingBDD ){

    console.log(objetBDD);

    let objetBDDRempli = new Object();

    for(let i = 0; i < tableauMappingBDD.length; i++){

      //on initialise d'abord l'objet
      if(tableauMappingBDD[i][2] == "number" || tableauMappingBDD[i][2] == "date"){
        objetBDDRempli[tableauMappingBDD[i][0]] = "NULL";
      }
      //sinon le champ sera de type text
      else{
        objetBDDRempli[tableauMappingBDD[i][0]] = "";
      }

      //apres on doit chercher si ce champ est deja renseignés dans l objet et qui ne sont pas null
      for (var property in objetBDD) {
        //une fois le cemp trouve on doti verifier si il est null
        if (property == tableauMappingBDD[i][0] && objetBDD[property] != null) {
          objetBDDRempli[property] = objetBDD[property];
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
