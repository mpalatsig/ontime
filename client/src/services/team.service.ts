import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class TeamService {
   BASE_URL:string =`${environment.BASE_URL}`;
   options:object = {withCredentials:true};


   constructor(private http: Http) {}

   indexTeams() {
     return this.http.get(`${this.BASE_URL}/api/teams`, this.options)
       .map((res) => res.json());
   }

   newTeam(teamName,members) {
     return this.http.post(`${this.BASE_URL}/api/teams`,{teamName,members}, this.options)
       .map((res) => res.json());
   }

   getTeam(id) {
     return this.http.get(`${this.BASE_URL}/api/teams/${id}`, this.options)
       .map((res) => res.json());
   }

   editTeam(teamID,formInfo) {
     return this.http.put(`${this.BASE_URL}/api/teams/${teamID}`, formInfo, this.options)
       .map((res) => res.json());
   }

   deleteTeam(id) {
     return this.http.delete(`${this.BASE_URL}/api/teams/${id}`, this.options)
       .map((res) => res.json());
   }


}
