import { Component, OnInit } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Overlay } from '@angular/cdk/overlay';

import { UserService } from './api/user.service';
import { StageService } from './api/stage.service';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  vuvu = new Audio('/assets/vuvu.mp3')
  vuvuPlaying: boolean = false;

  constructor(private userService: UserService,
    private stageService: StageService,
    private matDialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private overlay: Overlay) {
      matIconRegistry.addSvgIcon('trophy', sanitizer.bypassSecurityTrustResourceUrl('/assets/trophy.svg'))
    }

  ngOnInit() {
    this.userService.getCurrentUser();
    this.userService.getWorldcupWinner();
    this.stageService.getStagesWithMatches();

    this.vuvu.volume = 0.1;

    if(localStorage.getItem('firstConnection') !== 'yes') {
      setTimeout(() => {
        let dialogRef = this.matDialog.open(WelcomeDialogComponent, {
          height: '90%',
          minHeight: '400px',
          width: '35%',
          minWidth: '500px',
          panelClass: 'dialog-without-padding',
          backdropClass: 'darker-backdrop',
          scrollStrategy: this.overlay.scrollStrategies.block()
        });

        dialogRef.afterClosed().subscribe(() => {
          localStorage.setItem('firstConnection', 'yes');
        });
      })

    }
  }

  playVuvu() {
    if(this.vuvu.currentTime > 0) {
      this.vuvu.pause();
      this.vuvu.currentTime = 0;
      this.vuvuPlaying = false;
    } else {
      this.vuvu.play();
      this.vuvuPlaying = true;
      this.vuvu.addEventListener('ended', () => {
        this.vuvuPlaying = false;
      });
    }
  }
}
