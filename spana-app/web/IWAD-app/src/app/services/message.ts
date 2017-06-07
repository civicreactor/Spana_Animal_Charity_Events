import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import * as firebase from 'firebase';

@Injectable()
export class MessageService {
  postKey: any;
  constructor(private http: Http) {
   }

  post(name, coordinates, message) {
    this.postKey = firebase.database().ref('/users').push({ name, coordinates, message }).key;
    return this.postKey;
  }
  
}

