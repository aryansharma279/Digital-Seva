import {Injectable} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
  })
  export class ModalService {


    constructor(public modalController: ModalController) { }
    async presentModal(modalPage,props) {
      
      const modal = await this.modalController.create({
        component: modalPage,
        componentProps: props
      });
  
      
      modal.onDidDismiss();
      
      // modal.onDidDismiss().then((response) => {
      //   console.log('response', response);
      //   callback(response);
      // })
   
      
      return await modal.present();
    }
    
  
    
  
  
  }


  