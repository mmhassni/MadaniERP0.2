import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModelAjouterPage } from './model-ajouter';

@NgModule({
  declarations: [
    ModelAjouterPage,
  ],
  imports: [
    IonicPageModule.forChild(ModelAjouterPage),
  ],
})
export class ModelAjouterPageModule {}
