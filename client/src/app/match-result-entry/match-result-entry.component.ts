import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-match-result-entry',
  templateUrl: './match-result-entry.component.html',
  styleUrls: ['./match-result-entry.component.scss']
})
export class MatchResultEntryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatchResultEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  team_1_score: number = 0;
  team_2_score: number = 0;
  winnerId: number;

  ngOnInit() {
    if(this.data.match.score) {
      this.fillScores(this.data.match.score);
    }
    if(this.data.match.winner) {
      this.winnerId = this.data.match.winner;
    }
  }

  fillScores(score) {
    let parts = score.split('-');
    this.team_1_score = parseInt(parts[0]);
    this.team_2_score = parseInt(parts[1]);
  }

  scoreChanged() {
    if(!Number.isInteger(this.team_1_score) || !Number.isInteger(this.team_2_score)) {
      this.winnerId = undefined;
      return;
    }

    if(this.team_1_score === this.team_2_score) {
      this.winnerId = undefined;
    } else {
      this.winnerId = this.team_1_score > this.team_2_score ? this.data.match.team_1.id : this.data.match.team_2.id;
    }
  }

  validateScore(team_1_score, team_2_score) {
    let score = {
      score: team_1_score + '-' + team_2_score
    };
    if (team_1_score === team_2_score) {
      score['winner'] = null;
    } else {
      score['winner'] = team_1_score > team_2_score ? this.data.match.team_1.id : this.data.match.team_2.id;
    }
    this.dialogRef.close(score);
  }

  isValidScore() {
    if (typeof this.team_1_score === 'number' && typeof this.team_2_score === 'number') {
      return true
    }
  }

}
