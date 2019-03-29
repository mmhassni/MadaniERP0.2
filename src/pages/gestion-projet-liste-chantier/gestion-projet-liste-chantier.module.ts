import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionProjetListeChantierPage } from './gestion-projet-liste-chantier';

@NgModule({
  declarations: [
    GestionProjetListeChantierPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionProjetListeChantierPage),
  ],
})
export class GestionProjetListeChantierPageModule {}
