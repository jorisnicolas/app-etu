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
  data = [];


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


    this.data = [
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
        component: 'service',
        coord: ''
      }
    ]
  }

    openModal(data) {
    let modal = Modal.create(DirectoryModal, data);
    this.nav.present(modal);
  }

}
