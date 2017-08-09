import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PenaltyService } from '../../services/penalty.service';
import { EventUserService } from '../../services/eventuser.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team:any;

  constructor(
    private eventService: EventService,
    private eventUserService: EventUserService,
    private teamService: TeamService,
    private penaltyService: PenaltyService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.initializeComponent();
  }

  initializeComponent(){
    this.route.params
      .subscribe((params) => {
        this.teamService.getTeam(params.id).subscribe(team => {
          console.log("nos devuelve team:")
          console.log(team)
          this.team = team;
          // this.eventUserService.indexEventUsersRelations(team._id).subscribe(attendees => {
          //   this.attendees = attendees
          //   console.log(this.attendees)
          //   this.teamService.indexTeams().subscribe((teamsAvailable => {
          //     this.availableTeamsEvent = teamsAvailable
          //     console.log(teamsAvailable)
          //   }),
          //   (err => console.log(err)))
          // })
        })
      })
  }

}
