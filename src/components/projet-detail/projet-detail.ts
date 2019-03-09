import { Component } from '@angular/core';

/**
 * Generated class for the ProjetDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'projet-detail',
  templateUrl: 'projet-detail.html'
})
export class ProjetDetailComponent {

  text: string;

  constructor() {
    console.log('Hello ProjetDetailComponent Component');
    this.text = 'Hello World';
  }

}
