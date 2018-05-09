import { Injectable } from '@angular/core';
import { Team } from './team.service';

@Injectable()
export class MatchService {

  constructor() { }

}

export interface Match {
  id: number;
  stage_id: number;
  match_time: number;
  team_1: Team;
  team_2: Team;
  placeholder_1: string;
  placeholder_2: string;
  stadium: Stadium;
  score: string;
  winner: number;
}