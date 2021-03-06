import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {CameraProvider} from "../../providers/camera/camera";

/**
 * Generated class for the ModelAssocierObjetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-model-associer-objet',
  templateUrl: 'model-associer-objet.html',
})
export class ModelAssocierObjetPage {

  //le mode edition se divise en deux modes : le mode modification et le mode creation
  public modeModificationCreation = false; //modeModification est l'opposé du mode Creation
  public modeEditionAffichage = false; //modeAffichage est l'opposé du mode Affichage


  public objetActuel = {};

  //non de la table principale de cette page
  public nomTableActuelle = "chantierenginassocie";

  public tableObjetAAssocier = "vehicule";
  public informationsObjetAAssocier = {};


  public champsPredefinis = [];

  public havePhotoAttribut = true;

  public parametresPost = [];
  public parametresPostLibelle = [];


  //dans l ordre le premier element doit etre l id de la table des associations
  //le second element doit etre la reference de l objet qu'on veut associer a une entitee
  //le troisieme element doit etre la reference de l entitee
  public tableauMappingBDD = [
    ["idchantierenginassocie","id","number"],
    ["refvehiculechantierenginassocie","refvehicule","number"],
    ["refchantierchantierenginassocie","refchantier","number"]
  ];


  public tableauMappingBDDObjetAAssocier = [
    ["Matricule","matricule","text"],
    ["Marque","marque","text"],
    ["Model","model","number"],
    ["Location","location","text"],
    ["Prix location","prixlocation","number"],
    ["Entreprise","raisonsocialelocation","text"]
  ];


  public enregistrementColonneIgnore = [];

  public listeChoixTypeEngin = [];
  public listeChoixObjetAssocieEtNonAssocie = [];

  public attributAssocie = "";
  public typeEngin = "";



  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient : HttpClient,public toastCtrl : ToastController,  public cameraProvider : CameraProvider) {


    console.log("bienvenu au constructeur");

    //on recupere les informations recuperees de la bdd
    this.objetActuel = navParams.data.informationsActuelles;



    //on saisie les champs manquants selon les cas
    (this.objetActuel as any) = this.remplirChampManquant(this.objetActuel,this.tableauMappingBDD,[]);

    console.log(this.objetActuel);


    //on initialise les liste de choix
    this.recupererListeChoix("listeChoixTypeEngin","typeengin","id","nomtypeengin",[],"",[]);
    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/" +
      "select "+ this.tableObjetAAssocier +".* , nombreassociation " +
      "from "+ this.tableObjetAAssocier +" left join " +
      "(select "+ this.tableauMappingBDD[1][1] +" , count(*) as nombreassociation " +
      "from "+ this.nomTableActuelle +" " +
      "where not " + this.tableauMappingBDD[2][1] + " is null" +
      " group by " + this.tableauMappingBDD[1][1] +  ") as RF " +
      "on "+ this.tableObjetAAssocier +".id = RF." + this.tableauMappingBDD[1][1] +
      " where reftypevehicule = 2" ) //condition a supprimer pour le cas generique
      .subscribe( data => {
        console.log(data);
        this.listeChoixObjetAssocieEtNonAssocie = (data as any).features;
      });

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

  recupererListeChoix(nomListeARemplir,nomTableListeChoix,idAttributTable,libelleAttributListe,listeJointures,conditionWhere,listeAttributsSupplementaires){

    for(let pp in this){

      if(pp == nomListeARemplir){

      }

    }

    let listeARemplir = [];
    let requeteGetListChoix = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select distinct " + nomTableListeChoix + "." + idAttributTable + " as "+ idAttributTable +" , " + nomTableListeChoix + "." + libelleAttributListe + " as " + libelleAttributListe;

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
          this[pp.toString()] = listeARemplir;
          console.log(this[pp]);

        }
      }


    });

  }


  genererLeftJoin(nomTableBDD,tableRef){
    return "LEFT JOIN " + tableRef + " ON " + tableRef + ".id = " + nomTableBDD + ".ref" + tableRef;
  }

  getListObjet(nomTableBDD, tableauMappingBDD,complementChamps,filtreWhere,listeJointures,importerLesAttributsEtoile){

    let requeteGetProjet = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select distinct";
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

  insertPostObjet(objetAEnregistrer, nomTableBDD, tableauMappingBDD,tableauChampAIgnorer,parametresPost,parametresPostLibelle){


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

      if( ! parametresPost.includes(property) ) {

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
            else if(tableauMappingBDD[i][2] == "number"){

              requeteUpdate = requeteUpdate + "" + objetAEnregistrer[property] + ",";

            }
            //les autres cas se traitent de la meme facon
            else{
              requeteUpdate = requeteUpdate + "'" + objetAEnregistrer[property] + "',";

            }

          }

        }

      }
      else{

        requeteUpdate = requeteUpdate + "'"  + "',";


      }



    }

    //on doit enlever la derniere virgule
    requeteUpdate = requeteUpdate.substring(0, requeteUpdate.length - 1);
    requeteUpdate = requeteUpdate + ")";



    this.httpClient.get(requeteUpdate)
      .subscribe(data => {


        },
        err => {

          if(err.error.message == "org.postgresql.util.PSQLException: Aucun résultat retourné par la requête." || err.error.message == "org.postgresql.util.PSQLException: No results were returned by the query."){

            this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select max(id) as maxid from " + this.nomTableActuelle )
              .subscribe( dataMax =>{
                (this.objetActuel as any)[this.tableauMappingBDD[0][0]]=(dataMax as any).features.maxid;
                this.updatePostObjet(objetAEnregistrer, nomTableBDD, (dataMax as any).features[0].maxid, tableauMappingBDD,tableauChampAIgnorer,parametresPost,parametresPostLibelle);

                this.navCtrl.pop();

              });



          }
          else{
            let messageGetToast = "Objet non enregistré";

            let toast = this.toastCtrl.create({
              message: messageGetToast,
              duration: 1000,
              position: 'top',
              cssClass: "toast-echec"
            });

            toast.present();
          }



        }
      );

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
