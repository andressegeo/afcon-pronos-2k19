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

  team_1_score: number;
  team_2_score: number;
  winnerId: number;
  final_score: string;

  ngOnInit() {
    if(this.data.match.score) {
      this.fillScores(this.data.match.score);
    }
    if(this.data.match.winner) {
      this.winnerId = this.data.match.winner;
    }
    if(this.data.match.final_score) {
      this.final_score = this.data.match.final_score;
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
      if(!this.mustHaveWinner()) {
        this.winnerId = undefined;
      }
    } else {
      this.winnerId = this.team_1_score > this.team_2_score ? this.data.match.team_1.id : this.data.match.team_2.id;
    }
  }

  mustHaveWinner(): boolean {
    return this.data.stage.must_have_winner === true;
  }

  needFinalScore(): boolean {
    return this.team_1_score === this.team_2_score && this.mustHaveWinner();
  }

  validateScore() {
    let score = {
      score: this.team_1_score + '-' + this.team_2_score
    };
    if (this.team_1_score === this.team_2_score) {
      if(!this.mustHaveWinner()) {
        score['winner'] = null;
      } else {
        score['winner'] = this.winnerId;
        score['final_score'] = this.final_score;
      }
    } else {
      score['winner'] = this.winnerId;
    }
    this.dialogRef.close(score);
  }

  isValidScore() {
    if (typeof this.team_1_score === 'number' && typeof this.team_2_score === 'number') {
      if(this.mustHaveWinner()) {
        return this.winnerId !== undefined && this.final_score !== undefined;
      } else {
        return true;
      }
    }
  }

}
