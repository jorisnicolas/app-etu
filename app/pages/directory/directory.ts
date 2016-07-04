import {Component} from '@angular/core';
import {NavBarDirective} from '../../../www/assets/directives/navbar/navbar';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'build/pages/directory/directory.html',
  directives: [NavBarDirective],
  pipes: [TranslatePipe]
})

export class DirectoryPage {

  thisPage: string;

  constructor(translate: TranslateService) {  
    this.thisPage = "pages.directory";

  }
}
