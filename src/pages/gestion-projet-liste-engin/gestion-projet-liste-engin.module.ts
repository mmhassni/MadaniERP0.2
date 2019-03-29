import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionProjetListeEnginPage } from './gestion-projet-liste-engin';

@NgModule({
  declarations: [
    GestionProjetListeEnginPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionProjetListeEnginPage),
  ],
})
export class GestionProjetListeEnginPageModule {}
