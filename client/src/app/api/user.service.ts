import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {

  user: any;
  userSubject: BehaviorSubject<any>;

  constructor(private apiService: ApiService) {
    this.userSubject = new BehaviorSubject(undefined);
  }

  getCurrentUser() {
    this.apiService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.userSubject.next(this.user);
    }, err => {
      console.error(err);
    });
  }

}
