import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email :new FormControl(),
    password : new FormControl()
  })
  wrongpassword:boolean;
  constructor(private authService:AuthService,private router:Router) {
    /*if(this.authService.authTrue){
      this.router.navigate(['robin'])
    }*/
  }

  ngOnInit() {
  }

  login(form){
    console.log(form);
    this.authService.signIn(form.email,form.password).then(res=>{
      this.authService.loggedIn.next(true);
      localStorage.setItem('uid',res.user.uid);
      this.router.navigate(['robin'])
      console.log(res);
    }).catch(err=>{
      console.log(err);
      this.wrongpassword = true;
    })
  }

}
