
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';


@Injectable()
export class EventService {
   BASE_URL:string =`${environment.BASE_URL}`;


   constructor(private http: Http) {}

   indexEvents() {
     return this.http.get(`${this.BASE_URL}/api/events`, {withCredentials: true})
       .map((res) => res.json());
   }

   newEvent(summary, description, attendees) {
     return this.http.post(`${this.BASE_URL}/api/events`,{summary,description,attendees})
       .map((res) => res.json());
   }

   getEvent(id) {
     return this.http.get(`${this.BASE_URL}/api/events/${id}`)
       .map((res) => res.json());
   }

   editEvent(event,formInfo) {
     console.log(event);
     return this.http.put(`${this.BASE_URL}/api/events/${event._id}`, formInfo)
       .map((res) => res.json());
   }

   deleteEvent(id) {
     return this.http.delete(`${this.BASE_URL}/api/events/${id}`)
       .map((res) => res.json());
   }
}
