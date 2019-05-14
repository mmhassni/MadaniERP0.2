import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {GestionPointageAjouterPointageOuvrierPage} from "../gestion-pointage-ajouter-pointage-ouvrier/gestion-pointage-ajouter-pointage-ouvrier";

import interactionPlugin from '@fullcalendar/interaction';

import * as $ from 'jquery';
import {Toast} from "@ionic-native/toast";

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
export class GestionPointageListePointageOuvrierPage implements OnInit{



  //les informations recuperees d'un push a partir d'une page precedente
  public informationsActuelles = {};


  public objetActuel = {};

  public listeObjetActuelle = [];

  //non de la table principale de cette page
  public nomTableActuelle = "pointageouvrier";


  //la liste des tables suivantes
  public pageDAjout : any = null;
  public pageSuivante : any = GestionPointageAjouterPointageOuvrierPage;

  public tableauMappingBDD = [
    ["idpointageouvrier","id","number"],
    ["datepointageouvrier","date","date"],
    ["nombreheurepointageouvrier","nombreheure","number"],
    ["refouvrierpointageouvrier","refouvrier","number"],
    ["datedajoutpointageouvrier","datedajout","date"],
    ["refmotifabsencepointagepointageouvrier","refmotifabsencepointage","number"]
  ];


  public calendarOptions : Object;
  public listeChoixMotifAbsencePointage = [];

  public oldDay = {};
  public oldDayUpdateHeure = {};
  public oldDayUpdateMotif = {};


  @ViewChild('hashCalendar', { read: ElementRef }) calendar: ElementRef;


