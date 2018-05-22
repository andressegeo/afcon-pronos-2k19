import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TeamPickerDialogComponent } from './../team-picker-dialog/team-picker-dialog.component';
import { StageService, Stage } from './../api/stage.service';
import { TeamService, Team } from './../api/team.service';
import { UserService, User } from './../api/user.service';
import { AreYouSureDialogComponent } from './../are-you-sure-dialog/are-you-sure-dialog.component';

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  stages: Stage[];
  teams: Team[];
  worldcupWinnerPrediction: Team;
  worldcupWinner: Team;
  currentUser: User;

  constructor(private matDialog: MatDialog,
    private stageService: StageService,
    private teamService: TeamService,
    private userService: UserService) { }

  ngOnInit() {
    this.stageService.getStagesWithMatches().subscribe(stages => this.stages = stages);
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
    this.userService.userSubject.subscribe(user => {
      this.currentUser = user;
      if(user && this.currentUser.worldcup_winner) {
        this.worldcupWinnerPrediction = this.currentUser.worldcup_winner;
      }
    });
  }

  openTeamPickerDialog(): void {
    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams },
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.worldcupWinnerPrediction = result;
      /* TODO: call the POST /winner_prediction endpoint */
    });
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  selectWorldcupWinner() {
    if(!this.isAdmin()) {
      return;
    }

    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams },
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
        let otherDialogRef = this.matDialog.open(AreYouSureDialogComponent);
        otherDialogRef.afterClosed().subscribe(sure => {
          if(sure === true) {
            this.worldcupWinner = result;
          }
        })
    });
  }

  get worldcupWinnerPredictionPoints(): number {
    if(this.currentUser !== undefined
      && this.worldcupWinnerPrediction !== undefined
      && this.worldcupWinner !== undefined) {

      if(this.worldcupWinnerPrediction.id === this.worldcupWinner.id) {
        if(this.currentUser.has_modified_worldcup_winner) {
          return 5;
        } else {
          return 10;
        }
      } else {
        return 0;
      }
    } else {
      return null;
    }
  }
}
