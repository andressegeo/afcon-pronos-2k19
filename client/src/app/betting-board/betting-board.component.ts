import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TeamPickerDialogComponent } from './../team-picker-dialog/team-picker-dialog.component';
import { StageService } from './../api/stage.service';
import { TeamService } from './../api/team.service';
import { UserService } from './../api/user.service';
import { AreYouSureDialogComponent } from './../are-you-sure-dialog/are-you-sure-dialog.component';

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  stages: any[];
  teams: any[];
  worldcupWinnerPrediction: any;
  worldcupWinner: any;

  constructor(private matDialog: MatDialog,
    private stageService: StageService,
    private teamService: TeamService,
    private userService: UserService) { }

  ngOnInit() {
    this.stageService.getStagesWithMatches().subscribe(stages => this.stages = stages);
    this.teamService.getTeams().subscribe(teams => this.teams = teams);
  }

  openTeamPickerDialog(): void {
    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams },
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.worldcupWinnerPrediction = result;
      }
    });
  }

  get isAdmin() {
    return this.userService.isAdmin();
  }

  selectWorldcupWinner() {
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
}
