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

   editEventUsersRelations(user,formInfo) {
     console.log('edit EventUsers relations')
     console.log(user)
     console.log(formInfo)
     return this.http.put(`${this.BASE_URL}/api/events/users/${user._id}/users`, formInfo, this.options)
     .map((res) => res.json());
   }


}
