import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionIncidentListeIncidentPage } from './gestion-incident-liste-incident';

@NgModule({
  declarations: [
    GestionIncidentListeIncidentPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionIncidentListeIncidentPage),
  ],
})
export class GestionIncidentListeIncidentPageModule {}
