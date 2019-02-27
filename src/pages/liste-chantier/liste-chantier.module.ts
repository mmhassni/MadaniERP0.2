import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeChantierPage } from './liste-chantier';

@NgModule({
  declarations: [
    ListeChantierPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeChantierPage),
  ],
})
export class ListeChantierPageModule {}
