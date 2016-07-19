import {Component, ViewChild} from '@angular/core';
import {NavBarDirective} from '../../../www/assets/directives/navbar/navbar';
import {Modal, NavController,ViewController,Slides} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import {MyModal} from './modals/modals';



@Component({
  templateUrl: 'build/pages/news/news.html',
  directives: [NavBarDirective],
  styles: [`
      .news-img{
            border: 10px white solid;
            -webkit-box-shadow: -3px 3px 7px 0px rgba(173,164,173,1);
            -moz-box-shadow: -3px 3px 7px 0px rgba(173,164,173,1);
            box-shadow: -3px 3px 7px 0px rgba(173,164,173,1);
      }

      .item-news{
            height: 100px;
      }
      .item-agd{
            height: 70px;
      }
      .no-border{
          border: 0 !important;
      }
  `],
  pipes: [TranslatePipe]
})

export class NewsPage {

  @ViewChild('mySlider') slider: Slides;
  
  mySlideOptions = {
    loop: true,
    autoplay: 5000, 
    pager: true,
    speed: 500
  };

  thisPage: string;

  agenda= [];
  news= [];
  loaded = false;
  url = ["http://clement-marin.fr/webServices/news.json", "http://clement-marin.fr/webServices/diary.json"];
  
  

  constructor(translate: TranslateService, public nav: NavController, public http: Http) {  
    this.thisPage = "pages.news";
    this.http = http;

    this.http.get(this.url[0])
    .map(res => res.json()).subscribe(data => {
        this.news = data.channel.item;
        this.loaded = true;
        this.news = this.news.slice(0, 5);
    });
    this.http.get(this.url[1])
    .map(res => res.json()).subscribe(data => {
        this.agenda = data.channel.item;
        this.loaded = true;
        this.agenda = this.agenda.slice(0, 3);
    });
  }

  openModal(data) {
    let modal = Modal.create(MyModal, data);
    this.nav.present(modal);
  }

}
