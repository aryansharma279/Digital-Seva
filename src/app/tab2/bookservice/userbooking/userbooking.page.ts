import {Component, OnInit} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {ActionSheetController, ModalController, Platform, ToastController} from '@ionic/angular';
import {DataService} from 'src/app/services/data.service';

import {Camera, CameraOptions} from '@awesome-cordova-plugins/camera/ngx';
import {ThrowStmt} from '@angular/compiler';
import {AngularFireStorage} from '@angular/fire/compat/storage';
// import { Observable } from 'rxjs';
import {File, FileEntry} from '@awesome-cordova-plugins/file/ngx';

import {MediaCapture, MediaFile, CaptureError, CaptureImageOptions} from '@awesome-cordova-plugins/media-capture/ngx';


const MEDIA_FOLDER_NAME = 'all_media';
@Component({selector: 'app-userbooking', templateUrl: './userbooking.page.html', styleUrls: ['./userbooking.page.scss']})
export class UserbookingPage implements OnInit {
    service : any;
    type : any;
    uploadProgress = 0;
    files = [];
    bookings : any;
    adminBookings : any;


    constructor(private mediaCapture : MediaCapture, private plt : Platform, private toastCtrl : ToastController, private file : File, private storage : AngularFireStorage, private camera : Camera, private actionSheetController : ActionSheetController, private modalCtrl : ModalController, private auth : Auth, private dataService : DataService) {
        this.service = this.service;
    }

    usersDetails = {

        fullname: null,
        age: null,
        address: null

    }

    ngOnInit() {

        console.log('service data here', this.service)

        this.getBookings();
        this.getAdminBookings();
        this.checkifTheDataExistedOrNot();

    }


    async selectImage() {
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image source",
            buttons: [
                {
                    text: "Load from Library",
                    handler: () => { // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }, {
                    text: "Use Camera",
                    handler: () => {
                        this.mediaCapture.captureImage().then((data : MediaFile[]) => {
                            console.log('data', data);
                            if (data.length > 0) {
                                this.copyFileToLocalDir(data[0].fullPath);
                            }
                        }, (err : CaptureError) => console.error(err));
                        // this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                }, {
                    text: "Cancel",
                    role: "cancel"
                },
            ]
        });
        await actionSheet.present();
    }


    copyFileToLocalDir(fullPath) {
        console.log('full path', fullPath);
        let myPath = fullPath;
        // Make sure we copy from the right location
        if (fullPath.indexOf('file:///') < 0) {
            myPath = 'file:///' + fullPath;
        }

        console.log('myPath', myPath);
        const name = myPath.substr(myPath.lastIndexOf('/') + 1);
        console.log('name of file', name);

        const ext = myPath.split('.').pop();
        const d = Date.now();
        const newName = `${d}.${ext}`;

        console.log('new name', newName);


        const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
        console.log('copy from', copyFrom);

        console.log('this.file.externalDataDirectory', this.file.externalDataDirectory);
        const copyTo = this.file.externalDataDirectory + MEDIA_FOLDER_NAME;
        console.log('copy to', copyTo);

        // let externalStoragePath: string =  this.file.externalDataDirectory;

        this.file.resolveLocalFilesystemUrl(copyFrom + name).then((entry : any) => {
            console.log('entry', entry);

            this.uploadFile(entry);
            // this.file.resolveLocalFilesystemUrl(copyTo)
            // .then((dirEntry: any)=>{
            //     console.log('dir entry', dirEntry)

            //     entry.copyTo(dirEntry,newName, (success) => {
            //       console.log('copy success', success);
            //     }, (error) => {
            //       console.log('copy error', error);

            //     });

            // }).catch((error)=>{
            //     console.log(error);
            // });

        }).catch((error) => {
            console.log(error);
        });

        // this.file.checkFile(copyFrom,name).then((response) => {
        // console.log('file exist', response);
        // if(response === true) {
        //     this.file.copyFile('file:///storage/emulated/0/Pictures',name, copyTo, newName).then((response) => {
        //       console.log('response while coping file', response);
        //     }).catch((error) => {
        //       console.log('error of copying file', error);
        //     })
        // }
        // }).catch(error => {
        // console.log('error',  error);

        // })
        // this.file.copyFile(copyFrom, name, copyTo, newName).then(
        // success => {
        //     console.log('success', success);
        //     this.loadFiles();
        // },
        // error => {
        //     console.log('error: ', error);
        // }
        // );

    }

    loadFiles() {
        this.file.listDir(this.file.externalDataDirectory, MEDIA_FOLDER_NAME).then(res => {
            console.log('response of loading files', res);
            this.files = res;
        }, err => console.log('error loading files: ', err));
    }

