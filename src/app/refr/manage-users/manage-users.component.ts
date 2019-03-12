import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FeathersService } from '../../feathers.service';
import { DataService } from '../../data.service';
import { Subject,Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  refrUsersCol:AngularFirestoreCollection<any>;
  refrUsersList:any;
  hideSpinner:boolean;
  userForm = new FormGroup({
    userName: new FormControl(),
    userEmail: new FormControl(),
    userMobile: new FormControl(),
    auth0_id: new FormControl()
  })

  constructor(private afs:AngularFirestore,private feathers:FeathersService,private http:HttpClient) {
    this.refrUsersCol = this.afs.collection('users');
    this.refrUsersList = this.refrUsersCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    this.refrUsersList.subscribe(data=>{
      console.log(data);
      this.hideSpinner = true;
    })
  }

  ngOnInit() {
  }

  addUser(form){
    console.log(form);
    this.feathers.service('refr-users').create({
      email: form.userEmail
    }).then(data => {
      if(!data.error){
        const auth0Id = data.auth0Id;
        form.auth0_id = auth0Id;
        form.joiningMode = 'admin';
        this.afs.collection('referral-codes').add({email: form.userEmail}).then(docRef => {
          form.referralCode = docRef.id
          this.afs.collection('users').doc(form.userEmail).set(form).then(added=>{
            const headers = new HttpHeaders().set('content-type', 'application/json');

            this.http.post('https://iam-refr.auth0.com/dbconnections/change_password',
                           {client_id: 'TGyf0O1GL3QOn5NeD3ApqPq8j7JLlUb1',
                            email: form.userEmail,
                            connection: 'Username-Password-Authentication'},
                           {headers}
                          ).subscribe(data => {
                            console.log('email sent');
                          });
          });

        });
      }
    })
    form.auth0_id = '';
    // this.afs.collection('users').doc(form.userEmail).set(form);
  }

}
