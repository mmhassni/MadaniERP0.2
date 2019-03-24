import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModelPage } from './model-liste';

@NgModule({
  declarations: [
    ModelPage,
  ],
  imports: [
    IonicPageModule.forChild(ModelPage),
  ],
})
export class ModelListePageModule {}
