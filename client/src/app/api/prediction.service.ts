import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { ApiService } from "./api.service";
import { FakeService } from "./fake.service";

@Injectable()
export class PredictionService {

  constructor(private fakeService : FakeService, private apiService : ApiService) { }

  postPredict(prediction) {
    if(!environment.production) { // TODO: remove
      return this.fakeService.predict(prediction);
    } else {
      /* matches are actually returned contained in their stage */
      return this.apiService.postPrediction(prediction).map(data => {
        return data;
      });
    }
  }

  getPredictionsForUser(user_id) {
    if(!environment.production) { // TODO: remove

    } else {
      /* matches are actually returned contained in their stage */
      return this.apiService.getPredictionsForUser(user_id).map(data => {
        return data;
      });
    }
  }

  getWordcupWinnerPrediction(user) {
    if(!environment.production) { // TODO: remove

    } else {
      /* matches are actually returned contained in their stage */
      return this.apiService.getWorldcupWinnerPrediction(user).map(data => {
        console.log('worldcup winner prediction', data);
        return data.items[0];
      });
    }
  }

}

export interface Prediction {
  id: number;
  matches_id: number;
  score: string;
  winner: number;
}