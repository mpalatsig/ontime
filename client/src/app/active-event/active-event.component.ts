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



  constructor(
    private eventService: EventService,
    private eventUserService: EventUserService,
    private penaltyService: PenaltyService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.eventService.getEvent(params.id).subscribe(result => {
          this.event = result;
          this.eventUserService.indexEventUsersRelations(result._id).subscribe(attendees => {
            this.attendees = attendees
          })
        })
      })
  }

  startEvent() {
    this.status = true
    this.eventService.startEvent(this.event, this.status)
      .subscribe(event => {
        console.log(this.status);
      },
      (err) => { this.error = err }
      );

    // this.eventService.startEventCounter()
  }

  stopEvent() {
    this.status = false
    this.eventService.startEvent(this.event, this.status)
      .subscribe(event => {
        console.log(this.status);
      },
      (err) => { this.error = err }
      );

  }

  setArrival(relationID) {
    this.eventUserService.editEventUsersRelations(relationID)
      .subscribe(relation => {
        this.relation = relation;
        console.log(this.relation);
      },
      (err) => { this.error = err }
      );
  }

}
