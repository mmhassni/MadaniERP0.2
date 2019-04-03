import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionPointageListeChantierPage } from './gestion-pointage-liste-chantier';

@NgModule({
  declarations: [
    GestionPointageListeChantierPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionPointageListeChantierPage),
  ],
})
export class GestionPointageListeChantierPageModule {}
