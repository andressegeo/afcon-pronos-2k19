import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent {

  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) { }

  close() {
    this.dialogRef.close();
  }

}
