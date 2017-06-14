import {MapCmp} from '../map/map';
import {MapInputCmp} from '../map-input/map-input';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";
import { PostcodeService } from "../../services/postcode";
import { MessageService } from "../../services/message";

import * as firebase from 'firebase';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})

export class HomeCmp implements OnInit {
  user = {};
  mymap;
  onMap(mymap) {
    this.mymap = mymap;
  } 
  loggedIn;
  users: FirebaseListObservable<any[]>;
  constructor(private af: AngularFire, private router: Router, private postcodeService: PostcodeService, 
                  private msg: MessageService) { }

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
        this.msg.post(name, coordinates, message);
        this.router.navigateByUrl("/news");
      }
    )
  }
}
  
 

