import { Routes } from "@angular/router";
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { EventsListComponent } from './events-list/events-list.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup',  component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: EventsListComponent },
  { path: 'newevent', component: NewEventFormComponent }
];
