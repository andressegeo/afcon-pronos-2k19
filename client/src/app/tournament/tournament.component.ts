import { Component, OnInit } from '@angular/core';
import { PubDialogComponent } from '../pub-dialog/pub-dialog.component'; 
import { MatDialog, MatIconRegistry } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    if(localStorage.getItem('addsConsumes') !== 'yes') {
      setTimeout(() => {
        let dialogRef = this.matDialog.open(PubDialogComponent, {
          height: '90%',
          minHeight: '400px',
          width: '35%',
          minWidth: '500px',
          panelClass: 'dialog-without-padding',
          backdropClass: 'darker-backdrop',
          scrollStrategy: this.overlay.scrollStrategies.block()
        });

        dialogRef.afterClosed().subscribe(() => {
          localStorage.setItem('addsConsumes', 'yes');
        });
      })

    }
  }

}
