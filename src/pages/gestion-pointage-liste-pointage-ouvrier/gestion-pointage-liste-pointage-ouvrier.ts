import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GestionPointageAjouterPointageOuvrierPage} from "../gestion-pointage-ajouter-pointage-ouvrier/gestion-pointage-ajouter-pointage-ouvrier";

/**
 * Generated class for the GestionPointageListePointageOuvrierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestion-pointage-liste-pointage-ouvrier',
  templateUrl: 'gestion-pointage-liste-pointage-ouvrier.html',
})
export class GestionPointageListePointageOuvrierPage {



  //les informations recuperees d'un push a partir d'une page precedente
  public informationsActuelles = {};


  public objetActuel = {};
  public listeObjetActuelle = [];

  //non de la table principale de cette page
  public nomTableActuelle = "pointageouvrier";

  //la liste des tables suivantes
  public pageDAjout : any = GestionPointageAjouterPointageOuvrierPage;
  public pageSuivante : any = null;

  public tableauMappingBDD = [
    ["idpointageouvrier","id","number"],
    ["datepointageouvrier","date","date"],
    ["nombreheurepointageouvrier","nombreheure","number"],
    ["refouvrierpointageouvrier","refouvrier","number"],
    ["datedajoutpointageouvrier","datedajout","date"],
    ["refmotifabsencepointagepointageouvrier","refmotifabsencepointage","number"]
  ];


  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl : ToastController) {

    this.informationsActuelles = this.navParams.data.informationsActuelles;

    //declaration des atributs qui doivent etre passer aux autres vues (precisement la page Ajouter
    //this.informationsActuelles["proprieterNecessairePourLaVueSuivante"] = this.informationsActuelles["nomDeLaPPDansCetteVue"];
    this.refresh();


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeProduitFournisseurPage');
  }

  ionViewDidEnter() {
    this.refresh();

  }

  detailItemTapped(event, item){

    event.stopPropagation();
    if(this.pageDAjout) {
      if(this.informationsActuelles){
        this.pushInformationsActuelles(item, this.informationsActuelles, this.pageDAjout, "detailler");
      }
      else{
        this.pushInformationsActuelles(item, {}, this.pageDAjout, "detailler");
      }
    }
  }

  itemTapped(event, item) {

    if(this.pageSuivante){
      if(this.informationsActuelles){
        this.pushInformationsActuelles(item, this.informationsActuelles, this.pageSuivante, "passer");
      }
      else{
        this.pushInformationsActuelles(item, {}, this.pageSuivante, "passer");
      }
    }

  }

  ajouterItemWithoutPush() {

    this.httpClient.get("insert into " + this.nomTableActuelle + " (");
    this.httpClient.get("http://172.20.10.2:9090/requestAny/insert into "+ this.nomTableActuelle +" (refchantier) values (" + (this.informationsActuelles as any).idchantier + ")")
      .subscribe(data => {
        console.log(data);
        this.refresh();


      }, err => {
        this.refresh();

      });

  }

  ajouterItem() {

    if(this.pageDAjout) {
      if(this.informationsActuelles){
        this.pushInformationsActuelles({}, this.informationsActuelles, this.pageDAjout, "ajouter");
      }
      else{
        this.pushInformationsActuelles({}, {}, this.pageDAjout, "ajouter");
      }
    }

  }

  refresh(){

    this.httpClient.get("http://172.20.10.2:9090/requestAny/" +
      "select * from (select " + this.genererListeAttributRequete(this.nomTableActuelle,this.tableauMappingBDD) + ",* " +
      "from " + this.nomTableActuelle +  "  " +
      this.genererLeftJoin(this.nomTableActuelle,"motifabsencepointage") + ") as tp " +
      "where tp.datedajout = (select max(datedajout) from pointageouvrier where date = tp.date)")
      .subscribe(data => {

        this.listeObjetActuelle = (data as any).features;
        console.log(data);


      });
  }

  genererLeftJoin(nomTableBDD,tableRef){
    return "LEFT JOIN " + tableRef + " ON " + tableRef + ".id = " + nomTableBDD + ".ref" + tableRef;
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

  getListObjet(nomTableBDD, tableauMappingBDD,complementChamps,filtreWhere,listeJointures,importerLesAttributsEtoile,groupBy){

    let requeteGetProjet = "http://172.20.10.2:9090/requestAny/select distinct";
    for (let i = 0; i < tableauMappingBDD.length; i++) {

      requeteGetProjet = requeteGetProjet + " " + nomTableBDD + "." + tableauMappingBDD[i][1] + ' as "' + tableauMappingBDD[i][0] + '",';

    }

    //on enleve la derniere virgule de la boucle precedente
    requeteGetProjet = requeteGetProjet.substring(0,requeteGetProjet.length-1);


    if(complementChamps != ""){
      requeteGetProjet = requeteGetProjet + complementChamps;
    }

    if(importerLesAttributsEtoile){
      //dabord on reference la table principale dans le from
      requeteGetProjet = requeteGetProjet + " , * " ;
    }


    requeteGetProjet = requeteGetProjet + " from " + nomTableBDD + " as tp";


    for (let i = 0; i < listeJointures.length; i++) {

      //on reference apres les autre table de la jointure
      requeteGetProjet = requeteGetProjet + " LEFT JOIN " + listeJointures[i] + " ON " + nomTableBDD + ".ref" + listeJointures[i] + " = " + listeJointures[i] + ".id ";

    }

    if(filtreWhere != "" ){
      requeteGetProjet = requeteGetProjet + " where " + filtreWhere;
    }

    if(groupBy != "" ){
      requeteGetProjet = requeteGetProjet + " group by " + groupBy;
    }
    else{
      requeteGetProjet = requeteGetProjet + " order by " + nomTableBDD + "." +  tableauMappingBDD[0][1] + " desc";

    }



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
