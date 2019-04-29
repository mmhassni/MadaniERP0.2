import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionIncidentListeProjetPage } from './gestion-incident-liste-projet';

@NgModule({
  declarations: [
    GestionIncidentListeProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionIncidentListeProjetPage),
  ],
})
export class GestionIncidentListeProjetPageModule {}
