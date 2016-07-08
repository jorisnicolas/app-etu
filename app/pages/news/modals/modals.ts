import {Component} from '@angular/core';
import {Modal, NavParams, ViewController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'build/pages/news/modals/modals.html',
  styles: [`
      .img-left{
            float: left;
            margin: 0 30px 10px 10px;
      }
      .pubDate{
          color: gray;
          font-style: italic;
          text-align: right;
          margin: 0 10px 5px 0;
      }
      .content-article{
          text-indent: 30px;
          font-size: 17px;
          margin: 0 10px 0 10px;
      }`    
  ],
  pipes: [TranslatePipe]
})

export class MyModal {

    data: any;
    title: any;

  constructor(private viewCtrl: ViewController, public params: NavParams, translate: TranslateService) {
      this.data = this.params.get('data');
      this.title = this.params.get('from');
      console.log(this.data);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}