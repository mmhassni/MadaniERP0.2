import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterNouvelArticlePage } from './ajouter-nouvel-article';

@NgModule({
  declarations: [
    AjouterNouvelArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterNouvelArticlePage),
  ],
})
export class AjouterNouvelArticlePageModule {}
