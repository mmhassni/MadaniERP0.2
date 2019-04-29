import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionIntervenantListeIntervenantPage } from './gestion-intervenant-liste-intervenant';

@NgModule({
  declarations: [
    GestionIntervenantListeIntervenantPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionIntervenantListeIntervenantPage),
  ],
})
export class GestionIntervenantListeIntervenantPageModule {}
