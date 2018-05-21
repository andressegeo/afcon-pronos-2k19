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
    if(!environment.production) { // TODO: remove
      return this.fakeService.getStages();
    } else {
      /* matches are actually returned contained in their stage */
      return this.apiService.getMatches().map(data => {
        return data.stages;
      });
    }
  }

}

export interface Stage {
  id: number;
  name: string;
  opening_time: number;
  closing_time: number;
  matches: Array<Match>;
}
