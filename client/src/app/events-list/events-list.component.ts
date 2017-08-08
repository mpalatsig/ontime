import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})

export class EventsListComponent implements OnInit {
  events:Observable<Array<Object>>;
  user:any;
  constructor(private eventService: EventService, private session:SessionService) {}

  ngOnInit() {
    this.eventService.indexEvents()
    .subscribe(
        (event => {
          this.events = event
          console.log(this.events)}
        ),
        (err => console.log(err))
      )
  }
}
