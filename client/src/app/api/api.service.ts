import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { RestService } from './rest.service';

@Injectable()
export class ApiService {
  API_BASE_URL: string = environment.apiBaseUrl;

  constructor(private restService: RestService) { }

  makeUrl(endpoint) {
    return `${this.API_BASE_URL}${endpoint}`;
  }

  getCurrentUser() {
    let url = this.makeUrl('users/me');
    return this.restService.get(url);
  }

  getMatches() {
    let url = this.makeUrl('matches/');
    return this.restService.get(url);
  }

  getStadiums() {
    let url = this.makeUrl('stadiums/');
    return this.restService.get(url);
  }

  getTeams() {
    let url = this.makeUrl('teams/');
    return this.restService.get(url);
  }

  getWorldcupWinner() {
    let url = this.makeUrl('/winner/');
    return this.restService.get(url);
  }

  getPredictionsForUser(user_id) {
    let url = this.makeUrl(`winner_prediction/all_predictions/${user_id}`);
    return this.restService.get(url);
  }

  postPrediction(prediction) {
    console.log('prediction', prediction);
    let url = this.makeUrl(`matches/${prediction.matches_id}/predict`);
    return this.restService.post(url, {prediction: prediction});
  }

  postFinalScore(score, match) {
    let url = this.makeUrl(`matches/${match}/enter_score`);
    return this.restService.post(url, {result: score});
  }

  enterWorldcupWinner(winner) {
    let url = this.makeUrl('winner/');
    return this.restService.post(url, {winner: winner});
  }

  predictWorldcupWinner(winner) {
    let url = this.makeUrl('winner_prediction/');
    return this.restService.post(url, {winner: winner});
  }

  getWorldcupWinnerPrediction(user) {
    let url = this.makeUrl(`winner_prediction/${user}`);
    return this.restService.get(url);
  }

  getTeam(team_id) {
    let url = this.makeUrl(`teams/${team_id}`);
    return this.restService.get(url);
  }

}
