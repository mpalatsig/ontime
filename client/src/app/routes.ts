import { Routes } from "@angular/router";
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { EventsListComponent } from './events-list/events-list.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { NewTeamFormComponent } from './new-team-form/new-team-form.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { ActiveEventComponent } from './active-event/active-event.component';
import { TeamComponent } from './team/team.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'signup',  component: SignupFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: EventsListComponent },
  { path: 'newevent', component: NewEventFormComponent },
  { path: 'event/:id', component: EditEventComponent },
  { path: 'event/:id/active', component: ActiveEventComponent },
  { path: 'newteam', component: NewTeamFormComponent },
  { path: 'teams', component: TeamsListComponent },
  { path: 'team/:id/details', component: TeamComponent },
  { path: 'team/:id/edit', component: EditTeamComponent },
];
