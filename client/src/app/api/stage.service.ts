import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { Match } from './match.service';
import { ApiService } from './api.service';
import { FakeService } from './fake.service';

@Injectable()
export class StageService {

  constructor(private apiService: ApiService, private fakeService: FakeService) { }

  getStagesWithMatches() {
    return this.apiService.getMatches().map(data => {
      return data.items;
    });
  }

}

export interface Stage {
  id: number;
  name: string;
  opening_time: number;
  closing_time: number;
  matches: Array<Match>;
}
