import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PenaltyService } from '../../services/penalty.service';
import { EventUserService } from '../../services/eventuser.service';

@Component({
  selector: 'app-active-event',
  templateUrl: './active-event.component.html',
  styleUrls: ['./active-event.component.css']
})
export class ActiveEventComponent implements OnInit {
  event: any;
  user: any;
  error: string;
  summary: string;
  description: string;
  team: any;
  attendees: any;
  startDate: Date;
  endDate: Date;
  status: any;
  penaltyAmount: any;
  relation: any;
  buttonArrivalCheck:boolean = false;
  lateTime:string = "has not arrived"

  constructor(
    private eventService: EventService,
    private eventUserService: EventUserService,
    private penaltyService: PenaltyService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initializeComponent();
  }

  initializeComponent(){
    this.route.params
      .subscribe((params) => {
        this.eventService.getEvent(params.id).subscribe(result => {
          this.event = result;
          this.eventUserService.indexEventUsersRelations(result._id).subscribe(attendees => {
            this.attendees = attendees
            console.log(this.attendees)
          })
        })
      })
  }

  startEvent(relationID) {
    this.status = true
    this.eventService.startEvent(this.event, this.status)
      .subscribe(event => {
        console.log(this.status);

        const newEventData = {
          summary: this.event.summary,
          description: this.event.description,
          team: this.event.team,
          attendees: this.event.attendees,
          startDate: new Date(),
          endDate: this.event.endDate,
          status: true,
          penaltyAmount: this.event.penaltyAmount,
        };

        this.eventService.editEvent(this.event, newEventData)
        .subscribe(event =>{
          console.log(event)
          this.initializeComponent();
        })
      },
      (err) => { this.error = err }
      );
  }

  stopEvent() {
    this.status = false
    this.eventService.stopEvent(this.event, this.status)
      .subscribe(event => {
        console.log(this.status);

        const eventFinishedData = {
          summary: this.event.summary,
          description: this.event.description,
          team: this.event.team,
          attendees: this.event.attendees,
          startDate: this.event.startDate,
          endDate: new Date(),
          status: false,
          penaltyAmount: this.event.penaltyAmount,
        };



        this.initializeComponent();
      },
      (err) => { this.error = err }
      );

  }

  setArrival(relationID,event) {
    this.eventUserService.editEventUsersRelations(relationID,this.event.startDate)
      .subscribe(relation => {
        this.relation = relation;
        let currentRelation = this.attendees.filter(e => e._id == relationID);
        currentRelation[0].timeLate = this.relation.timeLate;
      },
      (err) => { this.error = err }
      );
  }

}
