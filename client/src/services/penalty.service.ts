import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class PenaltyService {
   BASE_URL:string =`${environment.BASE_URL}`;
   options:object = {withCredentials:true};


   constructor(private http: Http) {}

   indexPenalties() {
     return this.http.get(`${this.BASE_URL}/api/penalties`, this.options)
       .map((res) => res.json());
   }

   newPenalty(teamName,members) { // cambiar los parametros en la funcion y la url
     return this.http.post(`${this.BASE_URL}/api/penalties`,{teamName,members}, this.options)
       .map((res) => res.json());
   }

   getPenalty(id) {
     return this.http.get(`${this.BASE_URL}/api/penalties/${id}`, this.options)
       .map((res) => res.json());
   }

   editPenalty(event,formInfo) { // cambiar los parametros en la funcion y la url
     return this.http.put(`${this.BASE_URL}/api/penalties/${event._id}`, formInfo, this.options)
       .map((res) => res.json());
   }

   deletePenalty(id) {
     return this.http.delete(`${this.BASE_URL}/api/penalties/${id}`, this.options)
       .map((res) => res.json());
   }


}
