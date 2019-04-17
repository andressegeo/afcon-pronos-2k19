import { Component, Input } from '@angular/core';

import { Rank } from './../../api/ranking.service';

@Component({
  selector: 'rankings-row',
  templateUrl: './rankings-row.component.html',
  styleUrls: ['./rankings-row.component.scss']
})
export class RankingsRowComponent {
  
  @Input() 
  public item: Rank;

  constructor() {}
  ngOnInit() {
  }
}
