import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  event:any;
  user:any;
  error:string;
  //summary:string;
  //description:string;
  //attendees:string;
  formInfo = {
    summary: '',
    description: '',
    attendees: ''
  };

  constructor(private eventService: EventService, private session: SessionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      this.eventService.getEvent(params.id).subscribe(result => {
        this.event = result;
        this.formInfo.summary = this.event.summary;
        this.formInfo.description = this.event.description;
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

  // startEvent() {
  //   this.eventService.startEvent(-------) // ver como si hay que pasar algún parametro o falta algo en la parte de subscribe
  //   .subscribe(
  //     (err) =>  this.error = err
  //   )
  // }

}
