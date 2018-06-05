import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";

@Injectable()
export class PredictionService {

  constructor(private apiService : ApiService) { }

  postPredict(match, prediction) {
    return this.apiService.postPrediction(match['id'], prediction['score'], prediction['winner']);
  }

  randomPredict() {
    return this.apiService.randomPredict();
  }

}

export interface Prediction {
  id: number;
  matches_id: number;
  score: string;
  winner: number;
}
