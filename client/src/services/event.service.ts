
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
     console.log('index events')
     return this.http.get(`${this.BASE_URL}/api/events`, this.options)
       .map((res) => res.json());
   }

   newEvent(summary, description, team, attendees, startDate, endDate, status, penaltyAmount) {
     console.log('new event')
     return this.http.post(`${this.BASE_URL}/api/events`,{
       summary,
       description,
       team,
       attendees,
       startDate,
       endDate,
       status,
       penaltyAmount,
     }, this.options)
       .map((res) => res.json());
   }

   getEvent(id) {
    console.log('get event')
     return this.http.get(`${this.BASE_URL}/api/events/${id}`, this.options)
       .map((res) => res.json());
   }

   editEvent(event,formInfo) {
     console.log('edit event')
     console.log('lo que devuelve formInfo es:')
     console.log(formInfo)
     console.log(event)
     return this.http.put(`${this.BASE_URL}/api/events/edit/${event._id}`, formInfo, this.options)
       .map((res) => res.json());
   }

   deleteEvent(id) {
     console.log('delete event')
     return this.http.delete(`${this.BASE_URL}/api/events/${id}`, this.options)
       .map((res) => res.json());
   }

   startEvent(event,status) {
     console.log('start event')
     return this.http.put(`${this.BASE_URL}/api/events/start/${event._id}`, {status}, this.options)
       .map((res) => res.json());

    //  this.count++;
    //  console.log(`Count is now ${this.count}`);
   }

   stopEvent(event,status) {
     console.log('stop event')
     return this.http.put(`${this.BASE_URL}/api/events/stop/${event._id}`, {status}, this.options)
       .map((res) => res.json());
   }

}
