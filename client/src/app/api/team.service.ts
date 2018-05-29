import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { ApiService } from './api.service';
import { FakeService } from './fake.service';

@Injectable()
export class TeamService {

  constructor(private apiService: ApiService,
    private fakeService: FakeService) { }

  getTeams() {
    return this.apiService.getTeams().map(data => {
      return data.items.sort((t1, t2) => {
        return t1['name'] < t2['name'] ? -1 : 1;
      });
    });
  }

  getWorldcupWinner() {
    return this.apiService.getWorldcupWinner().map(data => {
      return data.items;
    });
  }

  getOneTeam(team_id) {
    return this.apiService.getTeam(team_id).map(data => {
      return data.items;
    });
  }

}

export interface Team {
  id: number;
  name: string;
  iso2: string;
  flag_url: string;
  eliminated: boolean;
}
