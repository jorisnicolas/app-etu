import {Component, ViewChild} from '@angular/core';
import {NavController, Nav} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  translate: TranslateService;

  pages: Array<{title: string,
                content: string,
                icon: string,
                img: string,
                component: any
              }>;

  constructor(private navController: NavController, translate: TranslateService) {
    this.translate = translate;
    

    this.translate.setDefaultLang('fr');
    this.translate.use('fr');

    this.pages = [
      { title: 'home.titleActu',
        content: 'home.contentActu',
        icon: 'at',
        img: 'img',
        component: "ActuPage"
      },
      { title: 'home.titleMap',
        content: 'home.contentMap',
        icon: 'map',
        img: 'img',
        component: "MapPage"
      },
      { title: 'home.titleAnnuaire',
        content: 'home.contentAnnuaire',
        icon: 'search',
        img: 'img',
        component: "AnnuairePage"
      },
      { title: 'home.titleDemarche',
        content: 'home.contentDemarche',
        icon: 'help',
        img: 'img',
        component: "DemarchePage"
      }
    ];
  }

  openPage(page) {
     // navigate to the new page if it is not the current page
     this.nav.setRoot(page.component);
  }

  chooseLang(lang) {
    this.translate.use(lang);
  }

}
