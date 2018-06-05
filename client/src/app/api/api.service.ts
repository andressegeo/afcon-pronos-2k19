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
    let url = this.makeUrl('winner/');
    return this.restService.get(url);
  }

  getPredictionsForUser(user_id) {
    let url = this.makeUrl(`winner_prediction/all_predictions/${user_id}`);
    return this.restService.get(url);
  }

  postPrediction(matchId, score, winner) {
    let url = this.makeUrl(`matches/${matchId}/predict`);
    return this.restService.post(url, {score: score, winner: winner});
  }

  postFinalScore(matchId, prediction) {
    let url = this.makeUrl(`matches/${matchId}/enter_score`);
    return this.restService.post(url, prediction);
  }

  enterWorldcupWinner(winner) {
    let url = this.makeUrl('winner/');
    return this.restService.post(url, {winner: winner});
  }

  predictWorldcupWinner(winner) {
    let url = this.makeUrl('winner_prediction/');
    return this.restService.post(url, {winner: winner});
  }

  getTeam(team_id) {
    let url = this.makeUrl(`teams/${team_id}`);
    return this.restService.get(url);
  }

  getGlobalRanking() {
    let url = this.makeUrl('ranking/');
    return this.restService.get(url);
  }

  randomPredict() {
    let url = this.makeUrl('matches/random_predict');
    return this.restService.post(url);
  }

}
