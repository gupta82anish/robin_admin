import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SubnavService } from '../subnav.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

    loggedIn:boolean;

    subnavItems:any = [
      {
        title:'Add User',
        route:'/robin/add-user'
      },
      {
        title:'Add Company',
        route:'/robin/add-company'
      },
      {
        title:'Manage',
        route:'/robin/manage'
      }
    ]

    constructor(private authService:AuthService,private router:Router,private subnav:SubnavService){
      this.subnav.subnavItems.next(this.subnavItems);
      /*this.authService.loggedIn.subscribe(data=>{
        if(!data){
          this.router.navigate(['']);
        }
      })*/
    }

    ngOnInit(){
    }

}
