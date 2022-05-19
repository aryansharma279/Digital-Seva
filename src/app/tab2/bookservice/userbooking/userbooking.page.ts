import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.page.html',
  styleUrls: ['./userbooking.page.scss'],
})
export class UserbookingPage implements OnInit {
  service: any;

  constructor(private modalCtrl: ModalController) { 
    this.service = this.service;
  }

  data = {

    name: null,
    age: null,
    address: null,
    
  }

  ngOnInit() {

    console.log('service data here', this.service)
    this.checkifTheDataExistedOrNot();
    
  }

  checkifTheDataExistedOrNot() {
    // api run 
    const data = {name: 'amit', age: 23, address: 'xyz'}


    // if(data.hasOwnProperty('') {

    // }
  }
  dismiss() {
    console.log("back-btn working");
    this.modalCtrl.dismiss();

    
 
  } 
}
