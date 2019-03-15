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
    console.log('Base url: ' + this.API_BASE_URL);
    const url = `${this.API_BASE_URL}${endpoint}`;
    console.log('url complete: ' + url);
    return url;
  }

  getCurrentUser() {
    const url = this.makeUrl('users/me');
    return this.restService.get(url);
  }

  getMatches() {
    const url = this.makeUrl('matches/');
    return this.restService.get(url);
  }

  getStadiums() {
    const url = this.makeUrl('stadiums/');
    return this.restService.get(url);
  }

  getTeams() {
    const url = this.makeUrl('teams/');
    return this.restService.get(url);
  }

  getWorldcupWinner() {
    const url = this.makeUrl('winner/');
    return this.restService.get(url);
  }

  getPredictionsForUser(user_id) {
    const url = this.makeUrl(`winner_prediction/all_predictions/${user_id}`);
    return this.restService.get(url);
  }

  postPrediction(matchId, score, winner) {
    const url = this.makeUrl(`matches/${matchId}/predict`);
    return this.restService.post(url, {score: score, winner: winner});
  }

  postFinalScore(matchId, prediction) {
    const url = this.makeUrl(`matches/${matchId}/enter_score`);
    return this.restService.post(url, prediction);
  }

  enterWorldcupWinner(winner) {
    const url = this.makeUrl('winner/');
    return this.restService.post(url, {winner: winner});
  }

  predictWorldcupWinner(winner) {
    const url = this.makeUrl('winner_prediction/');
    return this.restService.post(url, {winner: winner});
  }

  getTeam(team_id) {
    const url = this.makeUrl(`teams/${team_id}`);
    return this.restService.get(url);
  }

  getGlobalRanking() {
    const url = this.makeUrl('ranking/');
    return this.restService.get(url);
  }

  randomPredict() {
    const url = this.makeUrl('matches/random_predict');
    return this.restService.post(url);
  }

}
