import { Component, OnInit } from '@angular/core';
import { Rank, RankingService } from '../api/ranking.service';
import { UserService, User } from '../api/user.service';


@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  ranking = [];

  constructor(private rankingService: RankingService, private userService: UserService) { }

  ngOnInit() {
    this.userService.userSubject.subscribe(user => {
      this.rankingService.globalRanking.subscribe(ranking => {
        if(ranking) {
          ranking.forEach(rank => {
            rank.highlighted = rank.user.id == user.id;
            this.ranking.push(rank);
          });
        }
      });
    });
  }

}
