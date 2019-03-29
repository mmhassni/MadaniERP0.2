import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionProjetListeProjetPage } from './gestion-projet-liste-projet';

@NgModule({
  declarations: [
    GestionProjetListeProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionProjetListeProjetPage),
  ],
})
export class GestionProjetListeProjetPageModule {}
