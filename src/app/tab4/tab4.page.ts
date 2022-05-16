import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
    async logout() {
      await this.authService.logout();
      this.router.navigateByUrl('/',{replaceUrl: true});
    }
  ngOnInit() {
  }

}
