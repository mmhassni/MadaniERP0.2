import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {NouvelArticlePage} from "../nouvel-article/nouvel-article";
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path/ngx';
import {ActionSheetController} from "ionic-angular";
import { EmailComposer } from '@ionic-native/email-composer';




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


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private camera: Camera, private filePath: FilePath, public platform: Platform, public actionSheetCtrl: ActionSheetController, private emailComposer: EmailComposer) {


    this.informationsActuelles = this.navParams.data.informationsActuelles;
    this.informationsActuelles["modalitepaiement"] = "cheque";
    this.informationsActuelles["numerobl"] = "";
    this.informationsActuelles["photobl"] = "";
    this.informationsActuelles["observations"] = "";

    this.httpClient.get("http://192.168.43.85:9090/requestAny/select fournisseur.id as idfournisseur, fournisseur.raisonsociale as raisonsocialefournisseur, * from utilisateurfournisseurassocie, fournisseur where utilisateurfournisseurassocie.refutilisateur =" + (this.informationsActuelles as any).utilisateur.id)
      .subscribe(data => {
        console.log(data);

        this.listeFournisseurs = (data as any).features;

      });

    console.log(this.informationsActuelles);

    this.httpClient.get("http://192.168.43.85:9090/requestAny/select article.datereception as datereception, article.prix as prixarticle, article.tva as tvaarticle, article.id as idarticle, * from article, sousdemande, produitfournisseur where article.refsousdemande = sousdemande.id   and article.refproduitfournisseur = produitfournisseur.id and article.refsousdemande = " + (this.informationsActuelles as any).idsousdemande)
      .subscribe(data => {
        console.log(data);

        this.listeArticles = (data as any).features;

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SousDemandePage');
  }

  Number(tvaarticle: any) {
    return 0;
  }

  public takePicture(sourceType) {

    // Create options for the Camera Dialog
    var options = {
      quality: 99,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:false,
      sourceType: sourceType,
      correctOrientation: true
    };



    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {


      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

        //console.log(imagePath);
        (this.informationsActuelles as any).photobl = imagePath;

        //console.log(imagePath);


        this.filePath.resolveNativePath(imagePath);


      } else {

        console.log(imagePath);


        //(this.informationsActuelles as any).photobl = normalizeURL(imagePath);

        //(this.informationsActuelles as any).photobl = 'data:image/jpeg;base64,' + imagePath;
        //(this.informationsActuelles as any).photobl = normalizeURL(imagePath);
        //console.log((this.informationsActuelles as any).photobl);

        //(this.informationsActuelles as any).photobl = normalizeURL(imagePath).replace("///", "//");
        //console.log((this.informationsActuelles as any).photobl);

        (this.informationsActuelles as any).photobl = imagePath;



        //console.log((this.informationsActuelles as any).photoblnat);


        //var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      //this.presentToast('Error while selecting image.');
    });



  }

  public photoBLChooser() :void{
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
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        {
          text: 'Charger à partir de Caméra',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
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

  creerNouveauProduit(event) {



    this.navCtrl.push(NouvelArticlePage, {
      informationsActuelles: this.informationsActuelles
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


  enregistrerSousDemande() {


  }

  genererBonDeCommande() {


    let bodyHTML = '<h1 style="background-color:rgb(255, 0, 0);">' + (this.informationsActuelles as any).raisonsocialefournisseur + "</h1>";

    bodyHTML = bodyHTML + "<br>";

    for(let i=0; i < this.listeArticles.length; i++){

      bodyHTML = bodyHTML + "<p>" + this.listeArticles[i].nomproduit + " : " + this.listeArticles[i].prixarticle + "</p>";


    }

    console.log("file:/" + (this.informationsActuelles as any).photoblnat);

    let email = {
      to: (this.informationsActuelles as any).emailfournisseur,
      cc: 'mhassni.mohammed@gmail.com',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        (this.informationsActuelles as any).photobl
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


}
