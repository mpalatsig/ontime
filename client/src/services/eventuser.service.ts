import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';


@Injectable()
export class EventUserService {
   BASE_URL:string =`${environment.BASE_URL}`;
   options:object = {withCredentials:true};

   constructor(private http: Http) {}

   indexEventUsersRelations(id) {
     console.log('index EventUsers relations')
     return this.http.get(`${this.BASE_URL}/api/events/${id}/users`, this.options)
       .map((res) => res.json());
   }

  //  newEvent(summary, description, team, attendees, startDate, endDate, status, penaltyAmount) {
  //    console.log('new event')
  //    return this.http.post(`${this.BASE_URL}/api/events`,{
  //      summary,
  //      description,
  //      team,
  //      attendees,
  //      startDate,
  //      endDate,
  //      status,
  //      penaltyAmount,
  //    }, this.options)
  //      .map((res) => res.json());
  //  }
   //
  //  getEvent(id) {
  //   console.log('get event')
  //    return this.http.get(`${this.BASE_URL}/api/events/${id}`, this.options)
  //      .map((res) => res.json());
  //  }
   //
  //  editEvent(event,formInfo) {
  //    console.log('edit event')
  //    return this.http.put(`${this.BASE_URL}/api/events/${event._id}`, formInfo, this.options)
  //      .map((res) => res.json());
  //  }


}
