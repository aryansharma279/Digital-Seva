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
  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();
    console.log('user details',user);
    const crtUser = this.auth.currentUser;
    console.log('user Current',crtUser);
    const userMail = crtUser.email.split("@");
    console.log('usermail :',userMail);
    const result = this.dataService.createUser(userMail[0]);
    this.dataService
    .editService(userMail[0],crtUser)
    .then((response) => {
      console.log('response of update result', response);
      
    })
    .catch((error) => {
      console.log('response of error result', error);
    });

    if(user) {
      this.router.navigateByUrl('/login', { replaceUrl: true});
    }
    else  {
      this.showAlert('Registration Failed', 'Please Try Again !');
    }
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
