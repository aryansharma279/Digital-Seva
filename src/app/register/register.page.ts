import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { timeStamp } from 'console';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Auth } from '@angular/fire/auth';
import { userInfo } from 'os';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;
  constructor(   private auth: Auth,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService) { }
  
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    })
  }
  backToLogin() {
    this.router.navigate(['login']);
  }
  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.authService.register(this.credentials.value).then((response) => {

      console.log('response of user', response);
      if(response.user) {
          // const crtUser = this.auth.currentUser.email;
      //     console.log('user Current',crtUser);
      //     const userMail = crtUser.split("@");
      //     console.log('usermail :',userMail);
        
          
      //      // console.log('user details',user);
    
      // const crtUser = this.auth.currentUser.email;
      // console.log('user Current',crtUser);
      const userMail = response.user.email.split("@");
      // console.log('usermail :',userMail);
    
      
      this.dataService.createUser(userMail[0], {email: response.user.email}).then(async (response) => {
        console.log('response', response)
        await loading.dismiss();
        this.router.navigate(['/login']);

      }).catch((error) => {
        console.log('error while saving data to database', error);
      })
      // this.dataService
      // .editService(userMail[0],crtUser)
      // .then((response) => {
      //   console.log('response of update result', response);
        
      // })
      // .catch((error) => {
      //   console.log('response of error result', error);
      // });
  
      
       
        
       
      
          
           
        
      }
      
    }).catch(async (error) => { // console.log('error', error);
      await loading.dismiss();
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
    })
 
  
   
  
    
  
   
  }
  async showAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
