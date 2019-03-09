import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailProjetPage } from './detail-projet';

@NgModule({
  declarations: [
    DetailProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailProjetPage),
  ],
})
export class DetailProjetPageModule {}
