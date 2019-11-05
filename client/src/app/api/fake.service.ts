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
  stages = STAGES.map(stage => {
    if(stage.opening_time) {
      stage.opening_time = stage.opening_time * 1000;
    }
    if(stage.closing_time) {
      stage.closing_time = stage.closing_time * 1000;
    }

    for(let i = 0; i < stage.matches.length; i++) {
      if(stage.matches[i].match_time) {
        stage.matches[i].match_time = stage.matches[i].match_time * 1000;
      }
    }

    return stage;
  });

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

  getAfconWinner() {
    return Observable.of({winner: 1, opening_time:1528988400, closing_time: 1531686600})
  }

  predict(prediction) {
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
    return Observable.of(<User>{
      id: 1,
      email: 'dgc@devoteamgcloud.com',
      name: 'DGC',
      entity: 'devoteamgcloud.com',
      picture_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_2nqm0H20gpO-Pf9BsBwuAYt3McWcb-6rFs37i244h71Lyrnkg',
      afcon_winner: null,
      predictions: [],
      has_modified_afcon_winner: false,
      points: 0,
      is_admin: true
    });
  }

  postFinalScore(score, match) {
    return Observable.of('ok');
  }

  postAfconWinner(winner) {
    return Observable.of('ok');
  }

  postAfconWinnerPrediction(winner) {
    return Observable.of('ok');
  }
}

