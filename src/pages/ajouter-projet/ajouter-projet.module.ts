import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterProjetPage } from './ajouter-projet';

@NgModule({
  declarations: [
    AjouterProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterProjetPage),
  ],
})
export class AjouterProjetPageModule {}
