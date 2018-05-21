import { Injectable } from '@angular/core';

import STADIUMS from './stadiums';
import TEAMS from './teams';
import STAGES from './stages';

@Injectable()
export class FakeService {

  stadiums = STADIUMS;
  teams = TEAMS;
  stages = STAGES;

  constructor() { }

}

