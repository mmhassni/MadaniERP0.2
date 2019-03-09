import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeFournisseurPage } from './liste-fournisseur';

@NgModule({
  declarations: [
    ListeFournisseurPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeFournisseurPage),
  ],
})
export class ListeFournisseurPageModule {}
