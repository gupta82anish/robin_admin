import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FeathersService } from '../../feathers.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { SubnavService } from '../../subnav.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  userForm = new FormGroup({
    userName: new FormControl(),
    userEmail: new FormControl(),
    userMobile: new FormControl(),
    userRole: new FormControl(),
    companyId: new FormControl(),
    userTimeZone: new FormControl(),
    auth0Id: new FormControl()
  })
  companies:any = [];
  constructor(private subnav:SubnavService,private router:Router,private authService:AuthService,private feathers:FeathersService,
  private dataService:DataService) {
    this.companies.push({value:'',description:''})
    this.feathers.service('companies').watch().find({
    }).subscribe(data=>{
      data.data.forEach((company)=>{
        this.companies.push({value:company.id,description:company.name})
      })
    })
  }

  ngOnInit() {
  }

  addUserForm(form){
    console.log(form)
    const response:Observable<any> = this.feathers.service('recruiters').watch().create({
      name: form.userName,
      email: form.userEmail,
      mobile: form.userMobile,
      role: form.userRole,
      timezone: form.userTimeZone,
      auth0Id: form.auth0Id,
      company_id:form.companyId
    });
    response.subscribe(data=>{
      console.log(data)
      this.userForm.reset();
    })
  }

}
