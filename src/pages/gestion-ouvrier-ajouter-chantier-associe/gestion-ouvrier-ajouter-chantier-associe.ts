import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {CameraProvider} from "../../providers/camera/camera";

/**
 * Generated class for the GestionOuvrierAjouterChantierAssociePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-ouvrier-ajouter-chantier-associe',
  templateUrl: 'gestion-ouvrier-ajouter-chantier-associe.html',
})
export class GestionOuvrierAjouterChantierAssociePage {

  //le mode edition se divise en deux modes : le mode modification et le mode creation
  public modeModificationCreation = false; //modeModification est l'opposé du mode Creation
  public modeEditionAffichage = false; //modeAffichage est l'opposé du mode Affichage


  public objetActuel = {};

  //non de la table principale de cette page
  public nomTableActuelle = "chantierouvrierassocie";

  public tableObjetAAssocier = "ouvrier";
  public informationsObjetAAssocier = {};


  public champsPredefinis = [];

  public havePhotoAttribut = false;

  public parametresPost = [];
  public parametresPostLibelle = [];


  //dans l ordre le premier element doit etre l id de la table des associations
  //le second element doit etre la reference de l objet qu'on veut associer a une entitee
  //le troisieme element doit etre la reference de l entitee
  public tableauMappingBDD = [
    ["idchantierenginassocie","id","number"],
    ["refchantierchantierouvrierassocie","refchantier","number"],
    ["refouvrierchantierouvrierassocie","refouvrier","number"]
  ];


  public tableauMappingBDDObjetAAssocier = [
    ["Chantier","nom","text"],
    ["Zone","zone","text"]
  ];


  public enregistrementColonneIgnore = [];

  public listeChoixProjet = [];
  public listeChoixChantier = [];

  public projetAssocie = "";



  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient : HttpClient,public toastCtrl : ToastController,  public cameraProvider : CameraProvider) {


    console.log("bienvenu au constructeur");

    //on recupere les informations recuperees de la bdd
    this.objetActuel = navParams.data.informationsActuelles;

    this.projetAssocie = (navParams.data.informationsActuelles as any).refprojet;


    //on saisie les champs manquants selon les cas
    (this.objetActuel as any) = this.remplirChampManquant(this.objetActuel,this.tableauMappingBDD,[]);

    console.log(this.objetActuel);


    //on initialise les liste de choix
    this.recupererListeChoix("listeChoixProjet","projet","id","nomprojet",[],"",[]);
    this.recupererListeChoix("listeChoixChantier","chantier","id","nom",["projet"],"",["projet.id","chantier.nom"]);


    //si on a des informations dans le navParams alors on va ajouter passer au mode affichage
    if(navParams.data.action &&  navParams.data.action == "ajouter"){


      console.log(this.objetActuel);
      this.modeModificationCreation = false;
      this.modeEditionAffichage = true;


    }
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

    this.actualiserObjetAAssocier();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterChantierPage');
  }

  enregistrerNouvelObjet(){

    this.insertObjet(this.objetActuel,this.nomTableActuelle,this.tableauMappingBDD);

    //console.log(this.navParams.data.parentPage);

    //this.navParams.data.parentPage.refresh();

    this.navCtrl.pop();


  }

  enregistrerModificationObjet(){

    console.log(this.objetActuel);

    this.updatePostObjet(this.objetActuel,this.nomTableActuelle,(this.objetActuel as any)[Object.keys(this.objetActuel as any)[0]],this.tableauMappingBDD,[],this.parametresPost,this.parametresPostLibelle);

    if(!this.havePhotoAttribut){
      this.navCtrl.pop();
    }




  }

  photoChooser(objetActuel , photobgbongasoil ) {
    this.cameraProvider.photoChooser(objetActuel,photobgbongasoil);
  }

  //retourne une liste de choix contenant l'id et le libelle
  recupererListeChoix(nomListeARemplir,nomTableListeChoix,idAttributTable,libelleAttributListe,listeJointures,conditionWhere,listeAttributsSupplementaires){

    for(let pp in this){

      if(pp == nomListeARemplir){

      }

    }

    let listeARemplir = [];
    let requeteGetListChoix = "http://172.20.10.2:9090/requestAny/select distinct " + nomTableListeChoix + "." + idAttributTable + " as "+ idAttributTable +" , " + nomTableListeChoix + "." + libelleAttributListe + " as " + libelleAttributListe;

    if(listeAttributsSupplementaires.length){
      for (let i = 0; i < listeAttributsSupplementaires.length; i++) {

        //on reference apres les autre table de la jointure
        requeteGetListChoix = requeteGetListChoix + ", " + listeAttributsSupplementaires[i] + " as " + listeAttributsSupplementaires[i].split(".")[1] + listeAttributsSupplementaires[i].split(".")[0];

      }
    }
    else{

      for (let i = 0; i < listeJointures.length; i++) {

        //on reference apres les autre table de la jointure
        requeteGetListChoix = requeteGetListChoix + ", " + listeJointures[i] + ".* ";

      }

    }

    requeteGetListChoix = requeteGetListChoix + " from " + nomTableListeChoix;

    for (let i = 0; i < listeJointures.length; i++) {

      //on reference apres les autre table de la jointure
      requeteGetListChoix = requeteGetListChoix + " LEFT JOIN " + listeJointures[i] + " ON " + nomTableListeChoix + ".ref" + listeJointures[i] + " = " + listeJointures[i] + ".id ";

    }

    if(conditionWhere){
      requeteGetListChoix = requeteGetListChoix + " where " + conditionWhere;
    }


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

  getListObjet(nomTableBDD, tableauMappingBDD,complementChamps,filtreWhere,listeJointures,importerLesAttributsEtoile){

    let requeteGetProjet = "http://172.20.10.2:9090/requestAny/select distinct";
    for (let i = 0; i < tableauMappingBDD.length; i++) {

      requeteGetProjet = requeteGetProjet + " " + nomTableBDD + "." + tableauMappingBDD[i][1] + ' as "' + tableauMappingBDD[i][0] + '",';

    }

    if(importerLesAttributsEtoile){
      //dabord on reference la table principale dans le from
      requeteGetProjet = requeteGetProjet + " * " + complementChamps +" from " + nomTableBDD ;
    }
    else{
      requeteGetProjet = requeteGetProjet.substring(0,requeteGetProjet.length-1) + complementChamps +" from " + nomTableBDD ;
    }



    for (let i = 0; i < listeJointures.length; i++) {

      //on reference apres les autre table de la jointure
      requeteGetProjet = requeteGetProjet + " LEFT JOIN " + listeJointures[i] + " ON " + nomTableBDD + ".ref" + listeJointures[i] + " = " + listeJointures[i] + ".id ";

    }

    if(filtreWhere != "" ){
      requeteGetProjet = requeteGetProjet + " where " + filtreWhere;
    }

    requeteGetProjet = requeteGetProjet + " order by " + nomTableBDD + "." +  tableauMappingBDD[0][1] + " desc";


    console.log(requeteGetProjet);
    return this.httpClient.get(requeteGetProjet);

  }

  insertObjet(objetAEnregistrer, nomTableBDD, tableauMappingBDD){

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

  updateGetObjet(objetAEnregistrer, nomTableBDD, idEnregistrementAModifier, tableauMappingBDD,tableauChampAIgnorer){

    //on doit dabord remplir les champs manquants
    objetAEnregistrer = this.remplirChampManquant(objetAEnregistrer, tableauMappingBDD,tableauChampAIgnorer);

    console.log(objetAEnregistrer);

    //debut de la construction de la requete
    let requeteUpdate = "http://172.20.10.2:9090/requestAny/Update " + nomTableBDD + " set";

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
    let requeteUpdate = "http://172.20.10.2:9090/requestAny/Update " + nomTableBDD + " set";

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

  supprimerDoublonsSelonColonnes(tableau,listeColonnesRetenues) {

    let tableauRetour = [];

    for (let i = 0; i < tableau.length; i++) {

      let ligneActuelle = [];

      for (let j = 0; j < listeColonnesRetenues.length; j++) {

        ligneActuelle[listeColonnesRetenues[j]]=tableau[listeColonnesRetenues[j]];

      }

      if(tableauRetour.indexOf(tableau[i])){
        tableauRetour.push(ligneActuelle);
      }


    }

    console.log(tableauRetour);
    return tableauRetour;

  }

  actualiserObjetAAssocier(){
    this.getListObjet(this.tableObjetAAssocier,this.tableauMappingBDDObjetAAssocier,[],this.tableObjetAAssocier + ".id = " + this.objetActuel[this.tableauMappingBDD[1][0]],[],false)
      .subscribe( data => {
        this.informationsObjetAAssocier = (data as any).features[0];
      });
  }

  objetToArray(objet){
    let objetRetour = [];
    for(let pp in objet){
      let T = [pp,objet[pp]];
      objetRetour.push(T);
    }
    console.log(objetRetour);
    return objetRetour;
  }



}

