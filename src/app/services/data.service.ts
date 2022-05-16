import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database/';

// import * as firebase from '@angular/fire/compat';

@Injectable ({
    providedIn: 'root',
})
  export class DataService {
    
    private dbpath = 'digitalseva';
    dbRef: firebase.default.database.Database;

    constructor(private db: AngularFireDatabase) {
        this.dbRef = this.db.database;
    }
    
    getAllServices () {
      return this.dbRef.ref(`${this.dbpath}/services`);
    }
    // updat
    extractServices(snapshot) {
      const services = [];
      console.log('snapshot ', snapshot.val());
  
      // as the data is inside the format of object convert that into array to iterate
      const data = snapshot.val();
  
      if (data) {
        // keys
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
    }