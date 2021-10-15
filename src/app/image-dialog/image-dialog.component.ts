import {
  DialogData,
  Direction,
  MediaType,
  Screenshot,
} from '../models/test-case';
/* eslint-disable import/named */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-duplicates */
import { HostListener, OnInit } from '@angular/core';
/* eslint-disable comma-dangle */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare const getNextPointer: any;
@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  screenshots!: Screenshot[];

  // screenshotObj: Screenshot = {
  //   title: '',
  //   link: '../../assets/screenshots/IMG_0098.PNG',
  //   type: MediaType.IMAGE,
  // };
  screenshotObj: Screenshot = {
    title: '../../assets/screenshots/AUTT1857.MP4',
    link: '../../assets/screenshots/AUTT1857.MP4',
    type: MediaType.VIDEO,
  };

  screenshot!: Screenshot;

  pointer!: number;

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   event.preventDefault();
  //   console.log(event.key);
  //   this.showNextImage(event);
  // }

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

  showNextImage(d: any) {
    if (this.screenshots.length === 1) return;
    if (d === Direction.LEFT) {
      this.pointer = getNextPointer(
        this.screenshots.length,
        this.pointer,
        Direction.LEFT
      );
    }
    if (d === Direction.RIGHT) {
      this.pointer = getNextPointer(
        this.screenshots.length,
        this.pointer,
        Direction.RIGHT
      );
    }
    this.screenshot = this.screenshots[this.pointer];
    console.log(this.screenshot);
  }
}

// showNextImage(event: KeyboardEvent) {
//   if (this.screenshotLinks.length === 1) return;
//   if (event.key === 'ArrowLeft') {
//     this.pointer = getNextPointer(
//       this.screenshotLinks.length,
//       this.pointer,
//       Direction.LEFT
//     );
//   }
//   if (event.key === 'ArrowRight') {
//     this.pointer = getNextPointer(
//       this.screenshotLinks.length,
//       this.pointer,
//       Direction.RIGHT
//     );
//   }
//   this.screenshotLink = this.screenshotLinks[this.pointer];
// }
