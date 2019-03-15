import { Component, OnInit } from '@angular/core';
import { Rank, RankingService } from '../api/ranking.service';
import { UserService, User } from '../api/user.service';


@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  ranking: Rank[];
  user: User;

  constructor(private rankingService: RankingService, private userService: UserService) { }

  ngOnInit() {
    this.userService.userSubject.subscribe(user => {
      this.user = user;
      console.log("USER: ", this.user)
      this.processRanking();
    });
    this.rankingService.globalRanking.subscribe(ranking => {
      this.ranking = ranking;
      console.log("RANKing: ", this.ranking)
      this.processRanking();
    });
    this.rankingService.getGlobalRanking();
    
  }

  processRanking() {
    if(this.user && this.ranking) {
      console.log("here");
      this.ranking.forEach(rank => {
        rank.highlighted = rank.user.id == this.user.id;
      });
    }
  }

}
