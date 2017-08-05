import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})

export class TeamsListComponent implements OnInit {
  teams:Observable<Array<object>>;
  user:any;
  constructor(private teamService: TeamService, private session:SessionService) { }

  ngOnInit() {
    this.teamService.indexTeams()
    .subscribe(
      (team => {
      this.teams = team
      console.log(this.teams)
    }),
    (err => console.log(err)))
  }

}
