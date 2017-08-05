import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  team:any;
  user:any;
  error:string;
  formInfo = {
    teamName: '',
    members: ''
  }

  constructor(private teamService: TeamService, private session: SessionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      this.teamService.getTeam(params.id)
      .subscribe(returnedTeam => {
        this.team = returnedTeam;
        this.formInfo.teamName = this.team.teamName;
        this.formInfo.members = this.team.members;
      })
    })
  }

  editTeam() {
    this.teamService.editTeam(this.team,this.formInfo)
    .subscribe(
      (team) => this.router.navigate(['/teams']),
      (err) => this.error = err
    );
  }

}
