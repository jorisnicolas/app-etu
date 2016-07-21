import {Component} from '@angular/core';
import {Modal, NavParams, ViewController} from 'ionic-angular';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'assets/modals/directoryModals/modals.html',
  styles: [`
        img{
            width: 100%;
        }
  `],
  pipes: [TranslatePipe]
})

export class DirectoryModal {

    data: any;
    title: any;
    imgMap: any;

  constructor(private viewCtrl: ViewController, public params: NavParams, translate: TranslateService) {
      this.data = this.params.get('data');

      if(this.data.coord !== ''){
          this.imgMap = 'https://maps.googleapis.com/maps/api/staticmap?center=45.191760,5.768625&zoom=15&scale=2&size=800x240&markers=color:red%7C%7C'+this.data.coord+'&key=AIzaSyBrF5Gnan0L4wVTKtirw1R9QMadU11eFm4';
      }
      else{
        this.imgMap = 'assets/img/grenoble.png';
      }

      
  }

  close() {
    this.viewCtrl.dismiss();
  }

}