import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PenaltyService } from '../../services/penalty.service';
import { EventUserService } from '../../services/eventuser.service';
import { TeamService } from '../../services/team.service';

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
  availableTeamsEvent:any;

  constructor(
    private eventService: EventService,
    private eventUserService: EventUserService,
    private teamService: TeamService,
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
            this.teamService.indexTeams().subscribe((teamsAvailable => {
              this.availableTeamsEvent = teamsAvailable
              console.log(teamsAvailable)
            }),
            (err => console.log(err)))
          })
        })
      })
  }

  startEvent() {
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
        this.saveTimeLatesInEvent()
        this.initializeComponent();

        const teamUpdates = {
          penalties: this.event.penaltyAmount
        }


        this.teamService.editTeam(this.event.team,teamUpdates).subscribe(team => {
          console.log(team)
        })
      },
      (err) => { this.error = err }
      );

  }

  setArrival(relationID,event) {
    this.eventUserService.editEventUsersRelations(relationID,this.event.startDate)
      .subscribe(relation => {
        this.relation = relation;
        let currentRelation = this.attendees.filter(e => e._id == relationID);
        currentRelation[0].timeLate = this.relation.timeLate; //set the value of the first and only object of the array "currentRelation" to timeLate

        this.saveTimeLatesInEvent()

      },
      (err) => { this.error = err }
      );
  }

  checkTimeLates() {
    let sumTimeLates = this.attendees.reduce((x, y) => { return x + y.timeLate},0)
    console.log(`the sumTimeLates is: ${sumTimeLates}`)
    return sumTimeLates
  }

  saveTimeLatesInEvent() {
    this.event.penaltyAmount = this.checkTimeLates()

    const eventFinishedData = {
      summary: this.event.summary,
      description: this.event.description,
      team: this.event.team,
      attendees: this.event.attendees,
      startDate: this.event.startDate,
      endDate: this.event.startDate,
      status: this.event.status,
      penaltyAmount: this.event.penaltyAmount,
    };
    console.log("Le estoy pasando estos datos para editar")
    console.log(eventFinishedData)

    this.eventService.editEvent(this.event,eventFinishedData)
    .subscribe(
      (event) => {
        console.log(event);
      },
      (err) => this.error = err
    );
  }

}
