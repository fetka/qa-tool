/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-duplicates */
/* eslint-disable comma-dangle */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogData, Direction, Screenshot } from '../models/test-case';
import * as utilities from '../helpers/utilities';

// declare const nextPointer: any;
@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  screenshots!: Screenshot[];

  screenshot!: Screenshot;

  pointer!: number;

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: DialogData
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.pointer = this.data.pointer;
    this.screenshots = this.data.list;
    this.screenshot = this.data.list[this.pointer];
  }

  showNextImage(direction: number) {
    if (this.screenshots.length === 1) return;

    direction === Direction.LEFT
      ? (this.pointer = utilities.nextPointer(
          this.screenshots.length,
          this.pointer,
          Direction.LEFT
        ))
      : (this.pointer = utilities.nextPointer(
          this.screenshots.length,
          this.pointer,
          Direction.RIGHT
        ));

    this.screenshot = this.screenshots[this.pointer];
  }
}
