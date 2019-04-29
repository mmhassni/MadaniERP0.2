import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionIncidentListeChantierPage } from './gestion-incident-liste-chantier';

@NgModule({
  declarations: [
    GestionIncidentListeChantierPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionIncidentListeChantierPage),
  ],
})
export class GestionIncidentListeChantierPageModule {}
