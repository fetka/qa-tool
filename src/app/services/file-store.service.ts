import { Injectable, OnInit } from '@angular/core';

import { FileObject } from '../models/test-case';

/* eslint-disable nonblock-statement-body-position */
/* eslint-disable comma-dangle */
@Injectable({
  providedIn: 'root',
})
export class FileStoreService implements OnInit {
  uploadedFileList: FileObject[] = [];
  dirtyFileList: FileObject[] = [];
  actualFile!: FileObject;
  localStorageKeyToFileList = 'testCase_fileList';
  constructor() {
    this.ngOnInit();
  }
  ngOnInit(): void {
    const value: string | null = localStorage.getItem(
      this.localStorageKeyToFileList
    );

    if (value) {
      this.uploadedFileList = JSON.parse(value);
    }
  }

  clearStorage() {
    localStorage.removeItem(this.localStorageKeyToFileList);
  }
  getFileList(): FileObject[] {
    return this.uploadedFileList;
  }
  getFile(filename: string): FileObject | null {
    const foundFiles: FileObject[] = this.uploadedFileList.filter(
      (file) => file.filename === filename
    );
    if (foundFiles.length === 0) return null;
    if (foundFiles.length > 1) {
      throw new Error('File was not found or store is corrupted.');
    }
    return foundFiles[0];
  }
  downloadJson(fileObject: FileObject): void {
    if (fileObject.isOpened) throw new Error('This file is not saved yet!!');
    if (fileObject.text === '' || fileObject.filename === '') {
      throw new Error('content or filename empty');
    }

    const blob = new Blob([fileObject.text], {
      type: 'application/json',
    });

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.download = !fileObject.filename.endsWith('.json')
      ? fileObject.filename.concat('.json')
      : fileObject.filename;
    anchor.href = `data:application/json;charset=utf-8,${encodeURI(
      fileObject.text
    )}`;

    // anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.target = '_self';
    anchor.click();
  }
  /* return index of stored file */
  storeJSON(fileObj: FileObject): number {
    if (fileObj.isOpened) {
      throw new Error('File should be closed');
    }
    if (this.searchForFileWithTheSameFilename(fileObj.filename)) {
      throw new Error('The filename should be unique!');
    }
    const fileToStore = JSON.parse(JSON.stringify(fileObj));

    const newLength = this.uploadedFileList.push(fileToStore);
    localStorage.setItem(
      this.localStorageKeyToFileList,
      JSON.stringify(this.uploadedFileList)
    );
    return newLength - 1;
  }

  /* return false when not found  */
  searchForFileWithTheSameFilename(filename: string): boolean {
    if (this.uploadedFileList.length === 0) return false;
    const searchResult = this.uploadedFileList.every(
      (f) => f.filename === filename
    );

    return searchResult;
  }
  removeFile(filename: string): boolean {
    const index = this.uploadedFileList.findIndex(
      (f) => f.filename === filename
    );
    if (index === -1) return false;
    this.uploadedFileList.splice(index, 1);
    localStorage.setItem(
      this.localStorageKeyToFileList,
      JSON.stringify(this.uploadedFileList)
    );
    return true;
  }
}
