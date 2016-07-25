import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {NavBarDirective} from '../../../www/assets/directives/navbar/navbar';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {DirectoryModal} from '../../../www/assets/modals/directoryModals/modals';

@Component({
  templateUrl: 'build/pages/directory/directory.html',
  directives: [NavBarDirective],
  pipes: [TranslatePipe]
})

export class DirectoryPage {

  thisPage: string;
  submitted: any;
  noMoreData: any;
  data = [];
  showData = [];


  constructor(translate: TranslateService, public nav: NavController, public http: Http) {  
    this.thisPage = "pages.directory";
    this.submitted = false;
  }
  
  onSubmit(firstname, lastname, component, service, laboratory, structure) { 
    this.submitted = true;

    this.http.get('http://clement-marin.fr/webServices/directory.json')
    .map(res => res.json()).subscribe(data => {
        this.data = data.results;
        if(this.data.length <= 10) {
          this.showData = this.data;
          this.noMoreData = "true";
        }
        else {
          this.showData = this.data.slice(0,10);
        }
    });


  }

    openModal(data) {
    let modal = Modal.create(DirectoryModal, data);
    this.nav.present(modal);
  }

  doInfinite(infiniteScroll) {
    if(this.showData.length !== this.data.length){
      setTimeout(() => {
        if((this.showData.length+10) < this.data.length){
        var length = this.showData.length+10;
          for (i = this.showData.length; i < length; i++) {
            this.showData.push(this.data[i]);
          }
        }
        else{
          for (var i = this.showData.length; i < this.data.length; i++) {
            this.showData.push(this.data[i]);
          }
        }
        
        infiniteScroll.complete();
      }, 1000);
    }
    else{
      this.noMoreData = true;
    }
  }

}