  public jourActuel = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpClient: HttpClient,
              public toastCtrl : ToastController,
              public alertCtrl: AlertController) {

    //on recupere les informations recuperees de la bdd
    this.objetActuel = navParams.data.informationsActuelles;


    //on saisie les champs manquants selon les cas
    (this.objetActuel as any) = this.remplirChampManquant(this.objetActuel,this.tableauMappingBDD,[]);

    this.informationsActuelles = this.navParams.data.informationsActuelles;
    this.recupererListeChoix("listeChoixMotifAbsencePointage","motifabsencepointage","id","motif",[],"",["motifabsencepointage.typepointage"]);

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
    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/insert into "+ this.nomTableActuelle +" (refchantier) values (" + (this.informationsActuelles as any).idchantier + ")")
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


    //permet de selectionner le pointage selon la derniere date de modification
    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/" +
      "select * from (select "+this.nomTableActuelle+".id as idpointage, " + this.genererListeAttributRequete(this.nomTableActuelle,this.tableauMappingBDD) + ",* " +
      "from " + this.nomTableActuelle +  "  " +
      this.genererLeftJoin(this.nomTableActuelle,"motifabsencepointage") + ") as tp " +
      "where tp.idpointage = (select max(P.id) from pointageouvrier as p where p.date = tp.date  " +
      "and p.refouvrier = " + (this.informationsActuelles as any).idouvrier + ")"
    )
      .subscribe(data => {

        this.listeObjetActuelle = (data as any).features;
        let listeEvent = [];

        for(let i = 0; i < this.listeObjetActuelle.length ; i++){
          let objetTemp ={};
          objetTemp  = this.listeObjetActuelle[i];
          objetTemp["start"] = this.listeObjetActuelle[i]["datepointageouvrier"];
          if(this.listeObjetActuelle[i]["nombreheurepointageouvrier"] == "0" || this.listeObjetActuelle[i]["nombreheurepointageouvrier"] == "4"){
            objetTemp["title"] = this.listeObjetActuelle[i]["nombreheurepointageouvrier"] + "H";
            objetTemp["color"] = "red";
            listeEvent.push(objetTemp);
            if(this.listeObjetActuelle[i]["motif"]){
              objetTemp = Object.assign({}, objetTemp);
              objetTemp["title"] = this.listeObjetActuelle[i]["motif"];
              listeEvent.push(objetTemp);

            }


          }
          if(this.listeObjetActuelle[i]["nombreheurepointageouvrier"] >= 8){

            objetTemp["title"] = this.listeObjetActuelle[i]["nombreheurepointageouvrier"] + "H";
            objetTemp["color"] = "green";
            listeEvent.push(objetTemp);


            objetTemp = Object.assign({}, objetTemp);
            objetTemp["title"] = "présent";
            listeEvent.push(objetTemp);

          }



        }

        //this.calendarOptions["events"] = listeEvent;
        console.log(this.calendarOptions["events"] );
        $(this.calendar.nativeElement).fullCalendar( 'removeEvents');
        $(this.calendar.nativeElement).fullCalendar('addEventSource',listeEvent);

        $(this.calendar.nativeElement).fullCalendar("next");
        $(this.calendar.nativeElement).fullCalendar("prev");

        console.log(data);


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

    let requeteGetProjet = "http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select distinct";
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

      },err => {
        this.refresh();

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

    objetBDDRempli = this.initialiserObjetBDD(tableauMappingBDD);

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

  initialiserObjetBDD(tableauMappingBDDPar ){



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

  onCalendarInit($event: boolean) {
    console.log("bien initilise");
  }



  ngOnInit(): void {

    let _this = this;

    this.calendarOptions = {
      plugins: [ interactionPlugin],
      fixedWeekCount : true,
      defaultDate: (new Date()).toISOString().substring(0,10),
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      views: {
        dayGridMonth: { // name of view
          titleFormat: 'YYYY, MM, DD'
          // other view-specific options here
        }
      },

      editable: true,
      selectable: true,
      monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'],
      monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'],
      dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
      dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
      height: 600,
      contentHeight: 300,
      aspectRatio:1, //permet de definir le rapport entre le height et le width d une seule case correspondant a un jour
      eventLimit: false, // allow "more" link when too many events
      handleWindowResize: true,
      dayRender: function (date, cell) {



        console.log(date._d.getFullYear());
        console.log((new Date()).getFullYear());
        if( date._d.getFullYear() == (new Date()).getFullYear() && date._d.getMonth() == (new Date()).getMonth() && date._d.getDate() == (new Date()).getDate()){
          cell.css('background-color', '#ffc800c2');
          console.log("cooool");

        }


      }

    };

    $(this.calendar.nativeElement).fullCalendar({

          dayClick: function(date, allDay, jsEvent, view) {


            //On enleve d'abord la selection du jour precedement selectionné
            if(_this.oldDay && (_this.oldDay as any).day && !((_this.oldDay as any).day.getFullYear() == (new Date()).getFullYear() && (_this.oldDay as any).day.getMonth() == (new Date()).getMonth() && (_this.oldDay as any).day.getDate() == (new Date()).getDate())){
              $((_this.oldDay as any).htmlElement).css('background-color', '#ffffff8f');

            }
            if(_this.oldDay && (_this.oldDay as any).day && ((_this.oldDay as any).day.getFullYear() == (new Date()).getFullYear() && (_this.oldDay as any).day.getMonth() == (new Date()).getMonth() && (_this.oldDay as any).day.getDate() == (new Date()).getDate())){
              $((_this.oldDay as any).htmlElement).css('background-color', '#ffc800c2');

            }


            let nouvelObjetActuelTemp = _this.remplirChampManquant({},_this.tableauMappingBDD,[]);



            for(let i = 0; i < _this.listeObjetActuelle.length; i++){


              //on doit trouver s'il y a un objet correspondant dans la tableActuelle
              if(_this.listeObjetActuelle[i]["datepointageouvrier"] == (date as any)._d.toISOString().substring(0,10)){
                console.log("yes");
                nouvelObjetActuelTemp = _this.remplirChampManquant(_this.listeObjetActuelle[i],_this.tableauMappingBDD,[]);
              }

            }

            //remarque tres importante: lorsqu'on change la valueur
            // de l objet actuel alors le fonction update du la ion-select se refraichi aussi
            //si on a trouve l'objet en question
            if((nouvelObjetActuelTemp as any).idpointageouvrier != 'NULL'){
              _this.objetActuel= Object.assign({},nouvelObjetActuelTemp);
            }
            //sinon
            else{

              _this.objetActuel["datepointageouvrier"] = (date as any)._d.toISOString().substring(0,10);
              _this.objetActuel["refouvrierpointageouvrier"] = (_this.informationsActuelles as any).idouvrier;
              _this.objetActuel["nombreheurepointageouvrier"] = 'NULL';
              _this.objetActuel["refmotifabsencepointagepointageouvrier"] = 'NULL';
              _this.objetActuel["idpointageouvrier"] = 'NULL';
              _this.objetActuel["datedajoutpointageouvrier"] = '';
            }


            console.log(_this.objetActuel);


            console.log(date);
            console.log(allDay);
            console.log(jsEvent);
            console.log(view);


            // change the day's background color just for fun

            $(this).css('background-color', '#0000ff8f');
            _this.oldDay["htmlElement"] = this;

            if(_this.oldDay["day"] == (date as any)._d){
              _this.oldDayUpdateHeure["day"] = _this.oldDay["day"];
            }


            _this.oldDay["day"] = (date as any)._d;

            $(this).css('background-color', '#0000ff8f');


      }

    });



  }


  refrechCalendar() {

    let _this = this;
    console.log($(this.calendar.nativeElement));


    $(this.calendar.nativeElement).fullCalendar("next");
    $(this.calendar.nativeElement).fullCalendar("prev");




  }

  updateHeurePointage($event) {


    let _this = this;


    for(let i=0 ; i<this.listeObjetActuelle.length;i++){
      if(this.listeObjetActuelle[i]["datedajoutpointageouvrier"] == this.objetActuel["datedajoutpointageouvrier"]){
        if(this.listeObjetActuelle[i]["nombreheurepointageouvrier"] != this.objetActuel["nombreheurepointageouvrier"]){
          (this.objetActuel as any).datedajoutpointageouvrier = (new Date()).toISOString().substring(0,10)+" "+(new Date()).toISOString().substring(11,19);
          console.log(this.objetActuel);
          this.insertObjet(this.objetActuel,this.nomTableActuelle,this.tableauMappingBDD);
        }

      }
    }

//    _this.oldDayUpdateHeure["day"] = _this.oldDay["day"];




  }

  updateMotifPointage($event) {

    for(let i=0 ; i<this.listeObjetActuelle.length;i++){
      if(this.listeObjetActuelle[i]["datedajoutpointageouvrier"] == this.objetActuel["datedajoutpointageouvrier"]){
        if(this.listeObjetActuelle[i]["refmotifabsencepointagepointageouvrier"] != this.objetActuel["refmotifabsencepointagepointageouvrier"]){
          (this.objetActuel as any).datedajoutpointageouvrier = (new Date()).toISOString().substring(0,10)+" "+(new Date()).toISOString().substring(11,19);
          console.log(this.objetActuel);
          this.insertObjet(this.objetActuel,this.nomTableActuelle,this.tableauMappingBDD);
        }

      }
    }

  }


  marquerAbsent() {
    if(new Date((this.objetActuel as any).datepointageouvrier) <= new Date((new Date()).toISOString().substring(0,10))){
      (this.objetActuel as any).datedajoutpointageouvrier = (new Date()).toISOString().substring(0,10)+" "+(new Date()).toISOString().substring(11,19);
      (this.objetActuel as any).nombreheurepointageouvrier = 0;
      (this.objetActuel as any).refmotifabsencepointagepointageouvrier = 1;
      (this.objetActuel as any).refouvrierpointageouvrier = (this.informationsActuelles as any).idouvrier;
      this.insertObjet(this.objetActuel,this.nomTableActuelle,this.tableauMappingBDD);
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Attention',
        subTitle: "Date ultérieure à celle d'aujourd'hui!",
        buttons: ['Cancel']
      });
      alert.present();
    }


  }

  marquerPresent() {


    if(new Date((this.objetActuel as any).datepointageouvrier) <= new Date((new Date()).toISOString().substring(0,10))){
      (this.objetActuel as any).datedajoutpointageouvrier = (new Date()).toISOString().substring(0,10)+" "+(new Date()).toISOString().substring(11,19);
      (this.objetActuel as any).nombreheurepointageouvrier = 8;
      (this.objetActuel as any).refouvrierpointageouvrier = (this.informationsActuelles as any).idouvrier;
      this.insertObjet(this.objetActuel,this.nomTableActuelle,this.tableauMappingBDD);
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Attention',
        subTitle: "Date ultérieure à celle d'aujourd'hui!",
        buttons: ['Cancel']
      });
      alert.present();
    }
  }

}
