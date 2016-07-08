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
  `],
  pipes: [TranslatePipe]
})

export class NewsPage {

  @ViewChild('mySlider') slider: Slides;

  thisPage: string;
  agenda= [];
  news= [];
  loaded = false;
  url = ["assets/lib/news.json", "assets/lib/json.json"];
  
  mySlideOptions = {
    loop: true,
    initialSlide: 4,
    autoplay: 5000, 
    pager: true,
    speed: 500
  };

  constructor(translate: TranslateService, public nav: NavController, public http: Http) {  
    this.thisPage = "pages.news";
    this.http = http;
    console.log(this.slider.getSlider());

    this.http.get(this.url[0])
    .map(res => res.json()).subscribe(data => {
        this.news = data.channel;
        this.loaded = true;
    });
    this.http.get(this.url[1])
    .map(res => res.json()).subscribe(data => {
        this.agenda = data.channel;
        this.loaded = true;
    });
  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.slider.slideTo(0);
    console.log("Current index is", currentIndex);
  }

  openModal(data) {
    let modal = Modal.create(MyModal, data);
    this.nav.present(modal);
  }

}
