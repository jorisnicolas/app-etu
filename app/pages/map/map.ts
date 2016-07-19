import {Component} from '@angular/core';
import {Platform, MenuController, NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';


@Component({
  templateUrl: 'build/pages/map/map.html',
  pipes: [TranslatePipe]
})

export class MapPage {


  thisPage: string;
  public map: any;
  public marker: any;
  markers = [];
  public mapData = []
  public style = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ff4400"
            },
            {
                "saturation": -68
            },
            {
                "lightness": -4
            },
            {
                "gamma": 0.72
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "gamma": 3.1
            },
            {
                "visibility": "on"
            },
            {
                "hue": "#0077ff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0011"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#be7d71"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#44ff00"
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -64
            },
            {
                "hue": "#ff9100"
            },
            {
                "lightness": 16
            },
            {
                "gamma": 0.47
            },
            {
                "weight": 2.7
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": -48
            },
            {
                "hue": "#ff5e00"
            },
            {
                "gamma": 1.2
            },
            {
                "saturation": -23
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "gamma": 0.44
            },
            {
                "saturation": -33
            },
            {
                "color": "#245e77"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#007fff"
            },
            {
                "gamma": 0.77
            },
            {
                "saturation": 65
            },
            {
                "lightness": 99
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "gamma": 0.11
            },
            {
                "weight": 5.6
            },
            {
                "saturation": 99
            },
            {
                "hue": "#0091ff"
            },
            {
                "lightness": -86
            }
        ]
    }
];
  

  constructor(
    translate: TranslateService, 
    platform: Platform, 
    private navController: NavController, 
    menu: MenuController,
    public http: Http) {

      this.thisPage = "pages.map";
      this.http = http;
      menu.enable(true);    

      // http request to get Google markers info
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

  /**
  * Check the current value of the toggle button
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
  * Place or remove marker on the map depending on the value of map (map = null will remove all markers)
  * @param map
  * @param type
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
          // initial zoom
          zoom: 15,
          // block the back zoom
          minZoom: 15, 
          // center the map
          center: new google.maps.LatLng(45.191760, 5.768625),
          // type of the map
          mapTypeId: google.maps.MapTypeId.ROADMAP, 
          // disable the default control button of the map
          disableDefaultUI: true,
          // disable control over the map
          mapTypeControl: false,
          styles: this.style
    })
  }

  /**
  * Add the geolocalisation marker and run throw every marker from the http request
  */
  createMarkers() {

    // see the template to view the different types
    var types = ['rst', 'lib', 'san', 'ser'];

    // 1 sec timeout, to make sure the map is loaded
    setTimeout(() => {
      
      this.geolocMarker();

      types.forEach(type => {
        for (var i = 0; i < this.mapData[type].length; i++) {
           this.addMarker(this.mapData[type][i], type);
        }
      })
    }, 1000);
  }

  /**
  * Create the geoloc marker
  */
  geolocMarker() {
    Geolocation.getCurrentPosition().then((resp) => {
      var geoloc = new google.maps.Marker({
        position: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
          strokeColor: '#ffffff',
          strokeOpacity: .85,
          strokeWeight: 3,
          fillColor: '#f53d3d',
          fillOpacity: 1.0,
        }    
      });
      geoloc.setMap(this.map);
    })
  }

  /**
  * create and push the marker to the markers array
  * @param element    Single object from the http request
  * @param type       Type of the marker
  */
  addMarker(element, type) {

    // create the marker icon
    var image = {
      url: element.icon,
      scaledSize: new google.maps.Size(17, 17),
      //origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      //anchor: new google.maps.Point(0, 32)
    };

    // create the marker
    var marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.geometry.location.lat, element.geometry.location.lng),
          icon: image    
    });

    // set the marker's type
    marker.set('type', type);

    // if the marker has a name => add an infowindow and a click listener
    if(element.name) {
      var infowindow = new google.maps.InfoWindow({
      content: element.name
      });
      google.maps.event.addListener(marker, 'click', function(event) {
        infowindow.open(this.map, marker);
      });
    }
    // push the marker to an array
    this.markers.push(marker);
  }

  /**
  * Resize and display the map
  * (prevent a bug where the map is shown only the first time)
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

  /**
  * Get the google markers data directly from google 
  * problem : 'Access-Control-Allow-Origin' header is present on the requested
               resource. Origin 'null' is therefore not allowed access.
  */
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
    })
  }
}
