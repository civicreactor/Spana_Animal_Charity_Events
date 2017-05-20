import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  get() {
    console.log('Serving markers.json');
    return this.http.get(environment.USERS)
        .map(response => response.json());
  }
}
