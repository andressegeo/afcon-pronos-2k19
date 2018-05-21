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
        return data.teams;
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
