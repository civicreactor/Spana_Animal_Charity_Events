import { NgFor, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";

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
    constructor(private af: AngularFire, private router: Router) { }

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
        //firebase.database().ref('/users').push({ name: name, postcode: postcode, message: message });
        this.router.navigateByUrl("/?hello=true")
            .then(function (res) {
                console.log(res)
            })
            .catch(function(error) {
                console.log(error)
            })
    }
}