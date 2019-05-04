import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {CameraProvider} from "../../providers/camera/camera";


/**
 * Generated class for the SuiviGasoilAjouterBonGasoilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suivi-gasoil-ajouter-bon-gasoil',
  templateUrl: 'suivi-gasoil-ajouter-bon-gasoil.html',
})
export class SuiviGasoilAjouterBonGasoilPage {

  //le mode edition se divise en deux modes : le mode modification et le mode creation
  public modeModificationCreation = false; //modeModification est l'opposé du mode Creation
  public modeEditionAffichage = false; //modeAffichage est l'opposé du mode Affichage


  public objetActuel = {};

  //non de la table principale de cette page
  public nomTableActuelle = "bongasoil";

  public champsPredefinis = ["refchantierbongasoil"];

  public havePhotoAttribut = true;

  public parametresPost = ["photobgbongasoil"];
  public parametresPostLibelle = ["Photo Bon Gasoil"];


  public plateformeIsIOS = false;

  public tableauMappingBDD = [
    ["idbongasoil","id","id"],
    ["photobgbongasoil","photobg","text"],
    ["prixunitairebongasoil","prixunitaire","number"],
    //["datebongasoil","date","date"],
    ["quantitegasoilbongasoil","quantitegasoil","number"],
    ["montantgasoilbongasoil","montantgasoil","number"],
    ["refchantierbongasoil","refchantier","number"],
    ["refvehiculebongasoil","refvehicule","number"],
    ["refstationbongasoil","refstation","number"],
    ["nompersonnelbongasoil","nompersonnel","text"]

  ];

  public enregistrementColonneIgnore = [];

  public typeVehicule : any;

  public listeChoixTypesVehicule = [];
  public listeChoixTypesEngin = [];
  public listeChoixVehicule = [];
  public listeChoixStation = [];



  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient : HttpClient,public toastCtrl : ToastController, public cameraProvider : CameraProvider) {


    console.log("bienvenu au constructeur");

    //on recupere les informations recuperees de la bdd
    this.objetActuel = navParams.data.informationsActuelles;

    console.log(navParams.data.informationsActuelles);

    //on saisie les champs manquants selon les cas
    (this.objetActuel as any) = this.remplirChampManquant(this.objetActuel,this.tableauMappingBDD,[]);
    //(this.objetActuel as any).refchantier = navParams.data.informationsActuelles.idchantier;

    //on initialise les liste de choix
    this.recupererListeChoix("listeChoixTypesVehicule","typevehicule","id","nomtype");
    this.recupererListeChoix("listeChoixTypesEngin","typeengin","id","nomtypeengin");
    this.recupererListeChoix("listeChoixVehicule","vehicule","id","matricule");
    this.recupererListeChoix("listeChoixStation","station","id","nom");

    console.log(this.objetActuel);


    //si on a des informations dans le navParams alors on va ajouter passer au mode affichage
    if(navParams.data.action &&  navParams.data.action == "ajouter"){


      console.log(this.objetActuel);
      this.modeModificationCreation = false;
      this.modeEditionAffichage = true;


    }
    // cad le mode detail ou le mode modification
    else{


      console.log(this.objetActuel);
      this.modeModificationCreation = false;
      this.modeEditionAffichage = false;

      //si l'objet est vide alors on doit passer directement au mode edition
      if(this.objectIsFrameworklyNull(this.objetActuel,this.champsPredefinis)){

        this.modeModificationCreation = true;
        this.modeEditionAffichage = true;

      }

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterChantierPage');
  }

  enregistrerNouvelObjet(){

    (this.objetActuel as any).datebongasoil = (new Date()).toISOString().substring(0,10)+" "+(new Date()).toISOString().substring(11,19);


    this.insertObjet(this.objetActuel,this.nomTableActuelle,this.tableauMappingBDD);

    //console.log(this.navParams.data.parentPage);

    //this.navParams.data.parentPage.refresh();

    this.navCtrl.pop();


  }

  enregistrerModificationObjet(){

    console.log(this.objetActuel);

    this.updatePostObjet(this.objetActuel,this.nomTableActuelle,(this.objetActuel as any)[Object.keys(this.objetActuel as any)[0]],this.tableauMappingBDD,[],this.parametresPost,this.parametresPostLibelle);

    this.navCtrl.pop();



  }


  photoChooser(objetActuel , photobgbongasoil ) {
    this.cameraProvider.photoChooser(objetActuel,photobgbongasoil);
  }

  //retourne une liste de choix contenant l'id et le libelle
  recupererListeChoix(nomListeARemplir,nomTableListeChoix,idAttributTable,libelleAttributListe){



    let listeARemplir = [];
    let requeteGetListChoix = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select " + idAttributTable + ", " + libelleAttributListe + ",* from " + nomTableListeChoix;

    this.httpClient.get(requeteGetListChoix).subscribe( data => {

      listeARemplir = (data as any).features;
      console.log(listeARemplir);

      for(let pp in this){
        if(pp == nomListeARemplir){

          console.log(pp);
          console.log(this[pp]);
          this[pp] = listeARemplir;
          console.log(this[pp]);

        }
      }


    });

  }

  fusionnerObjet(objetInformationsActuelles,objetComplement){
    return Object.assign(objetComplement,objetInformationsActuelles);
  }

  pushInformationsActuelles(objetInformationsActuelles,objetComplement,PageSuivante,action){

    //Object.assign(target, source); projet les informations "target" ------> dans les informations de "source"


    this.navCtrl.push(PageSuivante, {
      informationsActuelles: objetComplement,
      action: action
    });

  }

  getListObjet(nomTableBDD, tableauMappingBDD){

    let requeteGetProjet = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select";
    for (let i = 0; i < tableauMappingBDD.length; i++) {

      requeteGetProjet = requeteGetProjet + " " + tableauMappingBDD[i][1] + " as " + tableauMappingBDD[i][0] + ",";

    }

    requeteGetProjet = requeteGetProjet + " * from " + nomTableBDD + " order by " + tableauMappingBDD[0][1] + " desc";

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

  /*
  insertPostObjet(objetAEnregistrer, nomTableBDD, idEnregistrementAModifier, tableauMappingBDD,tableauChampAIgnorer,parametresPost,parametresPostLibelle){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD,tableauChampAIgnorer);

    console.log(objetAEnregistrer);

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

      if( ! parametresPost.includes(property) ){

        // on doit recuperer les informations du mapping
        for(let i = 1; i < tableauMappingBDD.length; i++){

          if(tableauChampAIgnorer.indexOf(tableauMappingBDD[i][0]) < 0) {



            //si on trouve les informations du mapping
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

      }

    }


    //on doit enlever la derniere virgule
    requeteUpdate = requeteUpdate.substring(0, requeteUpdate.length - 1);
    requeteUpdate = requeteUpdate + ")";



    //enregistrement des parametres attributaires
    this.httpClient.get(requeteUpdate).subscribe(data => {

      console.log(data);

    },err => {

      let messageGetToast = "Informations attributaires enregistrées";

      if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête."){

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

          if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête."){


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
  */

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

      if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête."){

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

      if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête."){

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

      let parametreFrameworkPhoto = "";

      for(let j = 0; j < this.tableauMappingBDD.length;j++){

        if(this.tableauMappingBDD[j][0] == parametresPost[i]){

          parametreFrameworkPhoto = this.tableauMappingBDD[j][1];

        }

      }

      //on doit enlever la derniere virgule
      let requeteUpdatePost = requeteUpdate + " " + parametreFrameworkPhoto + " = " + "'postBody' ";

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

          if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête."){


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

  objectIsFrameworklyNull(objetATester,champsPredefinis){

    let objectIsFrameworklyNull = true;
    for(let i = 1 ; i < this.tableauMappingBDD.length; i++){

      if(objetATester[this.tableauMappingBDD[i][0]] != '' && objetATester[this.tableauMappingBDD[i][0]] != 'NULL' && champsPredefinis.indexOf(this.tableauMappingBDD[i][0]) < 0){
        objectIsFrameworklyNull = false;
        console.log(this.tableauMappingBDD[i][0]);
      }
    }


    return objectIsFrameworklyNull;

  }

  modeEdition() {
    this.modeModificationCreation = true;
    this.modeEditionAffichage = true;
  }


}
