import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions} from 'ionic-native';
import {NavBarDirective} from '../../../www/assets/directives/navbar/navbar';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Component({
  templateUrl: 'build/pages/map/map.html',
  directives: [NavBarDirective],
  pipes: [TranslatePipe]
})

export class MapPage {

  thisPage: string;
  private map: GoogleMap;

  constructor(translate: TranslateService, private platform: Platform) {
      this.thisPage = "pages.map";
      this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady(): void {
    this.map = new GoogleMap('map');
    console.log(this.map);
    GoogleMap.isAvailable().then(() => {
      this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

        console.log(data);

        let myPosition = new GoogleMapsLatLng(45.192826, 5.767618);

        this.map.animateCamera({ target: myPosition, zoom: 15.5 });
      });
    });
  }
}
