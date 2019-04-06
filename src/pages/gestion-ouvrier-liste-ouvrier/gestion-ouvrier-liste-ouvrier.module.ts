import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionOuvrierListeOuvrierPage } from './gestion-ouvrier-liste-ouvrier';

@NgModule({
  declarations: [
    GestionOuvrierListeOuvrierPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionOuvrierListeOuvrierPage),
  ],
})
export class GestionOuvrierListeOuvrierPageModule {}
