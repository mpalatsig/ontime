import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private session:SessionService, private router: Router){ }

  logout(){
    this.session.logout().subscribe();
    this.router.navigate(['/login']);
    console.log("user has logged out")
  }


}
