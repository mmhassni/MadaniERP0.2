import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterProduitFournisseurPage } from './ajouter-produit-fournisseur';

@NgModule({
  declarations: [
    AjouterProduitFournisseurPage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterProduitFournisseurPage),
  ],
})
export class AjouterProduitFournisseurPageModule {}
