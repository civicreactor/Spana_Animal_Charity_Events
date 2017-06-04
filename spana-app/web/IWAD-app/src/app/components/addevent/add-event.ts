import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
import { PostcodeService } from "../../services/postcode";

import * as firebase from 'firebase';

@Component({
  selector: 'addevent',
  templateUrl: './addevent.html',
  styleUrls: ['./addevent.scss']
})


export class AddEventCmp implements OnInit {
  user = {};
  loggedIn;
  users: FirebaseListObservable<any[]>;
  constructor(private af: AngularFire, private router: Router, private postcodeService: PostcodeService) { }

  ngOnInit() {
    this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.loggedIn = true;
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
    this.loggedIn = false;
  }


  fbPostData(name, postcode, message) {
    this.postcodeService.get(postcode).subscribe(
      coordinates => {
        // coordinates.lat 0.003 on random
        coordinates.lat -= 0.0015;
        coordinates.lng -= 0.0015;
        coordinates.lat += getRandom();
        coordinates.lng += getRandom();
        function getRandom() {
          return Math.random()*0.003
        }
        var newPostKey = firebase.database().ref('/users').push({ name, coordinates, message }).key;

        // this.router.navigateByUrl("/?postId=" + newPostKey); 
       this.router.navigateByUrl("/news");
      }
    )
  }
}