import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SubnavService } from './subnav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  uid = localStorage.getItem('uid');
  subnavItems:any = [];

  constructor(private auth:AuthService,private subnav:SubnavService,private cdr:ChangeDetectorRef){
      // this.authService.loggedIn.next(true);

  }

  ngAfterViewInit(){
    this.subnav.subnavItems.subscribe(data=>{
      console.log(data);
      this.subnavItems = data;
    })
    // this.cdr.detectChanges();
  }

  logout(){
    this.auth.logout();
  }
}
