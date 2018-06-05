import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { PredictionService } from './../api/prediction.service';

@Component({
  selector: 'app-random-predictions',
  templateUrl: './random-predictions.component.html',
  styleUrls: ['./random-predictions.component.scss']
})
export class RandomPredictionsComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private predictionService : PredictionService,
  public dialogRef: MatDialogRef<RandomPredictionsComponent>) { }

  ngOnInit() {
  }

  randomPredict() {
    this.isLoading = true;
    this.predictionService.randomPredict().subscribe(() => {
      this.isLoading = false;
      this.dialogRef.close(true);
    }, err => {
      this.isLoading = false;
      console.error(err);
    });
  }

}
