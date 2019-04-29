import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionIncidentAjouterIncidentPage } from './gestion-incident-ajouter-incident';

@NgModule({
  declarations: [
    GestionIncidentAjouterIncidentPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionIncidentAjouterIncidentPage),
  ],
})
export class GestionIncidentAjouterIncidentPageModule {}
