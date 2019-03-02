import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SousDemandePage } from './sous-demande';

@NgModule({
  declarations: [
    SousDemandePage,
  ],
  imports: [
    IonicPageModule.forChild(SousDemandePage),
  ],
})
export class SousDemandePageModule {}
