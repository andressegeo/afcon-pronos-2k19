import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TeamPickerDialogComponent } from './../team-picker-dialog/team-picker-dialog.component';

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  stages: any[];
  teams: any[];
  worldcupWinner: any;

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
    /* TODO: fetch teams, stages */
    this.teams = [{
      name: 'Andorre',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/ad.svg'
    },{
      name: 'Belgique',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/be.svg'
    },{
      name: 'Andorre',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/ad.svg'
    },{
      name: 'Belgique',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/be.svg'
    },{
      name: 'Andorre',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/ad.svg'
    },{
      name: 'Belgique',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/be.svg'
    },{
      name: 'Andorre',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/ad.svg'
    },{
      name: 'Belgique',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/be.svg'
    },{
      name: 'Andorre',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/ad.svg'
    },{
      name: 'Belgique',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/be.svg'
    },{
      name: 'Andorre',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/ad.svg'
    },{
      name: 'Belgique',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/be.svg'
    }];
  }

  openTeamPickerDialog(): void {
    let dialogRef = this.matDialog.open(TeamPickerDialogComponent, {
      data: { teams: this.teams }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.worldcupWinner = result;
      }
    });
  }
}
