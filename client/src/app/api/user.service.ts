import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { Prediction } from '../rankings/rankings.component';
import { Team } from './team.service';

@Injectable()
export class UserService {

  user: User;
  userSubject: BehaviorSubject<User>;

  constructor(private apiService: ApiService) {
    this.userSubject = new BehaviorSubject(undefined);
  }

  getCurrentUser() {
    this.apiService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.userSubject.next(this.user);
    }, err => {
      console.error(err);
    });
  }

}

export interface User {
  id: number;
  name: string;
  email: string;
  entity: string;
  picture_url: string;
  predictions: Array<Prediction>;
  worldcup_winner: Team;
  has_modified_worldcup_winner: boolean;
  points: number;
}