import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MessageService } from "../../services/message";


@Component({
  selector: 'news',
  templateUrl: './news.html',
  styleUrls: ['./news.scss']
})



export class NewsCmp {
  constructor(public msg: MessageService, public router: Router) {}

  fbMessage() {
    var newPostKey = this.msg.postKey;
    this.router.navigateByUrl("/?postId=" + newPostKey);
  }


  
}

