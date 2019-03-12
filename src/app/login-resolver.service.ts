import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginResolverService implements Resolve<any> {

  constructor(private auth:AuthService,private router:Router) { }

  resolve(){
    /*if(this.auth.authTrue){
      console.log('auth true');
      this.router.navigate(['robin'])
    }*/
  }
}
