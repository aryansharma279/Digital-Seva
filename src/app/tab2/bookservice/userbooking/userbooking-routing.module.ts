import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserbookingPage } from './userbooking.page';

const routes: Routes = [
  {
    path: '',
    component: UserbookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserbookingPageRoutingModule {}
