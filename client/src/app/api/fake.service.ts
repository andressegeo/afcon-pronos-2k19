import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {User, UserService} from "./user.service";
import { Prediction, PredictionService } from "./prediction.service";

import STADIUMS from './stadiums';
import TEAMS from './teams';
import STAGES from './stages';

@Injectable()
export class FakeService {

  stadiums = STADIUMS;
  teams = TEAMS;
  stages = STAGES;
  nbFakePred = 0;

  constructor() { }

  getStages() {
    return Observable.of(this.stages);
  }

  getTeams() {
    return Observable.of(this.teams.sort((t1, t2) => {
      return t1['name'] < t2['name'] ? -1 : 1;
    }));
  }

  getWorldcupWinner() {
    return Observable.of({winner: 1, opening_time:1528988400, closing_time: 1531686600})
  }

  predict(prediction) {
    console.log('prediction is', prediction);
    this.nbFakePred++;
    const pred: Prediction = {
      id: this.nbFakePred,
      matches_id: prediction.matches_id,
      score: prediction.score,
      winner: prediction.winner
    };
    return Observable.of(pred);
  }

  getFakeUser() {
    return <User>{
      id: 1,
      email: 'dgc@devoteamgcloud.com',
      name: 'DGC',
      entity: 'devoteamgcloud.com',
      picture_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_2nqm0H20gpO-Pf9BsBwuAYt3McWcb-6rFs37i244h71Lyrnkg',
      worldcup_winner: null,
      predictions: [],
      has_modified_worldcup_winner: false,
      points: 0,
      is_admin: true
    };
  }

  postFinalScore(score, match) {
    console.log('score', score);
    console.log('match', match);
    return Observable.of('ok');
  }

  postWorldcupWinner(winner) {
    console.log('winner');
    return Observable.of('ok');
  }

  postWorldcupWinnerPrediction(winner) {
    console.log('winner');
    return Observable.of('ok');
  }
}
