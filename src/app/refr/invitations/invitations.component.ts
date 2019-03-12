import { Component, OnInit } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators'
import { FeathersService } from '../../feathers.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss']
})
export class InvitationsComponent implements OnInit {

  invitationsCol: AngularFirestoreCollection<any>;
  invitationsList;
  hideSpinner:boolean;
  alertshow:boolean;
  constructor(private afs: AngularFirestore,private feathers:FeathersService,private http:HttpClient) {
    this.invitationsCol = this.afs.collection('invitation-requests',ref => ref.where('accepted','==',false));
    this.invitationsList = this.invitationsCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    this.invitationsList.subscribe(data=>{
      console.log(data);
      this.hideSpinner = true;
    })
  }

  ngOnInit() {
  }

  addUser(user){
    console.log(user);
    this.feathers.service('refr-users').create({
      email: user.email
    }).then(data => {
      if(!data.error){
        const auth0Id = data.auth0Id;
        user.auth0_id = auth0Id;
        this.afs.collection('referral-codes').add({email: user.email}).then(docRef => {
          user.referralCode = docRef.id
          this.afs.collection('users').doc(user.email).set({
            userName:user.name,
            userEmail:user.email,
            userMobile:user.number,
            auth0_id:auth0Id,
            referralCode:docRef.id,
            joiningMode:'invitation'
          }).then(added=>{
            const headers = new HttpHeaders().set('content-type', 'application/json');

            this.http.post('https://iam-refr.auth0.com/dbconnections/change_password',
                           {client_id: 'TGyf0O1GL3QOn5NeD3ApqPq8j7JLlUb1',
                            email: user.email,
                            connection: 'Username-Password-Authentication'},
                           {headers}
                          ).subscribe(data => {
                            console.log('email sent');

                          });
          this.afs.collection('invitation-requests').doc(user.email).update({accepted:false}).then(()=>{
            console.log('updated')
            this.alertshow = true;
          })
          });
        });
      }else{
        console.log('user exists')
      }
    })
    user.auth0_id = '';
  }

}
