import { Injectable } from '@angular/core';
import { User } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService } from './api.service';

@Injectable()
export class RankingService {

  globalRanking: BehaviorSubject<Array<Rank>>;

  constructor(private apiService: ApiService) {
    this.globalRanking = new BehaviorSubject(undefined);

    this.getGlobalRanking();
  }

  getGlobalRanking() {
    // TODO
  }

}

export interface Rank {
  rank: number;
  user: User;
  highlighted?: boolean;
}