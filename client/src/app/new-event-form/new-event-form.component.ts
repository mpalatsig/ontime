import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit {
  event:any;
  user:any;
  error:string;
  summary:string;
  description:string;
  attendees:string;


  constructor(private eventService: EventService, private session: SessionService,private router: Router,) { }

  ngOnInit() {
  }

  newEvent() {
    this.eventService.newEvent(this.summary,this.description)
    .subscribe(
      (event) => console.log(event),
      (err) => this.error = err
    );

  }

}
