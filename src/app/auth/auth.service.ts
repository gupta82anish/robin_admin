import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable,ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:ReplaySubject<boolean>;
  authTrue:boolean;
  constructor(private afAuth:AngularFireAuth,private router: Router,private afs: AngularFirestore) {
    this.loggedIn = new ReplaySubject(1);
    console.log(this.afAuth);
    this.afAuth.authState.subscribe(data=>{
      console.log(data);
      if(data){
        this.authTrue = true;
      }
    })
  }

  signIn(email,password){
    const credential = firebase.auth.EmailAuthProvider.credential(email,password);
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      console.log('signed out successfully')
      window.location.reload();
      this.router.navigate(['']);
    }).catch(()=>{
      console.log('error in signing out')
    });
    // localStorage.removeItem('uid');
  }
}
