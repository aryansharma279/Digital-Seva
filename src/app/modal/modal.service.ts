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
  
      
      modal.onDidDismiss()
   
      
      return await modal.present();
    }
    
  
    
  
  
  }
  