import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeProjetPage } from './liste-projet';

@NgModule({
  declarations: [
    ListeProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeProjetPage),
  ],
})
export class ListeProjetPageModule {}
