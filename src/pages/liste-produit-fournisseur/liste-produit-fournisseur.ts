import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {AjouterProduitFournisseurPage} from "../ajouter-produit-fournisseur/ajouter-produit-fournisseur";

/**
 * Generated class for the ListeProduitFournisseurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-produit-fournisseur',
  templateUrl: 'liste-produit-fournisseur.html',
})
export class ListeProduitFournisseurPage {

  //les informations recuperees d'un push a partir d'une page precedente
  public informationsActuelles = {};


  public objetActuel = {};
  public listeObjetActuelle = [];

  //non de la table principale de cette page
  public nomTableActuelle = "produitfournisseur";

  //la liste des tables suivantes
  public pageDAjout : any = AjouterProduitFournisseurPage;
  public pageSuivante : any = null;


  public tableauMappingBDD = [
    ["idproduitfournisseur","id","number"],
    ["nomproduitfournisseur","nomproduit","text"],
    ["reffournisseur","reffournisseur","number"],
    ["prixhtproduitfournisseur","prixht","number"],
    ["tvaenpourcentageproduitfournisseur","tvaenpourcentage","text"],
    ["uniteproduitfournisseur","unite","text"],
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl : ToastController) {


    this.informationsActuelles = this.navParams.data.informationsActuelles;
    this.refresh();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeProduitFournisseurPage');
  }

  ionViewDidEnter() {
    this.refresh();

  }

  detailItemTapped($event, item){

    event.stopPropagation();

    this.pushInformationsActuelles(item,{},this.pageDAjout,"detailler");

  }

  itemTapped(event, item) {

    this.pushInformationsActuelles(item,{},this.pageSuivante,"passer");

  }

  ajouterItem() {

    this.pushInformationsActuelles(this.informationsActuelles,{},this.pageDAjout,"ajouter");


  }

  refresh(){

    this.getListObjet(this.nomTableActuelle,this.tableauMappingBDD,""," reffournisseur = " + (this.informationsActuelles as any).idfournisseur,[])
      .subscribe(data => {
        this.listeObjetActuelle = (data as any).features;
      });
  }

  pushInformationsActuelles(objetInformationsActuelles,objetComplement,PageSuivante,action){

    //Object.assign(target, source); projet les informations "target" ------> dans les informations de "source"


    let objetFusion = Object.assign(objetComplement,objetInformationsActuelles);

    console.log(objetFusion);
    this.navCtrl.push(PageSuivante, {
      informationsActuelles: objetFusion,
      action: action
    });

  }

  fusionnerObjet(objetInformationsActuelles,objetComplement){
    return Object.assign(objetComplement,objetInformationsActuelles);
  }

  genererListeAttributRequete(nomTableBDD, tableauMappingBDD){

    let attributsRequete = "";
    for (let i = 0; i < tableauMappingBDD.length; i++) {

      attributsRequete = attributsRequete + " " + nomTableBDD + "." + tableauMappingBDD[i][1] + " as " + tableauMappingBDD[i][0] + ",";


    }

    attributsRequete = attributsRequete.substring(0,attributsRequete.length-1);

    return attributsRequete;

  }

  getListObjet(nomTableBDD, tableauMappingBDD,complementChamps,filtreWhere,listeJointures){

    let requeteGetProjet = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select";
    for (let i = 0; i < tableauMappingBDD.length; i++) {

      requeteGetProjet = requeteGetProjet + " " + nomTableBDD + "." + tableauMappingBDD[i][1] + " as " + tableauMappingBDD[i][0] + ",";

    }

    requeteGetProjet = requeteGetProjet + " * " + complementChamps +" from " + nomTableBDD ;

    for(let i = 0 ; i < listeJointures.length ; i++ ){

      requeteGetProjet = requeteGetProjet + ", " + listeJointures[i] + " ";

    }

    if(filtreWhere != "" || listeJointures.length > 0){
      let permiereConditionsaisie = false;
      for(let i = 0 ; i < listeJointures.length ; i++ ){
        if(permiereConditionsaisie){
          requeteGetProjet = requeteGetProjet + " and " + nomTableBDD + "." + tableauMappingBDD[0][1] + " = " + listeJointures[i] + ".id" ;
        }
        else{
          requeteGetProjet = requeteGetProjet + " " + nomTableBDD + "." + tableauMappingBDD[0][1] + " = " + listeJointures[i] + ".id" ;
        }
        permiereConditionsaisie = true;

      }

      if(filtreWhere != ""){

        if(permiereConditionsaisie){
          requeteGetProjet = requeteGetProjet + " and " + filtreWhere ;
        }
        else{
          requeteGetProjet = requeteGetProjet + " where " + filtreWhere ;

        }

      }


    }


    requeteGetProjet = requeteGetProjet + " order by " + tableauMappingBDD[0][1] + " desc";


    console.log(requeteGetProjet);
    return this.httpClient.get(requeteGetProjet);

  }

  insertObjet(objetAEnregistrer, nomTableBDD, tableauMappingBDD){

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

  updateGetObjet(objetAEnregistrer, nomTableBDD, idEnregistrementAModifier, tableauMappingBDD,tableauChampAIgnorer){

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
    let requeteUpdateGet = requeteUpdate.substring(0, requeteUpdate.length - 1);


    requeteUpdateGet = requeteUpdateGet + " where " + tableauMappingBDD[0][1] + " = " + idEnregistrementAModifier;

    //enregistrement des parametres attributaires
    this.httpClient.get(requeteUpdateGet).subscribe(data => {

      console.log(data);

    },err => {

      let messageGetToast = "Informations attributaires enregistrées";

      if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête." || err.error.message == "org.postgresql.util.PSQLException: No results were returned by the query."){

        let toast = this.toastCtrl.create({
          message: messageGetToast,
          duration: 1000,
          position: 'top',
          cssClass: "toast-success"
        });

        toast.present();



      }
      else{
        messageGetToast = "Informations attributaires non enregistrées";

        let toast = this.toastCtrl.create({
          message: messageGetToast,
          duration: 1000,
          position: 'top',
          cssClass: "toast-echec"
        });

        toast.present();

      }


    });







  }

  updatePostObjet(objetAEnregistrer, nomTableBDD, idEnregistrementAModifier, tableauMappingBDD,tableauChampAIgnorer,parametresPost,parametresPostLibelle){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD,tableauChampAIgnorer);

    console.log(objetAEnregistrer);

    //debut de la construction de la requete
    let requeteUpdate = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/Update " + nomTableBDD + " set";

    //apres on doit parcourir tout les champs de notre objet
    for (var property in objetAEnregistrer) {

      if( ! parametresPost.includes(property) ){

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

    }





    //on doit enlever la derniere virgule
    let requeteUpdateGet = requeteUpdate.substring(0, requeteUpdate.length - 1);


    requeteUpdateGet = requeteUpdateGet + " where " + tableauMappingBDD[0][1] + " = " + idEnregistrementAModifier;

    //enregistrement des parametres attributaires
    this.httpClient.get(requeteUpdateGet).subscribe(data => {

      console.log(data);

    },err => {

      let messageGetToast = "Informations attributaires enregistrées";

      if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête." || err.error.message == "org.postgresql.util.PSQLException: No results were returned by the query."){

        let toast = this.toastCtrl.create({
          message: messageGetToast,
          duration: 1000,
          position: 'top',
          cssClass: "toast-success"
        });

        toast.present();



      }
      else{
        messageGetToast = "Informations attributaires non enregistrées";

        let toast = this.toastCtrl.create({
          message: messageGetToast,
          duration: 1000,
          position: 'top',
          cssClass: "toast-echec"
        });

        toast.present();

      }


    });


    //enregistrement des parametres post
    for(let i = 0; i < parametresPost.length; i++){

      //on doit enlever la derniere virgule
      let requeteUpdatePost = requeteUpdate + " " + parametresPost[i] + " = " + "'postBody' ";

      //preparation de la requete
      requeteUpdatePost = requeteUpdatePost + " where " + tableauMappingBDD[0][1] + " = " + idEnregistrementAModifier;

      //recuperation des informations du post
      let body = objetAEnregistrer[parametresPost[i]];

      if(!body){
        body = "NULL";
        console.log("aucune photo");
      }


      this.httpClient.post(requeteUpdatePost,

        body)

        .subscribe(data => {

          console.log(data);

        },err => {

          let messageToastPost = "Informations " + parametresPostLibelle[i] +  " enregistrées";

          if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête." || err.error.message == "org.postgresql.util.PSQLException: No results were returned by the query."){


            this.httpClient.post( requeteUpdate,

              body)

              .subscribe(data2 => {

                console.log(data2);

              },err2 => {



              });


            let toast = this.toastCtrl.create({
              message: messageToastPost,
              duration: Number((2*i +3).toString() + '000'),
              position: 'top',
              cssClass: "toast-success"
            });

            toast.present();

          }
          else{

            messageToastPost = "Informations " + parametresPostLibelle[i] +  " non enregistrées";

            let toast = this.toastCtrl.create({
              message: messageToastPost,
              duration: Number((2*i +3).toString() + '000'),
              position: 'top',
              cssClass: "toast-echec"
            });

            toast.present();

          }

        });


    }



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
}
