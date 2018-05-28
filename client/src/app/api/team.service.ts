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
    if(!environment.production) { // TODO: remove
      return this.fakeService.getTeams();
    } else {
      return this.apiService.getTeams().map(data => {
        return data.items;
      });
    }
  }

  getWorldcupWinner() {
    if(!environment.production) {
      return this.fakeService.getWorldcupWinner();
    } else {
      return this.apiService.getWorldcupWinner().map(data => {
        return data.items;
      });
    }
  }

  getOneTeam(team_id) {
    if(!environment.production) {
      // return this.fakeService.getWorldcupWinner();
    } else {
      return this.apiService.getTeam(team_id).map(data => {
        return data.items;
      });
    }
  }

}

export interface Team {
  id: number;
  name: string;
  iso2: string;
  flag_url: string;
  eliminated: boolean;
}
