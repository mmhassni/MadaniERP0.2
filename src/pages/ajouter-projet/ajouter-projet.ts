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
    nummarcheprojet: "",
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
    ["refregion","refregion","number"],
    ["numeromarche","numeromarche","text"],
    ["maitredouvrage","maitredouvrage","text"],
    ["laboratoire","laboratoire","text"],
    ["bureaudetude","bureaudetude","text"],
    ["bureaudecontrole","bureaudecontrole","text"],
    ["dateordreservice","dateordreservice","number"],
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

    this.httpClient.get("http://192.168.43.85:9090/requestAny/select * from region")
      .subscribe(data => {
        console.log(data);

        this.listeRegions = (data as any).features;

      });


    this.httpClient.get("http://192.168.43.85:9090/requestAny/select * from utilisateur")
      .subscribe(data => {
        console.log(data);

        this.listeChefsProjet = (data as any).features;

      });

  }


  enregistrerNouveauProjet() {


    if(this.projetActuel.dateordreservice != "NULL"){
      this.projetActuel.dateordreservice = "'" + this.projetActuel.dateordreservice + "'";
    }

    console.log(this.projetActuel.dateordreservice);



    this.httpClient.get("http://192.168.43.85:9090/requestAny/" +
      "INSERT%20INTO%20projet%20(nomprojet,objetprojet,montantprojet,delaisrealisation,%22refregion%22,%22numeromarche%22,%22maitredouvrage%22,%22laboratoire%22,%22bureaudetude%22,%22bureaudecontrole%22,%22dateordreservice%22,%22chefdeprojet%22)%20" +
      "values%20" +
      "(" +
      "'" + this.projetActuel.nomprojet +"'," +
      "'" + this.projetActuel.objetprojet +"'," +
      "" + this.projetActuel.montantprojet + "," +
      "'"+ this.projetActuel.delaisrealisationprojet +"'," +
      "" + this.projetActuel.idregion + "," +
      "'"+ this.projetActuel.nummarcheprojet +"'" +
      ",'"+ this.projetActuel.maitredouvrageprojet +"'" +
      ",'"+ this.projetActuel.laboratoireprojet +"'" +
      ",'" + this.projetActuel.bureaudetudeprojet + "'" +
      ",'" + this.projetActuel.bureaudecontrole + "'" +
      "," + this.projetActuel.dateordreservice + "," +
      "" + this.projetActuel.chefdeprojet + "" +
      ")")
      .subscribe(data => {
        console.log(data);

        this.listeChefsProjet = (data as any).features;

      });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterProjetPage');
  }



  enregistrerModificationProjet2(){

    this.updateObjet(this.projetActuel,"projet",this.projetActuel.idprojet,this.tableauMappingBDD);

    this.navCtrl.pop();


  }

  enregistrerModificationProjet() {


    console.log(this.projetActuel);







    let projetActuelAModifier = {
      idprojet:"",
      nomprojet: "",
      objetprojet: "",
      montantprojet: "NULL",
      delaisrealisationprojet: "",
      nomregion: "",
      nummarcheprojet: "",
      maitredouvrageprojet: "",
      bureaudetudeprojet: "",
      laboratoireprojet: "",
      bureaudecontrole: "",
      dateordreservice: "NULL",
      chefsprojet: "NULL",
      idregion: "NULL",
      chefdeprojet: "NULL"

    };

    // on doit remplir les informations qui ne sont pas null
    for (var property in this.projetActuel) {
      if(this.projetActuel[property] != null){
        projetActuelAModifier[property] = this.projetActuel[property];
      }
    }


    if(this.projetActuel.dateordreservice != "NULL"){
      projetActuelAModifier["dateordreservice"] = "'" + this.projetActuel.dateordreservice + "'";
    }



    this.httpClient.get("http://192.168.43.85:9090/requestAny/" +
      "Update projet set " +
      "%20" +
      "%20" +
      "nomprojet = '" + projetActuelAModifier.nomprojet +"' ," +
      "objetprojet = '" + projetActuelAModifier.objetprojet +"'," +
      "montantprojet = " + projetActuelAModifier.montantprojet + "," +
      "delaisrealisation = '"+ projetActuelAModifier.delaisrealisationprojet +"'," +
      "refregion = " + projetActuelAModifier.idregion + "," +
      "numeromarche = '"+ projetActuelAModifier.nummarcheprojet +"'" +
      ", maitredouvrage ='"+ projetActuelAModifier.maitredouvrageprojet +"'" +
      ", laboratoire ='"+ projetActuelAModifier.laboratoireprojet +"'" +
      ",bureaudetude ='" + projetActuelAModifier.bureaudetudeprojet + "'" +
      ", bureaudecontrole ='" + projetActuelAModifier.bureaudecontrole + "'" +
      ", dateordreservice = " + projetActuelAModifier.dateordreservice + "," +
      " chefdeprojet = " + projetActuelAModifier.chefdeprojet + "" +
      " where id = " + projetActuelAModifier.idprojet)
      .subscribe(data => {
        console.log(data);

        this.listeChefsProjet = (data as any).features;

      });


  }



  updateObjet(objetAEnregistrer, nomTableBDD, idEnregistrementAModifier, tableauMappingBDD){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD);

    //debut de la construction de la requete
    let requeteUpdate = "http://192.168.43.85:9090/requestAny/Update " + nomTableBDD + " set";


    //apres on doit parcourir tout les champs de notre objet
    for (var property in objetAEnregistrer) {

      // on doit recuperer les informations du mapping
      for(let i = 0; i < tableauMappingBDD.length; i++){

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

    console.log(tableauMappingBDD);

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
