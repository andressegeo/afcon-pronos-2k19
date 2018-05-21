import { Component, OnInit, Input } from '@angular/core';

import { Rank } from './../../api/ranking.service';

@Component({
  selector: 'rankings-row',
  templateUrl: './rankings-row.component.html',
  styleUrls: ['./rankings-row.component.scss']
})
export class RankingsRowComponent implements OnInit {

  @Input() item: Rank;

  constructor() { }

  ngOnInit() {
  }

}