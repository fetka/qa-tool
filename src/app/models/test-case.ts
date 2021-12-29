/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-labels */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
// import { Screenshot } from './test-case';
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */

import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Type } from '@angular/core';

/* eslint-disable linebreak-style */
export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  outcome: string;
  result: Result;
  screenshots: Screenshot[];
}
export enum Result {
  Pending = 0,
  Failed = 1,
  Success = 2,
}

export enum Direction {
  LEFT = -1,
  RIGHT = 1,
}
export interface Screenshot {
  id?: number;
  title: string;
  link: string;
  type: DigitalFormatType;
  dataUrl?: string;
}
export enum DigitalFormatType {
  VIDEO = 'video',
  IMAGE = 'image',
}
export interface DialogData {
  list: Screenshot[];
  pointer: number;
}
export interface FileSelectOption {
  value: string;
  viewValue: string;
  selected?: boolean;
}
export type FileType =
  | 'application/json'
  | 'image/png'
  | 'image/jpeg'
  | 'video/mp4';
export type ErrorType = {
  error?:
    | 'The filename should be unique!'
    | 'File should be closed'
    | 'File should be opened first'
    | undefined;
};

export type PropertyType = 'title' | 'description' | 'step' | 'outcome';
export class TestCasesFileBox {
  // uploadedAt?: Date | undefined;
  public uploadedAtFormatted?: string;
  constructor(
    public filename: string,
    public content: string,
    public size: number,
    public type: FileType,
    public uploadedAt: number
  ) {
    this.filename = filename;
    this.content = content;
    this.type = type;
    this.uploadedAt = uploadedAt;
    this.size = size;
    if (this.uploadedAt) {
      this.createDateString(this.uploadedAt as number);
    }
  }

  private createDateString(date: number) {
    const d = new Date();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = d.getDate();
    const monthIndex = d.getMonth();
    const monthName = monthNames[monthIndex];
    const year = d.getFullYear();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    this.uploadedAtFormatted = `${year}-${monthName}-${day} ${hour}:${minutes}:${seconds}`;
  }

  updateText(text: string) {
    this.content = text;
  }
  getUploadedDate() {
    return this.uploadedAtFormatted;
  }
}

export type LogLevel = 'info' | 'warning' | 'error' | 'debug';
export interface Log {
  code: number;
  level: LogLevel;
  date: Date;
  message: string;
}
