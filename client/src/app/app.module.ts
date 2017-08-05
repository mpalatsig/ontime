import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { EventService } from '../services/event.service';
import { TeamService } from '../services/team.service';
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
    EditTeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [SessionService,
    EventService,
    TeamService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
