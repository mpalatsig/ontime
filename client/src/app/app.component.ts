import { Component, isDevMode } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import $ from 'jquery';
import './js/init.js'
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private session:SessionService, private router: Router){
    console.log(isDevMode());
    if(environment.production === false){
      console.log("Si está en production")
    } else {
      console.log("No está una mierda")
    }
  }

  logout(){
    this.session.logout().subscribe();
    this.router.navigate(['/login']);
    console.log("user has logged out")
  }


}
