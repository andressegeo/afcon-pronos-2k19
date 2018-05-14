import { Component, OnInit } from '@angular/core';

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
  }

}
