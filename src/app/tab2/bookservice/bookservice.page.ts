import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bookservice',
  templateUrl: './bookservice.page.html',
  styleUrls: ['./bookservice.page.scss'],
})
export class BookservicePage implements OnInit {
  allDocuments: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
 dismiss() {
    console.log("back-btn working");
    this.modalCtrl.dismiss();
 
  } 
  
}
