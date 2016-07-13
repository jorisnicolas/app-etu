import {Component} from '@angular/core';
import {Platform, MenuController, NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {NavBarDirective} from '../../../www/assets/directives/navbar/navbar';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'build/pages/map/map.html',
  directives: [NavBarDirective],
  pipes: [TranslatePipe]
})

export class MapPage {

  thisPage: string;
  public map: any;
  public marker: any;
  markers = [];
  public mapData = []
  

  constructor(
    translate: TranslateService, 
    platform: Platform, 
    private navController: NavController, 
    menu: MenuController,
    public http: Http) {

      this.thisPage = "pages.map";
      this.http = http;
      menu.enable(true);

      this.http.get('http://clement-marin.fr/webServices/map.json')
        .map(res => res.json()).subscribe(data => {
            this.mapData = data.elements;
      });

      platform.ready().then(() => { 

        this.createMap();
        this.createMarkers();
        this.resizeMap();

        // Geolocation.getCurrentPosition().then(pos => {
        //   var markerColor = this.setColorMarker(null);
        //   var marker = new google.maps.Marker({
        //     position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        //     animation: google.maps.Animation.DROP,
        //     icon:       {
        //         path: google.maps.SymbolPath.CIRCLE,
        //         scale: 7,
        //         strokeColor: '#ffffff',
        //         strokeOpacity: .85,
        //         strokeWeight: 3,
        //         fillColor: markerColor,
        //         fillOpacity: 1.0,
        //     }
        //   });
        //   marker.setMap(this.map);
        // });
      });
  }


  /**
  * Test if toggle is true or false
  * @param check : Boolean
  * @param type: String 
  */
  toggleChange(check, type) {
    if(check) {
      this.putMarker(this.map, type);
    } else {
      this.putMarker(null, type);
    } 
  }

  /**
  * Place or remove marker on the map
  * @param map : google.maps
  * @param type: String 
  */
  putMarker(map, type) {
      for (var i = 0; i < this.markers.length; i++) {
        if(this.markers[i].type === type) {
          this.markers[i].setMap(map);
        }
      }
  }

  /**
  * Create the initial map
  */
  createMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,     // agrandissement de la carte
          center: new google.maps.LatLng(45.191760, 5.768625),   //centre de la carte
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          mapTypeControl: false 
    });
  }

  /**
  * Run throw every marker
  */
  createMarkers() {
    setTimeout(() => {
      this.mapData.forEach(element => {
        this.addMarker(element);
      })}, 1000);
  }

  /**
  * push the marker to the array markers
  * @param marker : Object     Marker object
  */
  addMarker(element) {
    var markerColor = this.setColorMarker(element.tags.amenity);
    var marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.lat, element.lon),
          icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              strokeColor: '#ffffff',
              strokeOpacity: .85,
              strokeWeight: 3,
              fillColor: markerColor,
              fillOpacity: 1.0,
        }
    });

    marker.set('type', this.setNewType(element.tags.amenity));
    console.log(element);
    if(element.tags.name || element.tags.operator) {
      var infowindow = new google.maps.InfoWindow({
      content: element.tags.name || element.tags.operator
      });
      google.maps.event.addListener(marker, 'click', function(event) {
        infowindow.open(this.map, marker);
      });
    }
    this.markers.push(marker);
  }

  /**
  * Set the color for the toggle type
  * @param type : String  Type of marker
  * @return String
  */
  setColorMarker(type) {
      switch(type)
      {
        case "restaurant" || "fast_food":
          return '#FF9327';
        case "adm":
          return '#387ef5';
        case "library":
          return '#32db64';
        case "bicycle_parking" || "parking":
          return '#222';
        case "sps":
          return '#f53d3d';
        case "post_office" || "toilets" || "atm": 
          return '#E845B2';
      }
  }

  /**
  * Set the new type 
  * @param type : String  Type of marker
  * @return String
  */
  setNewType(type) {
    switch(type)
    {
        case "restaurant" || "fast_food":
          return "rst";
        case "adm":
          return "rst";
        case "library":
          return "bbl";
        case "bicycle_parking" || "parking":
          return "tsp";
        case "sps":
          return "rst";
        case "post_office" || "toilets" || "atm": 
          return "svc";
    }
  }

  /**
  * Resize and display the map everytime
  */
  resizeMap() {
    //check if the map is loaded
    google.maps.event.addListenerOnce(this.map, 'idle', function() {
      // size to 100% to trigger the resize event and display the map everytime
      document.getElementById('map').setAttribute("style","width:100%");
      google.maps.event.trigger(document.getElementById('map'), 'resize');
    });
  }

  /**
  * go back
  */
  previousPage() {
    this.navController.pop();
  }

}
