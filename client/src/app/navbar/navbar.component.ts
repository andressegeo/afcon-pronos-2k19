import { Component, OnInit } from "@angular/core";

import { User, UserService } from "./../api/user.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userSubject.subscribe(user => {
      this.user = user;
    });
  }
}
