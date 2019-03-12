import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubnavService {

  subnavItems: ReplaySubject<any[]>;
  constructor() {
    this.subnavItems = new ReplaySubject(1);
   }
}
