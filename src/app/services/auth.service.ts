import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private auth : Auth, private afAuth : AngularFireAuth) {}
    async register({email, password}) {
        this.afAuth.createUserWithEmailAndPassword(email, password).then((response) => {

          console.log('response', response);

          return response.user;
        }).catch((error) => { // console.log('error', error);
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
        })

        // try {
        // const user = await createUserWithEmailAndPassword(
        //     this.auth,
        //     email,
        //     password
        // );

        // console.log('user', user);
        // return user;
        // }catch (e) {
        // return null;
        // }
    }

    async login({email, password}) {
        try {
            const user = await signInWithEmailAndPassword(this.auth, email, password);
            return user;
        } catch (e) {
            return null;
        }
    }
    logout() {
        return signOut(this.auth);
    }
}
