import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { Photo } from '@capacitor/camera';
import { Storage, uploadString } from '@angular/fire/storage';
import { getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private dbpath = 'digitalseva';
  dbRef: firebase.default.database.Database;

  constructor(private auth: Auth,
    private db : AngularFireDatabase,
    private storage : Storage) { 
      this.dbRef = this.db.database;
    }
  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = this.dbRef
    .ref(`${this.dbpath}/users/${user.uid}`);
    return userDocRef
  }
  async uploadDocument() {
    // const user = this.auth.currentUser;
    // const path = 'uploads/${user.uid}/document.png';
    // const storageRef = this.dbRef.ref(`${this.dbpath}/services`);

    // try {
    //   await uploadString(storageRef, cameraFile.base64String, 'base64')

    //   const imageUrl = await getDownloadURL(storageRef);
    //   const userDocRef = this.dbRef
    //   .ref(`${this.dbpath}/users/${user.uid}`);   
    //   await setDoc(userDocRef,{imageUrl,}); 
    // }catch(e) {

    // }
  }
}
