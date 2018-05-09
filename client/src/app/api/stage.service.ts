import { Injectable } from '@angular/core';
import { Match } from './match.service';

@Injectable()
export class StageService {

  constructor() { }

}

export interface Stage {
  id: number;
  name: string;
  opening_time: number;
  closing_time: number;
  matches: Array<Match>;
}