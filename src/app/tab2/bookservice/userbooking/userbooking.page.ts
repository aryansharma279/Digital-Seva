import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.page.html',
  styleUrls: ['./userbooking.page.scss'],
})
export class UserbookingPage implements OnInit {
  service: any;


  constructor(private modalCtrl: ModalController, private auth: Auth, private dataService: DataService) { 
    this.service = this.service;
  }

  usersDetails = {

    name: null,
    age: null,
    address: null,
    
  }

  ngOnInit() {

    console.log('service data here', this.service)
    this.checkifTheDataExistedOrNot();
    
  }

  checkifTheDataExistedOrNot() {
    
    console.log('email', this.auth.currentUser);
    this.dataService.getUserInfo(this.auth.currentUser.email).on('value', (snapshot) => {
      // this.render = 'render here'
      // console.log('snapshot', snapshot.val());

      
      const data = snapshot.val();
      
      // const data = {
      //   name: 'tuhsar',
      //   age: 23,
      //   address: 'wg 422'
      // }
   
      // check if the user name exist
      if(data.hasOwnProperty('name') === true) {
        console.log('details exist')
        this.usersDetails.name = data.name;
        this.usersDetails.age = data.age;
        this.usersDetails.address = data.address;
      } else {
        console.log('details dont  exist')

      }

    });
    // api run 
    // const data = {name: 'amit', age: 23, address: 'xyz'}


    // if(data.hasOwnProperty('') {

    // }
  }

  dismiss() {
    console.log("back-btn working");
    this.modalCtrl.dismiss();

    
 
  } 

  save() {

    console.log('payload for user info', this.usersDetails);
    // this.
    this.dataService.updateUserInfo(this.auth.currentUser.email,this.usersDetails).then((response) => {
      alert('data updated') 
       }).catch(error => {
         alert(error);
       })
  }
}
