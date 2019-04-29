import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionArticleProjetListeArticleProjetPage } from './gestion-article-projet-liste-article-projet';

@NgModule({
  declarations: [
    GestionArticleProjetListeArticleProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionArticleProjetListeArticleProjetPage),
  ],
})
export class GestionArticleProjetListeArticleProjetPageModule {}
