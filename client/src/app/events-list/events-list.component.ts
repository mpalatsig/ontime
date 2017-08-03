import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})


export class EventsListComponent implements OnInit {
  events:Observable<Array<object>>;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    console.log("entra en oninit events list component")
    this.events = this.eventService.indexEvents();
  }

}
