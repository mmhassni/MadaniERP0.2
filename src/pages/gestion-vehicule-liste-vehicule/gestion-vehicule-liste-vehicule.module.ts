import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionVehiculeListeVehiculePage } from './gestion-vehicule-liste-vehicule';

@NgModule({
  declarations: [
    GestionVehiculeListeVehiculePage,
  ],
  imports: [
    IonicPageModule.forChild(GestionVehiculeListeVehiculePage),
  ],
})
export class GestionVehiculeListeVehiculePageModule {}
