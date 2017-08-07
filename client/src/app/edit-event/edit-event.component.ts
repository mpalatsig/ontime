import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PenaltyService } from '../../services/penalty.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event:any;
  user:any;
  error:string;
  formInfo = {
    summary: '',
    description: '',
    team: '',
    attendees: '',
    startDate: '',
    endDate: '',
    status: '',
    penaltyAmount:'',
  };

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
        this.formInfo.summary = this.event.summary;
        this.formInfo.description = this.event.description;
        this.formInfo.team = this.event.team;
        this.formInfo.attendees = this.event.attendees;
        this.formInfo.startDate = this.event.startDate;
        this.formInfo.endDate = this.event.endDate;
        this.formInfo.status = this.event.status;
        this.formInfo.penaltyAmount = this.event.penaltyAmount;
      })
    })
  }

  editEvent() {
    this.eventService.editEvent(this.event,this.formInfo)
    .subscribe(
      (event) => this.router.navigate(['/home']),
      (err) => this.error = err
    );
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.event._id)
    .subscribe(
      (event) => this.router.navigate(['/home']),
      (err) => this.error = err
    );
  }

}
