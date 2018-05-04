import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-betting-board',
  templateUrl: './betting-board.component.html',
  styleUrls: ['./betting-board.component.scss']
})
export class BettingBoardComponent implements OnInit {

  stages: any[];

  constructor() { }

  ngOnInit() {
    this.stages = [{
      name: 'Groupe A'
    },
    {
      name: 'Groupe B'
    }]
  }

}
