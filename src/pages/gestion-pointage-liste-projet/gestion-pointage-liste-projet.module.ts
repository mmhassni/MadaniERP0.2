import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionPointageListeProjetPage } from './gestion-pointage-liste-projet';

@NgModule({
  declarations: [
    GestionPointageListeProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionPointageListeProjetPage),
  ],
})
export class GestionPointageListeProjetPageModule {}
