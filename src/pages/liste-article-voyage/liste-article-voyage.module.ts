import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeArticleVoyagePage } from './liste-article-voyage';

@NgModule({
  declarations: [
    ListeArticleVoyagePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeArticleVoyagePage),
  ],
})
export class ListeArticleVoyagePageModule {}
