import { Component, OnInit } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators'
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-candidate-applications',
  templateUrl: './candidate-applications.component.html',
  styleUrls: ['./candidate-applications.component.scss']
})
export class CandidateApplicationsComponent implements OnInit {

  applicationListCol: AngularFirestoreCollection<any>;
  applicationList:Observable<any>;
  downloadList = [];
  downloadListNew = [];

  constructor(private afs:AngularFirestore) {
    this.getReferralApplications();
   }

  ngOnInit() {
  }

  getReferralApplications(){
    this.applicationListCol = this.afs.collection('referral-candidates');
    this.applicationList = this.applicationListCol.snapshotChanges().pipe(
      map(actions=> actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    this.applicationList.subscribe(data=>{
      this.downloadList = data;
      console.log(this.downloadList);
    })
  }

  downloadExcel(){
   let preparedDownloadList = [];
   preparedDownloadList = this.downloadList.map((elem)=>{
     return {
       name:elem.name,
       companyName:elem.companyname,
       position:elem.position,
       email:elem.email,
       mobile:elem.mobile,
       location:elem.location,
       status:elem.status,
       resume:elem.resume
     }
   })
   this.downloadListNew = preparedDownloadList;
   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.downloadListNew);
   const workbook: XLSX.WorkBook = {Sheets:{'referral candidates':worksheet}, SheetNames:['referral candidates'] };
   XLSX.writeFile(workbook,'applications.xlsx');
 }

}
