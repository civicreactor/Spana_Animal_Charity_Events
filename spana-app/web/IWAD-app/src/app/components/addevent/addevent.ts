import {NgFor} from '@angular/common';
import { Component } from '@angular/core';import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';

@Component({
  selector: 'addevent',
  templateUrl: './addevent.html',
  styleUrls: ['./addevent.scss']
})


export class AddEventCmp {
  user = {};
  users: FirebaseListObservable<any[]>;
  constructor(
    public af: AngularFire
  ) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        console.log(user.uid)
      }
      else {
        // user not logged in
        this.user = {};
      }
    });
  }
  login() {
  this.af.auth.login({
    provider: AuthProviders.Facebook
  });
}
 
logout() {
  this.af.auth.logout();
}
 ngOnInit() {
   
 }

 fbPostData(name, postcode, message) {
  firebase.database().ref('/users').push({name: name, postcode: postcode, message: message});
 }
}