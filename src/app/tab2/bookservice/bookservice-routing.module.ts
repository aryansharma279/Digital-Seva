import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookservicePage } from './bookservice.page';

const routes: Routes = [
  {
    path: '',
    component: BookservicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookservicePageRoutingModule {}
