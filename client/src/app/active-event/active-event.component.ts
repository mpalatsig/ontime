import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PenaltyService } from '../../services/penalty.service';

@Component({
  selector: 'app-active-event',
  templateUrl: './active-event.component.html',
  styleUrls: ['./active-event.component.css']
})
export class ActiveEventComponent implements OnInit {
  event:any;
  user:any;
  error:string;
  summary:string;
  description:string;
  team:any;
  attendees:any;
  startDate:Date;
  endDate:Date;
  status:any;
  penaltyAmount:any;
  formInfo:any;


  constructor(
    private eventService: EventService,
    private penaltyService: PenaltyService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.route.params
      .subscribe((params) => {
        this.eventService.getEvent(params.id).subscribe(result => {
          this.event = result;
          this.attendees = this.event.attendees
          console.log(this.attendees)
        })
      })
    }

    startEvent() {
      this.status = true
      this.eventService.startEvent(this.event,this.status)
      .subscribe( event => {
          console.log(this.status);
        },
        (err) => {this.error = err}
      );

      // this.eventService.startEventCounter()
    }

    stopEvent() {
      this.status = false
      this.eventService.startEvent(this.event,this.status)
      .subscribe( event => {
          console.log(this.status);
        },
        (err) => {this.error = err}
      );

    }

    newPenalty() {
      // this.penaltyService.newPenalty(this.user._id, )
    }

}
