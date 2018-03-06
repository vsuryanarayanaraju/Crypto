import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoldingPage } from './holding';

@NgModule({
  declarations: [
    HoldingPage,
  ],
  imports: [
    IonicPageModule.forChild(HoldingPage),
  ],
})
export class HoldingPageModule {}
