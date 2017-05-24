import {Component, ViewEncapsulation, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../../services/users';
import {PopupService} from '../../services/popup';
import {PostcodeService} from '../../services/postcode';
import { AngularFireDatabase } from 'angularfire2/database';


declare let L: any;
@Component({
  selector: 'map',
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MapCmp implements AfterViewInit {
  users: any;
  constructor(public db: AngularFireDatabase, public userService: UserService, 
              public popupService: PopupService, public postCodeService: PostcodeService) {
                this.users = db.list('/users', {preserveSnapshot: true});
              }
  mymap: any;
  apikey = 'pk.eyJ1IjoianVhbmNhcmxvc2hnIiwiYSI6ImNpdnIzN2R4dzAwMTEyeW1ubTI2aXJ1bG0ifQ.nY1oVZ6HN3Vg4sSwbOy2Vw';
  //Emitter used to send the map to the parent component
  @Output() onMap = new EventEmitter<any>();

  //Map loads after the view
  ngAfterViewInit() {
    this.initMap();
    let usersArr = [];
    this.users.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        usersArr.push(snapshot.val());
      });
      this.addMarkers(usersArr);
    }); 
  }

  initMap() : void {
    //Add map to the div
    this.mymap = L.map('mapid').setView([54, -2], 6);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token='+this.apikey, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/'+
    'licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
    }).addTo(this.mymap);

    //Emit map so that the map-input component can use it
    this.onMap.emit(this.mymap);
  }

  addMarker(user, color : string, markers) : void {
    //Adds a marker in input coordinates, with input color and input id.
    var size = 'l';
    //Options in case we want to change the marker size
    //smallOptions: {iconSize: [20, 50], popupAnchor: [0,-20]}
    //mediumOptions: {iconSize: [30,70], popupAnchor: [0,-30]}
    //largeOptions: {iconSize: [36,90], popupAnchor: [0,-40]}
    var icon = L.icon({

                        iconUrl: '/assets/imgs/heart-icon.png',
                        iconRetinaUrl: '/assets/imgs/heart-icon.png',
                        iconSize: [20, 20],
                        popupAnchor: [0, -40]


                        // iconUrl: 'https://api.mapbox.com/v4/marker/pin-'+size+'-heart+'+color+'.png?access_token='+this.apikey,
                        // iconRetinaUrl: 'https://api.mapbox.com/v4/marker/pin-'+size+'-heart+'+color+'@2x.png?access_token='+this.apikey,
                        // iconSize: [36,90],
                        // popupAnchor: [0, -40]
                      });
    var marker = L.marker([user.coordinates.lat, user.coordinates.lng], {icon});
    //On click, it will use a service to get the user info and set the popup
    marker.on('click', function(){
      if (!marker._popup) {
        this.setPopupText(marker, user);
      }
    }.bind(this));
    //Add marker to the clustering layer
    markers.addLayer(marker);
  }

  addMarkers(users) : void {
    console.log('Adding markers');

    //Clustering settings
    var markers = L.markerClusterGroup({
      //disableClusteringAtZoom: 13,
      //spiderfyOnMaxZoom: true,
      chunkedLoading: true,
      maxClusterRadius: function (zoom) {
        return (zoom < 13) ? 100 : 1; // radius in pixels
      }
    });
    //Add a marker for each user
    users.forEach(user => {
            this.addMarker(user, "f00", markers);

    });

    //Add the clustering to the map
    this.mymap.addLayer(markers);
    console.log('Finished adding markers');
  }

  setPopupText(marker, user) {
    //Gets a specific user, calls a styling function and then binds that text to the given marker
    marker.bindPopup(this.style(user)).openPopup();
  }

  style(user) {
        return `
      <div class="user-detail">
        <h3><strong>${user.name}</strong></h3>
          ${user.message+'\n'}<br/>
 <div  style="margin-top: 20px"class="fb-share-button" data-href="https://spana.org/?page_id=5065&amp;preview=true" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fspana.org%2F%3Fpage_id%3D5065%26preview%3Dtrue&amp;src=sdkpreparse"><i class="fa fa-facebook-square fa-3x" aria-hidden="true"></i> <strong>Spread the word!<strong></a></div>
        `;
  }
}

