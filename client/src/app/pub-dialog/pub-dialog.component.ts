import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pub-dialog',
  templateUrl: './pub-dialog.component.html',
  styleUrls: ['./pub-dialog.component.scss']
})
export class PubDialogComponent implements OnInit {

  isMagicPlaying = false;
  magic = new Audio('/assets/magic.mp3');

  constructor(public dialogRef: MatDialogRef<PubDialogComponent>) {}

  ngOnInit() {
    setTimeout(()=>{
      this.dialogRef.close();
    }, 18000);
  }

}
