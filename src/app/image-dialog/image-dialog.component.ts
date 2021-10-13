/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-duplicates */
import { OnInit } from '@angular/core';
/* eslint-disable comma-dangle */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Direction } from '../models/test-case';

@Component({
  selector: 'image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements OnInit {
  link!: string;

  snapshotLinks!: string[];

  pointer!: number;

  pointerQueue!: number[];

  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { snapshotLinks: string[]; pointer: number }
  ) {}

  ngOnInit(): void {
    this.pointer = this.data.pointer;
    this.snapshotLinks = this.data.snapshotLinks;
    this.link = this.data.snapshotLinks[this.pointer];
    this.initQueue();
  }

  initQueue() {
    if (this.snapshotLinks.length === 1) return;
    const LEN = this.snapshotLinks.length;
    this.pointerQueue = Array.from({ length: LEN }, (x, i) => i);
    for (let i = 0; i <= this.pointer; i++) {
      const firstElement = this.pointerQueue.shift() || 0;
      this.pointerQueue.push(firstElement);
    }
  }

  nextSnapshot(valueAsDirection: number) {
    switch (valueAsDirection) {
      case Direction.RIGHT:
        this.pointer = this.dequeue();
        this.link = this.snapshotLinks[this.pointer];
        break;
      case Direction.LEFT:
        this.pointer = this.enqueue();
        this.link = this.snapshotLinks[this.pointer];
        break;

      default:
        break;
    }
  }

  goTo(event: KeyboardEvent) {
    if (this.snapshotLinks.length === 1) return;
    if (event.key === 'ArrowLeft') {
      this.nextSnapshot(Direction.LEFT);
    }
    if (event.key === 'ArrowRight') {
      this.nextSnapshot(Direction.RIGHT);
    }
  }

  dequeue(): number {
    const firstElement = this.pointerQueue.shift() || 0;
    this.pointerQueue.push(firstElement);
    if (firstElement === this.pointer) {
      return this.dequeue();
    }
    return firstElement;
  }

  enqueue(): number {
    const lastElement = this.pointerQueue.pop() || 0;
    this.pointerQueue.unshift(lastElement);
    if (lastElement === this.pointer) {
      return this.enqueue();
    }
    return lastElement;
  }
}
