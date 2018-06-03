import { Component, OnInit } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { UserService } from './api/user.service';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  magic = new Audio('/assets/jfhfjfhgugur.mp3')

  constructor(private userService: UserService,
    private matDialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      matIconRegistry.addSvgIcon('trophy', sanitizer.bypassSecurityTrustResourceUrl('/assets/trophy.svg'))
    }

  ngOnInit() {
    this.userService.getCurrentUser();
    this.userService.getWorldcupWinner();
    this.magic.volume = 0.2;

    if(localStorage.getItem('isFirstVisitGuuuuuys') !== 'yes') {
       let dialogRef = this.matDialog.open(WelcomeDialogComponent, {
        height: '90%',
        minHeight: '400px',
        width: '35%',
        minWidth: '500px',
        panelClass: 'dialog-without-padding',
        backdropClass: 'darker-backdrop'
      });

      this.magic.play();

      dialogRef.afterClosed().subscribe(() => {
        this.magic.pause();
        localStorage.setItem('isFirstVisitGuuuuuys', 'yes');
      });
    }
  }
}
