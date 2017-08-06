
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';


@Injectable()
export class EventService {
   BASE_URL:string =`${environment.BASE_URL}`;
   options:object = {withCredentials:true};
   count:number = 0;

   constructor(private http: Http) {}

   indexEvents() {
     return this.http.get(`${this.BASE_URL}/api/events`, this.options)
       .map((res) => res.json());
   }

   newEvent(summary, description, team, attendees, startDate, endDate, status) {
     return this.http.post(`${this.BASE_URL}/api/events`,{
       summary,
       description,
       team,
       attendees,
       startDate,
       endDate,
       status,
     }, this.options)
       .map((res) => res.json());
   }

   getEvent(id) {
     return this.http.get(`${this.BASE_URL}/api/events/${id}`, this.options)
       .map((res) => res.json());
   }

   editEvent(event,formInfo) {
     return this.http.put(`${this.BASE_URL}/api/events/${event._id}`, formInfo, this.options)
       .map((res) => res.json());
   }

   deleteEvent(id) {
     return this.http.delete(`${this.BASE_URL}/api/events/${id}`, this.options)
       .map((res) => res.json());
   }

   startEventCounter() {
    //  this.count++;
    //  console.log(`Count is now ${this.count}`);
   }

   stopEventCounter() {

   }

}
