import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the AjouterNouvelArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-nouvel-article',
  templateUrl: 'ajouter-nouvel-article.html',
})
export class AjouterNouvelArticlePage {
  //le mode edition se divise en deux modes : le mode modification et le mode creation
  public modeModificationCreation = false; //modeModification est l'opposé du mode Creation
  public modeEditionAffichage = false; //modeAffichage est l'opposé du mode Affichage



  public selectProduitFournisseurOptions = {
    title: 'Produits',
    mode: 'md'
  };

  @ViewChild('produitHach') produitTest;

  public tableauMappingBDD = [
    ["idarticle","id","number"],
    ["quantitesaisie","quantitesaisie","number"],
    ["quantiterecuearticle","quantiterecue","number"],
    ["prixarticle","prix","number"],
    ["datelivraison","datelivraison","date"],
    ["idsousdemande","refsousdemande","number"],
    ["refproduitfournisseur","refproduitfournisseur","number"],
    ["tvaarticle","tva","number"],
    ["datereceptionarticle","datereception","date"]
  ];

  public articleActuel = {};

  public listeArticles = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient : HttpClient) {


    this.articleActuel = {};

    console.log(this.articleActuel);


    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select produitfournisseur.id as idproduitfournisseur ,* from produitfournisseur, fournisseur  where produitfournisseur.reffournisseur = fournisseur.id and produitfournisseur.reffournisseur = " + navParams.data.informationsActuelles.idfournisseur)
      .subscribe(data => {
        console.log(data);
        this.listeArticles = (data as any).features;


      });


    //on recupere les informations recuperees de la bdd
    this.articleActuel = navParams.data.informationsActuelles;


    console.log(this.articleActuel);
    //on saisie les champs manquants


    //si on a des informations dans le navParams alors on va ajouter passer au mode affichage
    if(navParams.data.action &&  navParams.data.action == "ajouter"){

      (this.articleActuel as any) = this.remplirChampManquant(this.articleActuel,this.tableauMappingBDD,["quantiterecuearticle","tvaarticle","datereceptionarticle","prixarticle"]);

      console.log(this.articleActuel);
      this.modeModificationCreation = false;
      this.modeEditionAffichage = true;


    }
    else{

      (this.articleActuel as any) = this.remplirChampManquant(this.articleActuel,this.tableauMappingBDD,["quantiterecuearticle","tvaarticle","datereceptionarticle","prixarticle"]);


      this.modeModificationCreation = false;
      this.modeEditionAffichage = false;

    }


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterChantierPage');
    console.log(this.produitTest);
  }

  uniteProduit( idProduitFournisseur){

    let uniteRetour = "";

    for(let i = 0 ; i < this.listeArticles.length ; i++){
      if(this.listeArticles[i].idproduitfournisseur == idProduitFournisseur){
        uniteRetour = this.listeArticles[i].unite;
      }
    }
    return uniteRetour;
  }

  enregistrerNouvelObjet(){

    this.createObjet(this.articleActuel,"article",this.tableauMappingBDD);

    //console.log(this.navParams.data.parentPage);

    //this.navParams.data.parentPage.refresh();

    this.navCtrl.pop();


  }

  enregistrerModificationObjet(){

    console.log(this.articleActuel);

    this.updateObjet(this.articleActuel,"article",(this.articleActuel as any)[Object.keys(this.articleActuel as any)[0]],this.tableauMappingBDD,["quantiterecuearticle","tvaarticle","datereceptionarticle","prixarticle"]);

    this.navCtrl.pop();

  }

  createObjet(objetAEnregistrer, nomTableBDD, tableauMappingBDD){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD,[]);

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

  updateObjet(objetAEnregistrer, nomTableBDD, idEnregistrementAModifier, tableauMappingBDD,tableauChampAIgnorer){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD,tableauChampAIgnorer);

    console.log(objetAEnregistrer);

    //debut de la construction de la requete
    let requeteUpdate = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/Update " + nomTableBDD + " set";


    //apres on doit parcourir tout les champs de notre objet
    for (var property in objetAEnregistrer) {


        // on doit recuperer les informations du mapping
        for(let i = 1; i < tableauMappingBDD.length; i++){

          if(tableauChampAIgnorer.indexOf(tableauMappingBDD[i][0]) < 0) {



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
