import "materialize-css";
import { MaterializeModule } from "angular2-materialize";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { EventService } from '../services/event.service';
import { TeamService } from '../services/team.service';
import { PenaltyService } from '../services/penalty.service';
import { EventUserService } from '../services/eventuser.service';
import { AppComponent } from './app.component';
import { routes } from './routes';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Routes } from "@angular/router";
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { HomeComponent } from './home/home.component';
import { EventsListComponent } from './events-list/events-list.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { NewTeamFormComponent } from './new-team-form/new-team-form.component';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { ActiveEventComponent } from './active-event/active-event.component';
import { TeamComponent } from './team/team.component';
import { TeamUserService } from '../services/teamuser.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    HomeComponent,
    EventsListComponent,
    NewEventFormComponent,
    EditEventComponent,
    NewTeamFormComponent,
    TeamsListComponent,
    EditTeamComponent,
    ActiveEventComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    SessionService,
    EventService,
    TeamService,
    PenaltyService,
    EventUserService,
    TeamUserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
