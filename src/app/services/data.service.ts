import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database/';
import {AngularFireStorage, AngularFireStorageModule, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {ref, Storage} from '@angular/fire/storage';
import {uploadString} from 'firebase/storage';

import {Observable} from 'rxjs';
import {tap, finalize} from 'rxjs/operators';

import {callbackify} from 'util';
// import * as firebase from '@angular/fire/compat';

@Injectable({providedIn: 'root'})
export class DataService {

    ngFireUploadTask : AngularFireUploadTask;

    private dbpath = 'digitalseva';
    dbRef : firebase.default.database.Database;

    progressNum : Observable < number >;

    progressSnapshot : Observable < any >;

    fileUploadedPath : Observable < string >;

    constructor(private storage : Storage, private db : AngularFireDatabase, private angularFireStorage : AngularFireStorage) {
        this.dbRef = this.db.database;
    }

    async fileUpload(email, type, file, callback) {
        console.log('email', email);
        console.log('type', type);
        console.log('file', file);
        const emailSplitted = email.split('@')[0];
        console.log('email split', emailSplitted);
        const storageRef = `${
            this.dbpath
        }/users/${emailSplitted}/${type}/file.png`;

        // this.dbRef.ref(`${this.dbpath}/users/${emailSplitted}/${type}`).update({
        // status: status
        // })
        console.log('file storage path', storageRef);

        const imageRef = this.angularFireStorage.ref(storageRef);

        try {
          this.angularFireStorage.upload(storageRef, file).snapshotChanges().pipe(finalize(() => {
            console.log('file uploaded');
            const refimg = imageRef.getDownloadURL();
            console.log('ref', refimg);
        }))
        } catch(error) {
          console.log('error', error);
        }
    }

    getAllServices() {
        return this.dbRef.ref(`${
            this.dbpath
        }/services`);
    }
    createUser(payload) {
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${payload}`).set(payload, (error) => {
            if (error) { // The write failed...
                console.log('error while adding the user', error);
                return false;
            } else { // Data saved successfully!
                console.log('user Uploaded !');
                return true;
            }
        });
    }
    editService(payload, user) {
        // Get a key for a new Post.
        // var newPostKey = this.dbRef.ref(`${this.dbPath}/games/${gametype}`).child(`${payload.name}`).push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[`${
                this.dbpath
            }/users/${payload}/email`] = user.email;

        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return this.dbRef.ref().update(updates);
    }
    // updat
    extractServices(snapshot) {
        const services = [];
        console.log('snapshot ', snapshot.val());

        // as the data is inside the format of object convert that into array to iterate
        const data = snapshot.val();

        if (data) { // keys
            const serviceKeys = Object.keys(data);
            serviceKeys.forEach((service) => {
                services.push(data[service]);
            });

            console.log('Services in the Services array', services);

            console.log('data of the all Services', data);

            // all the Services will be converted to the array
            return services;
        } else {
            return [];
        }
    }


    updateUserInfo(email, user) {
        const emailSplitted = email.split('@')[0];
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${emailSplitted}`).update(user)

    }

    updateBooking(email, booking) { /*
         name
         age
         email
         charges
         service
         status: 'approval'
      */


        const emailSplitted = email.split('@')[0];
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${emailSplitted}/bookings`).update(booking)


    }

    updateStatus(email, status) {
        const emailSplitted = email.split('@')[0];
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${emailSplitted}/bookings`).update({status: status})

    }


    getUserInfo(email) {

        const emailSplitted = email.split('@')[0];

        console.log('path', `${
            this.dbpath
        }/users/${emailSplitted}`)
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${emailSplitted}`);

        2
        // dnref/digitalseva/users/tushark/bookings - => {}


    }


}
