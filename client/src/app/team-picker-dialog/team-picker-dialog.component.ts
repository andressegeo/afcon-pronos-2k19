import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-team-picker-dialog',
  templateUrl: './team-picker-dialog.component.html',
  styleUrls: ['./team-picker-dialog.component.scss']
})
export class TeamPickerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TeamPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  pickTeam(team: any) {
    this.dialogRef.close(team);
  }
}
