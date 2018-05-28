import { Component, OnInit, Inject } from '@angular/core';
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

  ngOnInit() {

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
