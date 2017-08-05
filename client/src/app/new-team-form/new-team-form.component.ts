import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-team-form',
  templateUrl: './new-team-form.component.html',
  styleUrls: ['./new-team-form.component.css']
})
export class NewTeamFormComponent implements OnInit {
  team:any;
  user:any;
  error:string;
  teamName:string;
  members:string;

  constructor(private teamService: TeamService, private session: SessionService,private router: Router) { }

  ngOnInit() {
  }

  newTeam() {
    this.teamService.newTeam(this.teamName, this.members)
    .subscribe(
      (team) => console.log(team),
      (err) => this.error = err
    );

  }

}
