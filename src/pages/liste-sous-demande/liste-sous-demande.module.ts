import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeSousDemandePage } from './liste-sous-demande';

@NgModule({
  declarations: [
    ListeSousDemandePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeSousDemandePage),
  ],
})
export class ListeSousDemandePageModule {}
