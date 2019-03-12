import { Injectable } from '@angular/core';
import { FeathersService } from './feathers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private feathers:FeathersService) { }

  getAllJobs(){
    const response: Observable<any> = this.feathers.service('recruiter-jobs').watch().find({});
    return response;
  }

  removeUser(id){
    const response: Observable<any> = this.feathers.service('recruiters').watch().patch(id,{
      alive:false
    })
    return response;
  }

}
