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
}
