import {Component, provide} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import {HomePage} from './pages/home/home';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
      {
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
      },
      TranslateService
    ]
})
export class MyApp {
  translate: any;
  rootPage: any = HomePage;

  constructor(platform: Platform, translate: TranslateService) {
    platform.ready().then(() => {
      this.translate = translate;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}


ionicBootstrap(MyApp);
