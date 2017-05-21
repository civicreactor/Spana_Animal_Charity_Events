import { Component, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  constructor(private http: Http, public af: AngularFire, public db: AngularFireDatabase) {}

  get() {
    console.log('Serving markers.json');
    return this.http.get(environment.USERS)
        .map(response => response.json());
  }
}
