import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { Match } from './match.service';
import { ApiService } from './api.service';
import { FakeService } from './fake.service';

@Injectable()
export class StageService {

  stages: Stage[];
  stagesSubject: BehaviorSubject<Stage[]>;

  constructor(private apiService: ApiService, private fakeService: FakeService) {
    this.stagesSubject = new BehaviorSubject(undefined);
  }

  getStagesWithMatches() {
    this.apiService.getMatches().subscribe(data => {
      this.stages = data.items;
      this.stagesSubject.next(this.stages);
    });
  }

}

export interface Stage {
  id: number;
  name: string;
  opening_time: number;
  closing_time: number;
  matches: Array<Match>;
  must_have_winner: boolean;
}
