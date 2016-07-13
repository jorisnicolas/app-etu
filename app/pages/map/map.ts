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
      //this.getGoogleData();    

      this.http.get('http://clement-marin.fr/webServices/mapdata.json')
          .map(res => res.json()).subscribe(data => {
              this.mapData = data;
      });

      platform.ready().then(() => { 

        this.createMap();
        this.createMarkers();
        this.resizeMap();

      });
  }

  getGoogleData() {
      var apiKey = "AIzaSyBrF5Gnan0L4wVTKtirw1R9QMadU11eFm4";
      var location = "45.191760, 5.768625";
      var radius = "500";
      var baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

      var types = [
                    "restaurant|bar|liquor_store|meal_delivery|meal_takeaway|cafe|food", 
                    "library",
                    "gym|health|hospital|pharmacy",
                    "store|atm|laundry|bank|post_office"
                  ];

      types.forEach(element => {
        var url = baseUrl +'location='+ location +'&radius='+ radius +'&types='+ element +'&key='+ apiKey;
        this.http.get(url)
            .map(res => res.json()).subscribe(data => {
                this.mapData.push(data);
        });
        console.log(this.mapData);
      })
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
        console.log(type);
        console.log(this.markers[i]);
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
          zoom: 15,     // agrandissement de la carte,
          minZoom: 15,
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
    var type = ['rst', 'lib', 'san', 'ser'];
    setTimeout(() => {
      
      type.forEach(data => {
        for (var i = 0; i < this.mapData[data].length; i++) {
           this.addMarker(this.mapData[data][i], data);
        }
      })}, 1000);
  }

  /**
  * push the marker to the array markers
  * @param marker : Object     Marker object
  */
  addMarker(element, type) {
    var markerColor = this.setColorMarker(type);
    var marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.geometry.location.lat, element.geometry.location.lng),
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

    marker.set('type', type);
    if(element.name) {
      var infowindow = new google.maps.InfoWindow({
      content: element.name
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
        case "rst":
          return '#FF9327';
        case "adm":
          return '#387ef5';
        case "lib":
          return '#32db64';
        case "san":
          return '#222';
        case "ser":
          return '#f53d3d';
        default: 
          return '#E845B2';
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
