import {Component} from '@angular/core';
import {MapCmp} from '../map/map';
import {MapInputCmp} from '../map-input/map-input';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})


export class HomeCmp {
  user = {};
  mymap;
  onMap(mymap) {
    this.mymap = mymap;
  } 
}
  
 

