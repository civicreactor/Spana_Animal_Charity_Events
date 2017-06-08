import { Component, NgModule, ViewChild, OnInit } from '@angular/core';
import { CookieLawModule } from 'angular2-cookie-law';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('cookieLaw') 
  cookieLawEl: any;
  
  cookieLawSeen: boolean;
  name: string;
  
  constructor() {
    this.name = 'Angular2 Cookie Law with Angular2'
  }
  
  ngOnInit() {
    this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
  }

  dismiss(): void {
    this.cookieLawEl.dismiss();
  }
  
}
