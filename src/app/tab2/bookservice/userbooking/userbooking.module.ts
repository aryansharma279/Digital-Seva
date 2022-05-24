import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserbookingPageRoutingModule } from './userbooking-routing.module';

import { UserbookingPage } from './userbooking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserbookingPageRoutingModule
  ],
  declarations: [UserbookingPage],
  providers: []
})
export class UserbookingPageModule {}
