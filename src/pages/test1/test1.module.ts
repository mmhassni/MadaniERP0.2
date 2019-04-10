
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {Test1Page} from "./test1";


@NgModule({
  declarations: [
    Test1Page
  ],
  imports: [
    IonicPageModule.forChild(Test1Page),


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Test1PageModule {}
