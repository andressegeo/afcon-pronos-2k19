import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  stages: any[];
  teams: any[];
  worldcupWinner: any;

  constructor() { }

  ngOnInit() {
    /* TODO: fetch teams, stages */
    this.teams = [{
      name: 'Andorre',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/ad.svg'
    },{
      name: 'Belgique',
      flag_url: 'https://storage.cloud.google.com/dgc-worldcup-russia-2018.appspot.com/flags/be.svg'
    }]
  }

}
