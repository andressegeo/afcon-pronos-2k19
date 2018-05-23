import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { UserService } from './api/user.service';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService,
    private matDialog: MatDialog) {}

  ngOnInit() {
    this.userService.getCurrentUser();

    if(localStorage.getItem('isFirstVisitGuuuuuys') !== 'yes') {
       let dialogRef = this.matDialog.open(WelcomeDialogComponent, {
        height: '90%',
        minHeight: '400px',
        width: '35%',
        minWidth: '500px',
        panelClass: 'dialog-without-padding',
        backdropClass: 'darker-backdrop'
      });

      dialogRef.afterClosed().subscribe(() => {
        localStorage.setItem('isFirstVisitGuuuuuys', 'yes');
      });
    }
  }
}
