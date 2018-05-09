import { Injectable } from '@angular/core';

@Injectable()
export class StadiumService {

  constructor() { }

}

export interface Stadium {
  id: number;
  name: string;
  lat: number;
  lng: number;
  city: string;
}