import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent implements AfterViewInit {

  isMagicPlaying = false;
  @ViewChild('magicPlayer') magic;

  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) {}

  ngAfterViewInit() {
    this.magic.nativeElement.play().then(() => {
      this.isMagicPlaying = true;
    });
    this.magic.nativeElement.addEventListener('ended', () => {
      this.isMagicPlaying = false;
    });
  }

  pause() {
    if(this.isMagicPlaying) {
      this.magic.nativeElement.pause();
      this.magic.nativeElement.currentDuration = 0;
      this.isMagicPlaying = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  test() {}

}
