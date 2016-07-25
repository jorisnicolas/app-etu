import {Component, ViewChild} from '@angular/core';
import {NavBarDirective} from '../../../www/assets/directives/navbar/navbar';
import {Modal, NavController,ViewController, Slide} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {Http} from '@angular/http';
import {NewsModal} from '../../../www/assets/modals/newsModals/modals';


@Component({
  templateUrl: 'build/pages/news/news.html',
  directives: [NavBarDirective],
  pipes: [TranslatePipe]
})

export class NewsPage {

  // @ViewChild('mySlider') slider: Slides;
  
  // mySlideOptions = {
  //   loop: true,
  //   autoplay: 5000, 
  //   pager: true,
  //   speed: 500
  // };

  thisPage: string;

  agenda= [];
  news= [];
  loaded = [false, false, false];
  lang: any;
  firstNews: any;
  url = [
         "http://clement-marin.fr/webServices/news.json",
         "http://clement-marin.fr/webServices/diary.json",
         "http://api.openweathermap.org/data/2.5/forecast/daily?q=grenoble,fr&units=metric&cnt=4&appid=279e277900d88319af234085ca498ed9"
        ];
  meteo: any;
  
  

  constructor(translate: TranslateService, public nav: NavController, public http: Http) {  
    this.thisPage = "pages.news";
    this.http = http;

    this.lang = translate.currentLang;

    this.http.get(this.url[0])
    .map(res => res.json()).subscribe(data => {
        this.news = data.channel.item;
        this.loaded[0] = true;
        // take the 1st news
        this.firstNews = this.news[0];
        // take only the next 4 news
        this.news = this.news.slice(1, 5);
    });
    this.http.get(this.url[1])
    .map(res => res.json()).subscribe(data => {
        this.agenda = data.channel.item;
        this.loaded[1] = true;

        // take only the first 3 events
        this.agenda = this.agenda.slice(0, 3);
    });

    this.http.get(this.url[2] + "&lang="+ translate.currentLang)
    .map(res => res.json()).subscribe(data => {
        this.meteo = {
          temp: Math.round(data.list[0].temp.day),
          weather: data.list[0].weather[0].description,
          list: this.listDateTemp(data.list.slice(1, 4))
        }
        //console.log(this.meteo.list);
        this.loaded[2] = true;
    });
  }

  openModal(data) {
    let modal = Modal.create(NewsModal, data);
    this.nav.present(modal);
  }

  listDateTemp(list){
    
    var days = ["days.sun", "days.mon", "days.tue","days.wed","days.thu","days.fri","days.sat"];
    
    list.forEach(element => {
        var a = new Date(element.dt * 1000);
        var date = a.getDate();
        var day = days[a.getDay()];
        element.dt = date;
        element.d = day;
        element.temp.min = Math.round(element.temp.min);
        element.temp.max = Math.round(element.temp.max);
    });
    
    return list;
}

}
