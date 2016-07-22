import {Component} from '@angular/core';
import {Modal, NavController} from 'ionic-angular';
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
  data = [
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: ''
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'laboratory',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'structure',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: ''
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'laboratory',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'structure',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: ''
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'laboratory',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'structure',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
       {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: ''
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'laboratory',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'structure',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      },
      {
        firstname: 'firstname',
        lastname: 'lastname',
        mail: 'Prenom.Nom@univ-grenoble-alpes.fr',
        phone: '06.58.36.98.54',
        component: 'component',
        coord: '45.191760,5.768625'
      }
    ];

    showData = [];


  constructor(translate: TranslateService, public nav: NavController) {  
    this.thisPage = "pages.directory";
    this.submitted = false;
  }
  
  onSubmit(firstname, lastname, component, service, laboratory, structure) { 
    this.submitted = true;

    /*
      HTTP REQUEST WITH THE RESEARCH PARAMETER
      THEN ADD IN THE DATA ARRAY
    */

    if(this.data.length <= 11){
      this.showData = this.data;
      this.noMoreData = "true";
    }
    else{
      console.log(this.data.length);
      this.showData = this.data.slice(0,10);
      console.log("slice: " + this.data.length);
    }
  }

    openModal(data) {
    let modal = Modal.create(DirectoryModal, data);
    this.nav.present(modal);
  }

  doInfinite(infiniteScroll) {
    // TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO//
    if(this.showData.length !== this.data.length){
      setTimeout(() => {
        console.log(this.showData.length+10);
        if((this.showData.length+10) < this.data.length){
          for (this.showData.length; this.showData.length+10; i++) {
            this.showData.push(this.data[length]);
          }
        }
        else{
          for (var i = this.showData.length; i < this.data.length; i++) {
            this.showData.push(this.data[length]);
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
