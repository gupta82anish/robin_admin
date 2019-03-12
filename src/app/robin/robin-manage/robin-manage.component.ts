import { Component, OnInit } from '@angular/core';
import { FeathersService } from '../../feathers.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { SubnavService } from '../../subnav.service';


@Component({
  selector: 'app-robin-manage',
  templateUrl: './robin-manage.component.html',
  styleUrls: ['./robin-manage.component.scss']
})
export class RobinManageComponent implements OnInit {

  companiesList:any = [];
  userList:any = [];
  opened:boolean;
  selectedUser:any;

  constructor(private feathers:FeathersService,private dataService:DataService) {
    this.feathers.service('companies').watch().find({
    }).subscribe(data=>{
      data.data.forEach((company)=>{
        // this.companies.push({value:company.id,description:company.name})
        this.companiesList.push(company);
      })
    })
    this.feathers.service('recruiters').watch().find({
    }).subscribe(data=>{
      data.data.forEach(user=>{
        this.userList.push(user);
      })
    })
  }

  ngOnInit() {
  }

  openModal(user){
    this.opened = true;
    this.selectedUser = user;
  }

  deleteUser(){
    console.log(this.selectedUser);
    this.dataService.removeUser(this.selectedUser.id).subscribe(data=>{
      console.log(data);
    })
    this.opened = false;
  }

}
