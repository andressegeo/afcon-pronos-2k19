import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent {

  isMagicPlaying = false;
  magic = new Audio('/assets/magic.mp3');

  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) {}

  close() {
    this.magic.play();
    this.dialogRef.close();
  }

}
