import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookservicePageRoutingModule } from './bookservice-routing.module';

import { BookservicePage } from './bookservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookservicePageRoutingModule
  ],
  declarations: [BookservicePage]
})
export class BookservicePageModule {}
