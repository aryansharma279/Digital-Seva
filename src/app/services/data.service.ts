import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database/';
import {AngularFireStorage, AngularFireStorageModule, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {ref, Storage} from '@angular/fire/storage';
import {uploadString} from 'firebase/storage';
import {Auth} from '@angular/fire/auth';

import {Observable} from 'rxjs';
import {tap, finalize} from 'rxjs/operators';


import {callbackify} from 'util';
// import * as firebase from '@angular/fire/compat';

@Injectable({providedIn: 'root'})
export class DataService {

    ngFireUploadTask : AngularFireUploadTask;
    location = 'uploads/';

    private dbpath = 'digitalseva';
    dbRef : firebase.default.database.Database;

    progressNum : Observable < number >;

    progressSnapshot : Observable < any >;

    fileUploadedPath : Observable < string >;

    constructor(private storage : Storage, private auth : Auth, private db : AngularFireDatabase, private angularFireStorage : AngularFireStorage) {
        this.dbRef = this.db.database;
    }

    /* Image name generator time */
    imageName() {
        const newTime = Math.floor(Date.now() / 1000);
        return Math.floor(Math.random() * 20) + newTime;
    }

    async storeImage(file,imageData : any) {
        try {
            console.log('image data', imageData);
            // const imageName = this.imageName();
            // console.log('imageName',imageName);
            return new Promise((resolve, reject) => {
                const pictureRef = this.angularFireStorage.ref(this.location + file);

                console.log('pictureRef', pictureRef);
                pictureRef.put(imageData).then(function () {
                    pictureRef.getDownloadURL().subscribe((url : any) => {
                        console.log('url of upload', url);
                        resolve(url);
                    });
                }).catch((error) => {
                    reject(error);
                });
            });
        } catch (e) {}
    }
    getUserProfile() {
        const userName = this.auth.currentUser.email.split('@')[0]
        console.log(userName);
     const userDetail= this.dbRef.ref(`${
            this.dbpath
        }/users/${userName}`);
        console.log('detail of user',userDetail);
        return userDetail; 
    }

    getAllServices() {
        return this.dbRef.ref(`${
            this.dbpath
        }/services`);
    }
    createUser(username, payload) {
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${username}`).set(payload);
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


    updateUserInfo(email, user) { // const emailSplitted = email.split('@')[0];
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${
            this.getUserName(this.auth.currentUser.email)
        }`).update(user)

    }

    updateBooking(email, booking) {
        /*
         name
         age
         email
         charges
         service
         status: 'approval'
      */


        // const emailSplitted = email.split('@')[0];
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${
            this.getUserName(this.auth.currentUser.email)
        }/bookings`).update(booking)


    }

    updateStatus(email, status) { // const emailSplitted = email.split('@')[0];
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${
            this.getUserName(this.auth.currentUser.email)
        }/bookings`).update({status: status})

    }


    getUserInfo(email) {


        console.log('path', `${
            this.dbpath
        }/users/${
            this.getUserName(this.auth.currentUser.email)
        }`)
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${
            this.getUserName(this.auth.currentUser.email)
        }`);

        2
        // dnref/digitalseva/users/tushark/bookings - => {}


    }


    saveBookingsAndUserInfo(payload) { // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates[`${
                this.dbpath
            }/users/${
                this.getUserName(this.auth.currentUser.email)
            }/bookings`] = payload.userBookings;
        updates[`${
                this.dbpath
            }/bookings`] = payload.adminBookings;

        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return this.dbRef.ref().update(updates);
    }


    getUserName(email) {
        const emailSplitted = email.split('@')[0];
        return emailSplitted;
    }


    getUserBookings() {
        return this.dbRef.ref(`${
            this.dbpath
        }/users/${
            this.getUserName(this.auth.currentUser.email)
        }/bookings`);
    }
    getAdminBookings() {
        return this.dbRef.ref(`${
            this.dbpath
        }/bookings`);
    }


}
