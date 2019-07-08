import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterVoyagePage } from './ajouter-voyage';

@NgModule({
  declarations: [
    AjouterVoyagePage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterVoyagePage),
  ],
})
export class AjouterVoyagePageModule {}
