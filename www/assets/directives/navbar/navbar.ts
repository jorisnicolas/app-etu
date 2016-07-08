import { Component, Injectable, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../../../app/pages/home/home';

@Injectable()


@Component({
  selector: 'navbar-component',
  templateUrl: 'assets/directives/navbar/navbar.html'
})

export class NavBarDirective {

  @Input() pageName: any;

  constructor(private navController: NavController) {

  }
  
  
  homePage() {
    this.navController.setRoot(HomePage);
  }

  previousPage() {
    this.navController.pop();
  }
}