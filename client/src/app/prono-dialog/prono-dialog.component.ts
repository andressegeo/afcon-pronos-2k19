import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms'

@Component({
  selector: 'app-prono-dialog',
  templateUrl: './prono-dialog.component.html',
  styleUrls: ['./prono-dialog.component.scss']
})
export class PronoDialogComponent implements OnInit {

  team_1_score: number;
  team_2_score: number;
  winnerId: number;
  rateControl;
  constructor(public dialogRef: MatDialogRef<PronoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(this.data.prediction) {
      if(this.data.prediction.score) {
        this.fillScores(this.data.prediction.score);
      }
      if(this.data.prediction.winner) {
        this.winnerId = this.data.prediction.winner;
      }
    }
    this.rateControl = new FormControl("", [Validators.max(20), Validators.min(0)])

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

  mustHaveWinner(): boolean {
    return this.data.stage.must_have_winner === true;
  }

  validatePrediction() {
    let prediction = {
      score: this.team_1_score + '-' + this.team_2_score
    };
    if (this.team_1_score === this.team_2_score) {
      if(!this.mustHaveWinner()) {
        prediction['winner'] = null;
      } else {
        prediction['winner'] = this.winnerId
      }
    } else {
      prediction['winner'] = this.winnerId
    }
    this.dialogRef.close(prediction);
  }

  isValidPrediction() {
    if (typeof this.team_1_score === 'number' && typeof this.team_2_score === 'number'
    && (0 <= this.team_1_score && this.team_1_score <= 20) && (0 <= this.team_2_score && this.team_2_score <= 20)) {
      if(this.mustHaveWinner()) {
        return this.winnerId !== undefined;
      }
      return true
    }
  }
}
