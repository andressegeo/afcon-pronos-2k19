import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable()
export class RankingService {

  constructor() { }

}

export interface Rank {
  rank: number;
  user: User;
}