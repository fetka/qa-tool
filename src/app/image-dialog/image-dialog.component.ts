/* eslint-disable import/named */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-duplicates */
import { OnInit } from '@angular/core';
/* eslint-disable comma-dangle */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Direction } from '../models/test-case';

declare const getNextPointer: any;
@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  screenshotLink!: string;

  screenshotLinks!: string[];

  pointer!: number;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { screenshotLinks: string[]; pointer: number }
  ) {}

  ngOnInit(): void {
    this.pointer = this.data.pointer;
    this.screenshotLinks = this.data.screenshotLinks;
    this.screenshotLink = this.data.screenshotLinks[this.pointer];
  }

  showNextImage(event: KeyboardEvent) {
    if (this.screenshotLinks.length === 1) return;
    if (event.key === 'ArrowLeft') {
      this.pointer = getNextPointer(
        this.screenshotLinks.length,
        this.pointer,
        Direction.LEFT
      );
    }
    if (event.key === 'ArrowRight') {
      this.pointer = getNextPointer(
        this.screenshotLinks.length,
        this.pointer,
        Direction.RIGHT
      );
    }
    this.screenshotLink = this.screenshotLinks[this.pointer];
  }
}
