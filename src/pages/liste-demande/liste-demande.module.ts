import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeDemandePage } from './liste-demande';

@NgModule({
  declarations: [
    ListeDemandePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeDemandePage),
  ],
})
export class ListeDemandePageModule {}
