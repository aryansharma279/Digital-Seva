import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  allbookings: any[];
  allbooking: any[];
  constructor(private router: Router, private dataService: DataService,private auth: Auth) {}
  openServices() {
    this.router.navigate(['tabs/tab2']);
  } 
 
  ngOnInit() {
   this.dataService.getUserName(this.auth.currentUser.email); 
   this.dataService.getUserBookings().on('value', (snapshot) => {
    // this.render = 'render here'
    console.log('snapshot', snapshot);
    
    this.allbooking = this.dataService.extractServices(snapshot);
    this.allbookings = this.allbooking.slice(0,2);
  });

  console.log('get all Services', this.allbookings);
  }
 
 
  features: any[] = [
    {id: 1, name: 'E-shram Card', src: 'assets/icons/top-up.png', background: 'rgba(27,150,181, 0.1)', page: ''},
    {id: 2, name: 'Aayushman Card', src: 'assets/icons/Health-ID.jpg', background: 'rgba(106,100,255, 0.1)', page: ''},
    {id: 3, name: 'Aadhar Card', src: 'assets/icons/aadhar.png', background: 'rgba(255, 196, 9, 0.1)', page: ''},
    {id: 4, name: 'Pan Card', src: 'assets/icons/pan.jpg', background: 'rgba(27,150,181, 0.1)', page: ''},
  ];

 
  
}
