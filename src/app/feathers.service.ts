import { Injectable } from '@angular/core';
import * as feathersRx from 'feathers-reactive';
import * as io from 'socket.io-client';

import feathers from '@feathersjs/feathers';
import feathersSocketIOClient from '@feathersjs/socketio-client';
import feathersAuthClient from '@feathersjs/authentication-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn:'root'
})
export class FeathersService {


  private _feathers:any = feathers();                     // init socket.io
  private _socket:any = io(environment.api)/*, {
    transportOptions:{
      polling: {
        extraHeaders: {
          'Authorization': window.localStorage.getItem('access_token')
        }
      }
    }
  }*/     // init feathers

  constructor() {
    this._feathers
      .configure(feathersSocketIOClient(this._socket))  // add socket.io plugin
      .configure(feathersRx({                           // add feathers-reactive plugin
        idField: 'id'
      }))
      .configure(feathersAuthClient({
        storage:window.localStorage,
        storageKey:'id_token'
      }));
  }

  // expose services
  public service(name: string) {
    return this._feathers.service(name);
  }

  public authenticate(credentials?) :Promise<any>{
    return this._feathers.authenticate(credentials);
  }

  public logout(){
    return this._feathers.logout();
  }

  public set(key, value) {
    return this._feathers.set(key, value);
  }

  public get(key) {
    return this._feathers.get(key);
  }
}
