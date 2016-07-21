import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
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

    StatusBar.hide();
    this.pages = [
      { title: 'pages.news',
        content: 'home.contentNews',
        icon: 'paper',
        img: 'img',
        component: NewsPage 
      },
      { title: 'pages.map',
        content: 'home.contentMap',
        icon: 'pin',
        img: 'img',
        component: MapPage
      },
      { title: 'pages.directory',
        content: 'home.contentDirectory',
        icon: 'search',
        img: 'img',
        component: DirectoryPage
      },
      { title: 'pages.process',
        content: 'home.contentProcess',
        icon: 'help',
        img: 'img',
        component: ProcessPage
      }
    ];
  }

  openPage(page) {
     // navigate to the new page if it is not the current page
     this.navController.push(page.component);
  }

  chooseLang(lang) {
    this.translate.use(lang);
  }

}
