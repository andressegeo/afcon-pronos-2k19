import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

  constructor() { }

}

export interface Team {
  id: number;
  name: string;
  iso2: string;
  flag_url: string;
  eliminated: boolean;
}