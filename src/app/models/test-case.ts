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
  title: string;
  link: string;
  type: MediaType;
}
export enum MediaType {
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
}
export type FileType = 'json';
export type ErrorType = {
  error?:
    | 'The filename should be unique!'
    | 'File should be closed'
    | 'File should be opened first'
    | undefined;
};

export class TestCasesFileBox {
  _text: string;
  isOpened: boolean;
  // uploadedAt?: Date | undefined;
  type: FileType;
  constructor(
    public filename: string,
    text: string,
    public uploadedAt?: Date | number
  ) {
    this.filename = filename;
    this._text = text;
    this.type = 'json';
    this.isOpened = false;
    this.uploadedAt = uploadedAt;
  }
  close() {
    this.isOpened = false;
    return this;
  }
  open() {
    this.isOpened = true;
    return this;
  }

  updateText(text: string): boolean | ErrorType {
    if (this.isOpened) {
      this._text = text;
      return true;
    }
    return { error: 'File should be opened first' };
  }
  get text() {
    return this._text;
  }
}
