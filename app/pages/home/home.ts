import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {NewsPage} from '../news/news';
import {MapPage} from '../map/map';
import {DirectoryPage} from '../directory/directory';
import {ProcessPage} from '../process/process';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {


  translate: TranslateService;

  pages: Array<{title: string,
                content: string,
                icon: string,
                img: string,
                component: any}>;

  constructor(private navController: NavController, translate: TranslateService) {
    this.translate = translate;
    

    this.translate.setDefaultLang('fr');
    this.translate.use('fr');

    this.pages = [
      { title: 'home.titleActu',
        content: 'home.contentActu',
        icon: 'at',
        img: 'img',
        component: NewsPage 
      },
      { title: 'home.titleMap',
        content: 'home.contentMap',
        icon: 'map',
        img: 'img',
        component: MapPage
      },
      { title: 'home.titleAnnuaire',
        content: 'home.contentAnnuaire',
        icon: 'search',
        img: 'img',
        component: DirectoryPage
      },
      { title: 'home.titleDemarche',
        content: 'home.contentDemarche',
        icon: 'help',
        img: 'img',
        component: ProcessPage
      }
    ];
  }

  openPage(page) {
     // navigate to the new page if it is not the current page
     this.navController.setRoot(page.component);
  }

  chooseLang(lang) {
    this.translate.use(lang);
  }

}
