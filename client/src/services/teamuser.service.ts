import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';


@Injectable()
export class TeamUserService {
   BASE_URL:string =`${environment.BASE_URL}`;
   options:object = {withCredentials:true};

   constructor(private http: Http) {}

   indexTeamUsersRelations(id) {
     console.log("Entra en la ruta del servicio");
     return this.http
        .get(`${this.BASE_URL}/api/teamusers/${id}/index`, this.options)
        .map((res) => res.json());
   }

   editTeamUsersRelations(relationID,penalties) {
     return this.http
      .put(`${this.BASE_URL}/api/teamusers/${relationID}/edit`, { penalties }, this.options)
      .map((res) => res.json());
   }
}
