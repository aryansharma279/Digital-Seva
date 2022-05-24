import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalService } from 'src/app/modal/modal.service';
import { UserbookingPage } from './userbooking/userbooking.page';

@Component({
  selector: 'app-bookservice',
  templateUrl: './bookservice.page.html',
  styleUrls: ['./bookservice.page.scss'],
})
export class BookservicePage implements OnInit {

  constructor(private modalCtrl: ModalController,private modalService: ModalService) {
    
   }

  ngOnInit() {
    

  }
 dismiss() {
    console.log("back-btn working");
    this.modalCtrl.dismiss();
  
  } 
  proceedBooking(service) {
    this.modalService.presentModal(
      UserbookingPage,
      {
        service: service,
      }
    );

  }
 
}
