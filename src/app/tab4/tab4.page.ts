import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  allDetails: any[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) { }
    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/',{replaceUrl: true});
    }
    slidesOptions = {
      slidesPerView: 1.5
    }
  ngOnInit() {
    this.getAllDetails();
  }
  getAllDetails() {
    this.dataService.getUserProfile().on('value', (snapshot) => {
      // this.render = 'render here'
      console.log('snapshot', snapshot);

      this.allDetails = this.dataService.extractServices(snapshot);
      
    });

    console.log('get all Services', this.allDetails);
  }
}
