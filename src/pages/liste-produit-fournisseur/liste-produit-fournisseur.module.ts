import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeProduitFournisseurPage } from './liste-produit-fournisseur';

@NgModule({
  declarations: [
    ListeProduitFournisseurPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeProduitFournisseurPage),
  ],
})
export class ListeProduitFournisseurPageModule {}
