import { Component, OnInit } from '@angular/core';
import { Rank, RankingService } from '../api/ranking.service';
import { UserService, User } from '../api/user.service';
import { PubDialogComponent } from '../pub-dialog/pub-dialog.component';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  ranking: Rank[];
  user: User;

  constructor(
    private rankingService: RankingService, 
    private userService: UserService,
    private matDialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    if(localStorage.getItem('addsConsumes') !== 'yes') {
      setTimeout(() => {
        let dialogRef = this.matDialog.open(PubDialogComponent, {
          height: '70%',
          minHeight: '350px',
          width: '40%',
          minWidth: '500px',
          panelClass: 'dialog-without-padding',
          backdropClass: 'darker-backdrop',
          scrollStrategy: this.overlay.scrollStrategies.block()
        });

        dialogRef.afterClosed().subscribe(() => {
          localStorage.setItem('addsConsumes', 'yes');
        });
      })

    }

    this.userService.userSubject.subscribe(user => {
      this.user = user;
      // console.log("USER: ", this.user)
      this.processRanking();
    });
    this.rankingService.globalRanking.subscribe(ranking => {
      this.ranking = ranking;
      // console.log("RANKing: ", this.ranking)
      this.processRanking();
    });
    this.rankingService.getGlobalRanking();
    
  }

  processRanking() {
    if(this.user && this.ranking) {
      // console.log("here");
      this.ranking.forEach(rank => {
        rank.highlighted = rank.user.id == this.user.id;
      });
    }
  }

}
