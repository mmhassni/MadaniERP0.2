import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path/ngx';
import {ActionSheetController} from "ionic-angular";
import { EmailComposer } from '@ionic-native/email-composer';
import {AjouterNouvelArticlePage} from "../ajouter-nouvel-article/ajouter-nouvel-article";

import { Toast } from '@ionic-native/toast';

import { ToastController } from 'ionic-angular';

import { normalizeURL } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import {AjouterVoyagePage} from "../ajouter-voyage/ajouter-voyage";
import {ListeArticleVoyagePage} from "../liste-article-voyage/liste-article-voyage";





/**
 * Generated class for the SousDemandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sous-demande',
  templateUrl: 'sous-demande.html',
})
export class SousDemandePage {


  public selectFournisseursOptions = {
    title: 'Fournisseurs',
    mode: 'md'
  };

  public informationsActuelles = {};
  public listeFournisseurs = [];
  public listeArticles = [];



  public tableauMappingBDD = [
    ["idsousdemande","id","number"],
    ["idfournisseur","reffournisseur","number"],
    //["photobl","photobl","text"],
    ["observations","observations","text"],
    //["numerobl","numerobl","text"],
    ["datemodificationsousdemande","datemodification","date"],
    ["traitee","traitee","text"],
    ["validee","validee","text"],
    //["receptionnee","receptionnee","text"],
    ["suprimee","suprimee","text"],
    //["photofourniture","photofourniture","text"]
  ];


  public sousdemandeActuelle = {};
  listeVoyages: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private camera: Camera, private filePath: FilePath, public platform: Platform, public actionSheetCtrl: ActionSheetController, private emailComposer: EmailComposer , public toastCtrl: ToastController, public toast: Toast, private alertCtrl: AlertController) {


    this.informationsActuelles = this.navParams.data.informationsActuelles;

    console.log(this.informationsActuelles);


    (this.sousdemandeActuelle as any) = this.remplirChampManquant(this.informationsActuelles,this.tableauMappingBDD,[]);

    console.log(this.informationsActuelles);

    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/select projetfournisseurassocie.reffournisseur as idfournisseur, fournisseur.raisonsociale as raisonsocialefournisseur, * from projetfournisseurassocie LEFT JOIN fournisseur ON fournisseur.id = projetfournisseurassocie.reffournisseur where projetfournisseurassocie.refprojet = " + (this.informationsActuelles as any).refprojet)
      .subscribe(data => {
        console.log(data);

        this.listeFournisseurs = (data as any).features;

      });

    console.log(this.informationsActuelles);

    this.refreshVoyages();




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SousDemandePage');
  }

  Number(tvaarticle: any) {
    return 0;
  }



  detailTapped($event, item) {

    event.stopPropagation();

    item["idfournisseur"] = (this.informationsActuelles as any).idfournisseur;
    item["idsousdemande"] = (this.informationsActuelles as any).idsousdemande;
    item["quantitesaisiearticle"] = (this.informationsActuelles as any).quantitesaisiearticle;

    //console.log(item);

    this.navCtrl.push(AjouterNouvelArticlePage, {
      informationsActuelles: item
    });

  }


  takeBLPicture(sourceType) {

    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      //encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      sourceType: sourceType,
      correctOrientation: true
    };



    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {


      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

        //console.log(imagePath);
        (this.sousdemandeActuelle as any).photobl = imageData;

        console.log((this.informationsActuelles as any).photobl);


        this.filePath.resolveNativePath(imageData);


      } else {

        console.log(imageData);

        let base64Image = null;

        //get photo from the camera based on platform type
        if (this.platform.is('ios')){
          base64Image = normalizeURL(imageData);
        }
        else{
          base64Image = imageData;
        }


        (this.sousdemandeActuelle as any).photobl = base64Image;
        console.log(imageData);


        //console.log((this.informationsActuelles as any).photoblnat);


        //var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      //this.presentToast('Error while selecting image.');
    });



  }

  takeFourniturePicture(sourceType) {

    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
      //encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true,
      sourceType: sourceType,
      correctOrientation: true
    };



    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {


      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

        //console.log(imagePath);
        (this.sousdemandeActuelle as any).photobl = imageData;

        console.log((this.informationsActuelles as any).photofourniture);


        this.filePath.resolveNativePath(imageData);


      } else {

        console.log(imageData);

        let base64Image = null;

        //get photo from the camera based on platform type
        if (this.platform.is('ios')){
          base64Image = normalizeURL(imageData);
        }
        else{
          base64Image = imageData;
        }


        (this.sousdemandeActuelle as any).photofourniture = base64Image;
        console.log(imageData);


        //console.log((this.informationsActuelles as any).photoblnat);


        //var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      //this.presentToast('Error while selecting image.');
    });



  }

  photoBLChooser() :void{
    /*
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true
    };
*/
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Charger à partir de la galerie',
          handler: () => {
            this.takeBLPicture(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        {
          text: 'Charger à partir de Caméra',
          handler: () => {
            this.takeBLPicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();



  }

  photoFournitureChooser() :void{
    /*
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true
    };
*/
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Charger à partir de la galerie',
          handler: () => {
            this.takeFourniturePicture(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        {
          text: 'Charger à partir de Caméra',
          handler: () => {
            this.takeFourniturePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();



  }

  creerNouvelArticle($event) {

    if((this.sousdemandeActuelle as any).idfournisseur != "NULL"){

      this.navCtrl.push(AjouterNouvelArticlePage, {
        informationsActuelles: this.sousdemandeActuelle,
        action: "ajouter"
      });

    }
    else{

      let alert = this.alertCtrl.create({
        title: 'Attention',
        subTitle: "Vous devez d'abord selectionner un fournisseur",
        buttons: ['Cancel']
      });
      alert.present();

    }






  }

  verifierListeArticleVide($event){

    console.log($event);
    if(this.listeArticles.length != 0){

      let alert = this.alertCtrl.create({
        title: 'Attention',
        subTitle: "Vous devez d'abord vider la liste des articles",
        buttons: ['Cancel']
      });
      alert.present();
    }


  }

  //rafraichir les articles
  ionViewDidEnter() {

    this.refreshVoyages();
    this.refreshArticle();

  }

  refreshArticle(){
    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/" +
      "select * " +
      "from article " +
      "where refsousdemande = " + this.informationsActuelles["idsousdemande"] + " " +
      "order by id ")
      .subscribe( data => {

        this.listeArticles = (data as any).features;

      });
  }

  refreshVoyages(){

    this.httpClient.get("http://ec2-52-47-166-154.eu-west-3.compute.amazonaws.com:9090/requestAny/" +
      "select " +
        "voyage.numerobl as numeroblvoyage, " +
        "voyage.refsousdemande as numeroblvoyage, " +
        "voyage.photobl as photoblvoyage, " +
        "voyage.photofourniture as photofourniturevoyage " +
      "from voyage " +
      "where voyage.refsousdemande = " + (this.informationsActuelles as any).idsousdemande +
      " order by voyage.id " )
      .subscribe(data => {
        console.log(data);

        this.listeVoyages = (data as any).features;

      });



  }

  sommeTotaleTTC(){

    let sommettc = 0 ;
    for(let i=0; i < this.listeArticles.length; i++){

      sommettc = sommettc + Number(this.listeArticles[i].prixarticle)*Number(this.listeArticles[i].quantitesaisie)*(1+(Number(this.listeArticles[i].tvaarticle)/100));


    }

    sommettc = Number(sommettc.toFixed(2));

    return sommettc;
  }

  sommeTotaleHT(){

    let sommeht = 0;

    for(let i=0; i < this.listeArticles.length; i++){

      sommeht = sommeht + Number(this.listeArticles[i].prixarticle)*Number(this.listeArticles[i].quantitesaisie);


    }
    sommeht = Number(sommeht.toFixed(2));

    return sommeht;
  }

  enregistrerEtatTraite() {

    (this.sousdemandeActuelle as any).traitee = true;

    this.updatePostObjet(this.sousdemandeActuelle,"sousdemande",(this.sousdemandeActuelle as any)[Object.keys(this.sousdemandeActuelle as any)[0]],this.tableauMappingBDD,[],["photobl","photofourniture"],["photo bl","photo fourniture"]);


  }

  enregistrerEtatValide() {

    (this.sousdemandeActuelle as any).validee = true;

    this.updatePostObjet(this.sousdemandeActuelle,"sousdemande",(this.sousdemandeActuelle as any)[Object.keys(this.sousdemandeActuelle as any)[0]],this.tableauMappingBDD,[],["photobl","photofourniture"],["photo bl","photo fourniture"]);


  }

  enregistrerEtatRecepetionne() {

    (this.sousdemandeActuelle as any).receptionnee = true;

    this.updatePostObjet(this.sousdemandeActuelle,"sousdemande",(this.sousdemandeActuelle as any)[Object.keys(this.sousdemandeActuelle as any)[0]],this.tableauMappingBDD,[],["photobl","photofourniture"],["photo bl","photo fourniture"]);


  }

  enregistrerEtatDerecepetionne() {

    (this.sousdemandeActuelle as any).receptionnee = false;

    this.updatePostObjet(this.sousdemandeActuelle,"sousdemande",(this.sousdemandeActuelle as any)[Object.keys(this.sousdemandeActuelle as any)[0]],this.tableauMappingBDD,[],[],[]);

  }

  enregistrerEtatDevalide() {

    (this.sousdemandeActuelle as any).validee = false;

    this.updatePostObjet(this.sousdemandeActuelle,"sousdemande",(this.sousdemandeActuelle as any)[Object.keys(this.sousdemandeActuelle as any)[0]],this.tableauMappingBDD,[],[],[]);

  }

  enregistrerModificationObjet(){

    console.log(this.informationsActuelles);

    this.updatePostObjet(this.sousdemandeActuelle,"sousdemande",(this.sousdemandeActuelle as any)[Object.keys(this.sousdemandeActuelle as any)[0]],this.tableauMappingBDD,[],[],[]);


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

  genererBonDeCommande() {


    let bodyHTML = '<h1 style="background-color:rgb(255, 0, 0);">' + (this.informationsActuelles as any).raisonsocialefournisseur + "</h1>";

    bodyHTML = bodyHTML + "<br>";

    for(let i=0; i < this.listeArticles.length; i++){

      bodyHTML = bodyHTML + "<p>" + this.listeArticles[i].nomproduit + " : " + this.listeArticles[i].prixarticle + "</p>";


    }



    bodyHTML = bodyHTML + '<img src="data:image/jpeg;base64,' + (this.sousdemandeActuelle as any).photobl + '" />' ;

    console.log("file:/" + (this.informationsActuelles as any).photoblnat);

    let email = {
      to: (this.informationsActuelles as any).emailfournisseur,
      cc: 'mhassni.mohammed@gmail.com',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        (this.sousdemandeActuelle as any).photobl
        //'file://README.pdf'
      ],
      subject: 'Bonjour ' + (this.informationsActuelles as any).raisonsocialefournisseur,
      body: bodyHTML,
      isHtml: true
    };

    /*

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send



        // Send a text message using default options
      }
    });
    */

    this.emailComposer.open(email);


  }

  creerNouveauVoyage($event: MouseEvent) {

    if(this.informationsActuelles){
      this.pushInformationsActuelles({}, this.informationsActuelles, AjouterVoyagePage, "ajouter");
    }
    else{
      this.pushInformationsActuelles({}, {}, AjouterVoyagePage, "ajouter");
    }

    
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


  detailItemTapped($event: MouseEvent, item) {

    event.stopPropagation();


    if(this.informationsActuelles){
      this.pushInformationsActuelles(item, this.informationsActuelles, AjouterVoyagePage, "passer");
    }
    else{
      this.pushInformationsActuelles(item, {}, AjouterVoyagePage, "passer");
    }

  }

  itemTapped($event: MouseEvent, item) {

    if(this.informationsActuelles){
      this.pushInformationsActuelles(item, this.informationsActuelles, ListeArticleVoyagePage, "passer");
    }
    else{
      this.pushInformationsActuelles(item, {}, ListeArticleVoyagePage, "passer");
    }

  }
}
