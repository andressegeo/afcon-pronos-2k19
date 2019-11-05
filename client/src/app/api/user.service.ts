import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ApiService } from './api.service';
import { environment } from './../../environments/environment';
import { Prediction } from './prediction.service';
import { Team } from './team.service';
import { FakeService } from "./fake.service";

@Injectable()
export class UserService {

  user: User;
  userSubject: BehaviorSubject<User>;
  afconWinnerSubject: BehaviorSubject<Team>;

  constructor(private apiService: ApiService, private fakeService: FakeService) {
    this.userSubject = new BehaviorSubject(undefined);
    this.userSubject.subscribe(newUser => {
      this.user = newUser;
    });
    this.afconWinnerSubject = new BehaviorSubject(undefined);
  }

  getCurrentUser() {
    this.apiService.getCurrentUser().subscribe(user => {
      // console.log("user: ", user)
      this.user = user;
      this.userSubject.next(this.user);
    }, err => {
      console.error('error fetching user', err);
    });
  }

  getAfconWinner() {
    this.apiService.getAfconWinner().subscribe(data => {
      this.afconWinnerSubject.next(data['winner']);
    })
  }

  isAdmin(): boolean {
    return this.user !== undefined && this.user.is_admin;
  }

  predictAfconWinner(team) {
    return this.apiService.predictAfconWinner(team).map(data => {
      let winner = data.afcon_winner;
      this.user.afcon_winner = winner.afcon_winner;
      this.userSubject.next(this.user) ;
      // console.log("WINNERR: ", winner)
      return winner;
    });

  }

  enterMatchResult(match, result): Observable<any> {
    if (this.isAdmin()) {
      return this.apiService.postFinalScore(match.id, {
        score: result.score,
        winner: result.winner,
        final_score: result.final_score
      });
    } else {
      return Observable.throw("You're not admin...");
    }
  }

  enterAfconWinner(winner): Observable<any> {
    if (this.isAdmin()) {
      return this.apiService.enterAfconWinner(winner).map(data => data.winner);
    } else {
      return  Observable.throw("You're not admin...");
    }
  }

  updatePrediction(prediction) {
    if(!this.user) {
      return;
    }

    let existing = this.user.predictions.find(p => p.id === prediction.id);

    if(existing) {
      existing.winner = prediction.winner;
      existing.score = prediction.score;
    } else {
      this.user.predictions.push(prediction);
    }

    this.userSubject.next(this.user);
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  entity: string;
  picture_url: string;
  predictions?: Array<Prediction>;
  afcon_winner: Team;
  has_modified_afcon_winner: boolean;
  points: number;
  is_admin?: boolean;
}
