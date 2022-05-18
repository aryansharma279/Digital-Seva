import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.page.html',
  styleUrls: ['./userbooking.page.scss'],
})
export class UserbookingPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    console.log("back-btn working");
    this.modalCtrl.dismiss();
 
  } 
}
