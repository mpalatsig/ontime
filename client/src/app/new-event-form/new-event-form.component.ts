import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';


@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit {
  event:any;
  availableTeamsEvent:any;
  user:any;
  error:string;
  summary:string;
  description:string;
  team:any;
  attendees:string;
  startDate:Date;
  endDate:Date;
  status:any;


  constructor(private eventService: EventService, private teamService: TeamService, private session: SessionService, private router: Router) { }

  ngOnInit() {
    this.teamService.indexTeams()
    .subscribe(
      (teams => {
      this.availableTeamsEvent = teams
      console.log(this.availableTeamsEvent)
      // this.availableTeamsEvent = this.availableTeamsEvent[0].teamID.teamName
      // console.log(this.availableTeamsEvent)
    }),
    (err => console.log(err)))
  }

  newEvent() {
    this.eventService.newEvent(
      this.summary,
      this.description,
      this.team,
      this.attendees,
      this.startDate,
      this.endDate,
      this.status)
    .subscribe(
      (event) => console.log(event),
      (err) => this.error = err
    );

  }

}
