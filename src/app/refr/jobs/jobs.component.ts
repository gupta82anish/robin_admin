import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FeathersService } from '../../feathers.service';
import { DataService } from '../../data.service';
import { Subject,Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  referralJobCol: AngularFirestoreCollection<any>;
  completeJobList:Subject<any>;
  referralJobList:Observable<any>;
  hideSpinner:boolean;
  selectedFile: FileList;
  logoImage:FileList;
  jobForm = new FormGroup({
    companyname: new FormControl('',Validators.required),
    designation: new FormControl('',Validators.required),
    ctcrange: new FormControl('',Validators.required),
    location: new FormControl('',Validators.required),
    experience: new FormControl('',Validators.required),
    collegetier: new FormControl(''),
    skills: new FormControl('',Validators.required),
    jd: new FormControl('',Validators.required),
    logo: new FormControl('')
  })

  constructor(private afs:AngularFirestore,private feathers:FeathersService,private dataService:DataService,private storage:AngularFireStorage) { }

  ngOnInit() {
    /*this.dataService.getAllJobs().subscribe(data=>{
      this.completeJobList.next(data.data);
    });*/
    this.referralJobCol = this.afs.collection(`referral-jobs`);
    this.referralJobList = this.referralJobCol.snapshotChanges().pipe(
      map(actions => actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    this.referralJobList.subscribe(data=>{
      this.hideSpinner = true;
    })
  }

  chooseFile(event){
    this.selectedFile = event.target.files;
  }

  chooseImageFile(event){
    this.logoImage = event.target.files;
  }

  async addJobForRefferal(form){
    const randNum = Math.floor(Math.random() * Math.floor(1000000000000));
    const companyPrefix = form.companyname.split(' ').join('_');
    const filename = this.selectedFile.item(0).name.split(' ').join('_');
    const filePath = `jd/${companyPrefix}/${randNum}-${filename}`;
    let skillsArray = form.skills.split(',');
    form.skills = skillsArray;
    const response = await this.afs.collection(`referral-jobs`).add(form);
    const task = this.storage.upload(filePath,this.selectedFile.item(0));
    task.then(uploaded => {

      let downloadUrl = this.storage.ref(filePath).getDownloadURL();
      downloadUrl.subscribe(data => {
        console.log(data);
        this.afs.collection(`referral-jobs`)
          .doc(response.id)
          .update({jdlink:data})
          .then(()=>{
          });
      });
    });
    const logoRand = Math.floor(Math.random() * Math.floor(1000000000000));
    const logoFilename = this.logoImage.item(0).name.split(' ').join('_');
    let logoFilePath = `logos/${companyPrefix}/${logoRand}-${logoFilename}`;
    const logoTask = this.storage.upload(logoFilePath,this.logoImage.item(0));
    logoTask.then(uploaded => {

      let logoDownloadUrl = this.storage.ref(logoFilePath).getDownloadURL();
      logoDownloadUrl.subscribe(data=>{
        this.afs.collection('referral-jobs')
          .doc(response.id)
          .update({logo:data})
          .then(()=>{
            // console.log('logo link',data);
          })
      });
    });
    this.jobForm.reset();
  }

}
