import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionCaisseListeProjetPage } from './gestion-caisse-liste-projet';

@NgModule({
  declarations: [
    GestionCaisseListeProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionCaisseListeProjetPage),
  ],
})
export class GestionCaisseListeProjetPageModule {}
