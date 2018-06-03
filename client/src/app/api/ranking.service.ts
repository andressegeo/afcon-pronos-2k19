import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';
import { User } from './user.service';

@Injectable()
export class RankingService {

  globalRanking: BehaviorSubject<Array<Rank>>;

  constructor(private apiService: ApiService) {
    this.globalRanking = new BehaviorSubject(undefined);

    this.getGlobalRanking();
  }

  getGlobalRanking() {
    return this.apiService.getGlobalRanking().subscribe(data => {
      this.globalRanking.next(data.items);
    });
  }

}

export interface Rank {
  rank: number;
  user: User;
  highlighted?: boolean;
}
