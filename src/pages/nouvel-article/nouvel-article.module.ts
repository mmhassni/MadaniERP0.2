import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NouvelArticlePage } from './nouvel-article';

@NgModule({
  declarations: [
    NouvelArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(NouvelArticlePage),
  ],
})
export class NouvelArticlePageModule {}
