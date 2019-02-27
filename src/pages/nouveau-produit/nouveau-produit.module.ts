import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NouveauProduitPage } from './nouveau-produit';

@NgModule({
  declarations: [
    NouveauProduitPage,
  ],
  imports: [
    IonicPageModule.forChild(NouveauProduitPage),
  ],
})
export class NouveauProduitPageModule {}
