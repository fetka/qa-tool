/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-duplicates */
import { OnInit } from '@angular/core';
/* eslint-disable comma-dangle */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  link!: string;

  snapshotLinks!: string[];

  initial!: number;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { snapshotLinks: string[]; initial: number }
  ) {}

  ngOnInit(): void {
    this.initial = this.data.initial;
    this.snapshotLinks = this.data.snapshotLinks;
    this.link = this.data.snapshotLinks[this.initial];
    // console.log(this.data.snapshotLinks);
  }

  next(value: number) {
    const len = this.snapshotLinks.length;
    if (this.initial + value > len - 1) {
      this.link = this.snapshotLinks[0];
      this.initial = 0;
      return;
    }
    if (this.initial + value < 0) {
      this.link = this.snapshotLinks[len - 1];
      this.initial = len - 1;
      return;
    }
    this.link = this.snapshotLinks[this.initial + value];
    this.initial += value;
  }

  moveTo(event: any) {
    if (event.key === 'ArrowLeft') {
      this.next(-1);
    }
    if (event.key === 'ArrowRight') {
      this.next(1);
    }
    // console.log('event.target.value');
    // console.log(event.key);
    // ArrowLeft ArrowRight
  }
}
