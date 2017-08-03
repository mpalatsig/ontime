import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  error: string;
  username:string;
  password:string;
  email:string;
  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.session.signup(this.username, this.password, this.email)
      .subscribe(
        (user) => console.log(user),
        (err) => this.error = err
      );
    this.router.navigate(['/home']);
    console.log(`${this.username} is logged`)
  }

}
