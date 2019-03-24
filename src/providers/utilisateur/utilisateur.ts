import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

/*
  Generated class for the UtilisateurProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilisateurProvider {

  public utilisateur = {


  };

  public utilisateurActuel = {


  };

  public utilisateur$ = new Subject<any>();


  constructor(public httpClient: HttpClient) {


    //pour la premiere fois la fonction emitUtilisateur ne poura pas s'executer toute seule
    this.emitUtilisateur();
    this.checkUser();
    this.emitUtilisateur();




  }



  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  //en d'autre terme on informe le subject (la chaine youtube ) pour notifier les abonnés
  emitUtilisateur() {
    this.utilisateur$.next(this.utilisateur);
    console.log(this.utilisateur);
  }

  updateUtilisateur(user : any){

    this.utilisateur = user;
    this.emitUtilisateur();

  }


  public checkUser():void {



    if((this.utilisateur as any).login  && (this.utilisateur as any).mdp){

      let requeteAuthentification = "http://172.20.10.2:9090/requestAny/select * from utilisateur " +
        "where login = '" + (this.utilisateur as any).login + "' " +
        "and mdp = '" + (this.utilisateur as any).mdp + "' " +
        "and active = 'TRUE' " +
        "and login != '' " +
        "and mdp != ''";
      //let requete1Emei = "http://172.20.10.2:9090/requestAny/select%20refutilisateur,etat%20from%20emei%20where%20emei%20=%20'" + d + "'%20and%20etat='accepted'%20order%20by%20datechangement%20desc";

      this.httpClient.get(requeteAuthentification)
        .subscribe(data => {

          if((data as any).features.length != 0){

            this.utilisateur = (data as any).features[0];

          }

          this.emitUtilisateur();


        });


    }




  }




}
