import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import STADIUMS from './stadiums';
import TEAMS from './teams';
import STAGES from './stages';

@Injectable()
export class FakeService {

  stadiums = STADIUMS;
  teams = TEAMS;
  stages = STAGES;

  constructor() { }

  getStages() {
    return Observable.of(this.stages);
  }

  getTeams() {
    return Observable.of(this.teams.sort((t1, t2) => {
      return t1['name'] < t2['name'] ? -1 : 1;
    }));
  }
}