    async uploadFile(f : FileEntry) {
        const path = f.nativeURL.substring(0, f.nativeURL.lastIndexOf('/') + 1);
        console.log('path', path);
        const type = this.getMimeType(f.name.split('.').pop());
        console.log('type', type);

        const buffer = await this.file.readAsArrayBuffer(path, f.name);
        console.log('buffer', buffer);

        const fileBlob = new Blob([buffer], type);
        console.log('fileBlob', fileBlob);


        console.log('path', path);
        const randomId = Math.random().toString(36).substring(2, 8);

        console.log('randon id', randomId)
        const uploadTask = this.storage.upload(`files/${
            new Date().getTime()
        }_${randomId}`, fileBlob);

        uploadTask.percentageChanges().subscribe(change => {
            console.log('chnage', change);
            this.uploadProgress = change;
        });

        uploadTask.then(async res => {
            console.log('res', res);
            const toast = await this.toastCtrl.create({duration: 3000, message: 'File upload finished!'});
            toast.present();
        });
    }

    getMimeType(fileExt) {
        if (fileExt == 'wav') 
            return {type: 'audio/wav'};
         else if (fileExt == 'jpg') 
            return {type: 'image/jpg'};
         else if (fileExt == 'png') 
            return {type: 'image/png'};
         else if (fileExt == 'mp4') 
            return {type: 'video/mp4'};
         else if (fileExt == 'MOV') 
            return {type: 'video/quicktime'};
        
    }

    public takePicture(sourceType) {

        var options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            mediaType: this.camera.MediaType.ALLMEDIA
        };

        console.log("options for get picture", options);


        this.camera.getPicture(options).then((imagePath) => {
            console.log("image path data", imagePath);


        }, (err) => {
            console.log("Error: ", err);
            alert(err);
        });
    }
    checkifTheDataExistedOrNot() {

        console.log('email', this.auth.currentUser);
        this.dataService.getUserInfo(this.auth.currentUser.email).on('value', (snapshot) => {
            // this.render = 'render here'
            // console.log('snapshot', snapshot.val());


            const data = snapshot.val();

            // const data = {
            // name: 'tuhsar',
            // age: 23,
            // address: 'wg 422'
            // }

            if(data) {
              if (data.hasOwnProperty('name') === true) {
                console.log('details exist')
                this.usersDetails.fullname = data.name;
                this.usersDetails.age = data.age;
                this.usersDetails.address = data.address;
              } 
              else {
                console.log('details dont  exist')

            }
            } else {
              console.log('details dont  exist')

          }
            // check if the user name exist
           

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
    uploadDocument(document) {
        console.log('document', document);

        this.type = document;
        this.selectImage();
        // name , email

    }
    save() {


        const result1 = this.checkIfBookingsExist(this.bookings);
        this.usersDetails['documents'] = [];
        this.usersDetails['status'] = 'pending';

        if (result1.length > 0) { // booking existed
            alert('You have already booked this service')
            return;
        } else {
            this.bookings.push({
                ...this.usersDetails,
                ...this.service
            })
        }

        const result2 = this.checkIfBookingsExisForAdmin(this.adminBookings);

        if (result2.length > 0) { // booking existed
            alert('You have already booked this service from admin')
            return;
        } else {
           const admin = {...this.usersDetails,...this.service};
           admin['email'] = this.auth.currentUser.email;
            this.adminBookings.push(admin
            )
        }
        // this.


        console.log('payload for user info', this.usersDetails);

      

        const payload = {
        email: this.auth.currentUser.email,
        userBookings: this.bookings,
        adminBookings: this.adminBookings
        }
        // console.log('payload to send', payload);


        this.dataService.saveBookingsAndUserInfo(payload).then((response) => {
        console.log('response while saving details ', response)
            alert('bookings successfully done');
   
        }).catch((error) => {
        console.log('error while saving details ', error)
        })
    }

    // checkIfBookingExist() {
    // return this.bookings.filter((booking) => {
    //     return booking.name === this.service.name
    // })

    // }

    checkIfBookingsExist(bookings) {
        return bookings.filter((booking) => {
            return booking.name === this.service.name
        })
    }
    checkIfBookingsExisForAdmin(bookings) {
        return bookings.filter((booking) => {
            return (booking.name + booking.email) === (this.service.name + this.auth.currentUser.email)
        })
    }

    getBookings() {

        this.dataService.getUserBookings().on('value', (snapshot) => {
            console.log('snapshot', snapshot.val());

            this.bookings = snapshot.val() || [];
        })


    }

    getAdminBookings() {

        this.dataService.getAdminBookings().on('value', (snapshot) => {
            console.log('snapshot', snapshot.val());

            this.adminBookings = snapshot.val();
        })


    }

}
