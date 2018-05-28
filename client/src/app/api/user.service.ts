import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { Prediction } from './prediction.service';
import { Team } from './team.service';
import { FakeService } from "./fake.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  user: User;
  userSubject: BehaviorSubject<User>;

  constructor(private apiService: ApiService, private fakeService: FakeService) {
    this.userSubject = new BehaviorSubject(undefined);
    this.userSubject.subscribe(newUser => {
      this.user = newUser;
    })
  }


  getCurrentUser() {
    if (environment.production) {
      this.apiService.getCurrentUser().subscribe(user => {
        this.user = user.items[0]['Me'][0];
        this.user['predictions'] = user.items[1]['predictions'];
        this.userSubject.next(this.user);
      }, err => {
        console.error('error fetching user', err);
      });
    } else {
      this.userSubject.next(this.fakeService.getFakeUser());
    }
  }

  postWorldcupWinnerPrediction(team) {
    if (environment.production) {
      return this.apiService.postWorldcupWinnerPrediction(team, this.user).subscribe(response => {

      }, err => {
        console.error('error fetching user', err);
      });
    } else {
      return this.fakeService.postWorldcupWinnerPrediction(team);
    }
  }

  isAdmin(): boolean {
    return this.user !== undefined && this.user.is_admin;
  }

  enterMatchResult(score, match): Observable<any> {
    if (this.isAdmin()) {
      if (environment.production) {
        return this.apiService.postFinalScore(score, match);
      } else {
        return this.fakeService.postFinalScore(score, match);
      }
    }
  }

  enterWorldcupWinner(winner): Observable<any> {
    if (this.isAdmin()) {
      if (environment.production) {
        return this.apiService.postWorldcupWinner(winner);
      } else {
        return this.fakeService.postWorldcupWinner(winner);
      }
    }
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
  is_admin?: boolean;
}
