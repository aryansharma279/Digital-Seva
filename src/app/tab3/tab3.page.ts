import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({selector: 'app-tab3', templateUrl: 'tab3.page.html', styleUrls: ['tab3.page.scss']})
export class Tab3Page implements OnInit {
    bookings : any;

    constructor(private dataService : DataService) {}


    ngOnInit(): void {
        this.getUserBookings();

    }


    getUserBookings() {

        this.dataService.getUserBookings().on('value', (snapshot) => {
            console.log('snapshot', snapshot.val());

            this.bookings = snapshot.val() || [];
        })

    }

}
