import { Injectable } from '@angular/core';

@Injectable()
export class PredictionService {

  constructor() { }

}

export interface Prediction {
  id: number;
  match_id: number;
  score: string;
  winner: number;
}