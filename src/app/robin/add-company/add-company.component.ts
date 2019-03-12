import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FeathersService } from '../../feathers.service';
// import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { DataService } from '../data.service';
// import { SubnavService } from '../subnav.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {


  companyForm = new FormGroup({
    companyName: new FormControl(),
    contactName: new FormControl(),
    contactEmail: new FormControl(),
    contactNumber: new FormControl(),
    companyType: new FormControl()
  })
  companiesList:any = [];
  constructor(private feathers:FeathersService) { }

  ngOnInit() {
  }

  addCompanyForm(form){
    console.log(form);
    const response: Observable<any> = this.feathers.service('companies').watch().create({
      name:form.companyName,
      contact_name: form.contactName,
      contact_email: form.contactEmail,
      contact_number: form.contactNumber,
      address:'',
      city:'',
      state:'',
      company_type:form.companyType,
      domain: form.contactEmail.split('@')[1]
    }).subscribe(data=>{
      console.log(data);
      this.companyForm.reset();
    })
  }

}
