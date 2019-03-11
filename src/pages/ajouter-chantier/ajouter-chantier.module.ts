import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterChantierPage } from './ajouter-chantier';

@NgModule({
  declarations: [
    AjouterChantierPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterChantierPage),
  ],
})
export class AjouterChantierPageModule {}
