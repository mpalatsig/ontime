import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  events:any;
  constructor(
    private eventService: EventService,
    private session:SessionService) {}

  ngOnInit() {
    this.events = this.eventService.indexEvents()

  }

}
