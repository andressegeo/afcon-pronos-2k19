import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TeamPickerDialogComponent } from './../team-picker-dialog/team-picker-dialog.component';
import { StageService } from './../api/stage.service';
import { TeamService } from './../api/team.service';

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  stages: any[];
  teams: any[];
  worldcupWinner: any;

  constructor(private matDialog: MatDialog,
    private stageService: StageService,
    private teamService: TeamService) { }

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
        this.worldcupWinner = result;
      }
    });
  }
}
