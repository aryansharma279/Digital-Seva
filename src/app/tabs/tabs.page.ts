import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  async refreshView(type) {
    console.log('type', type);
    this.router.navigate(['/tabs', type ], {replaceUrl: true});
  }  
  

}
