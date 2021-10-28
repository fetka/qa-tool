/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { Injectable, OnInit } from '@angular/core';

import { ErrorType, TestCasesFileBox } from '../models/test-case';

/* eslint-disable nonblock-statement-body-position */
/* eslint-disable comma-dangle */
@Injectable({
  providedIn: 'root',
})
export class FileStoreService implements OnInit {
  uploadedFileList: TestCasesFileBox[] = [];
  dirtyFileList: TestCasesFileBox[] = [];
  actualFile!: TestCasesFileBox;
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
    console.log('clearStorage is called');
    localStorage.removeItem(this.localStorageKeyToFileList);
  }
  getFileList(): TestCasesFileBox[] {
    return this.uploadedFileList;
  }
  getFile(filename: string): TestCasesFileBox | null {
    const foundFiles: TestCasesFileBox[] = this.uploadedFileList.filter(
      (file) => file.filename === filename
    );
    if (foundFiles.length === 0) return null;
    if (foundFiles.length > 1) {
      throw new Error('File was not found or store is corrupted.');
    }
    return foundFiles[0];
  }
  downloadJson(fileObject: { filename: string; text: string }): void {
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
  storeJSON(fileObj: TestCasesFileBox): number | ErrorType {
    if (fileObj.isOpened) {
      return { error: 'File should be closed' };
    }
    if (
      // eslint-disable-next-line operator-linebreak
      this.uploadedFileList.length >= 1 &&
      this.searchForFileWithTheSameFilename(fileObj.filename)
    ) {
      return { error: 'The filename should be unique!' };
    }

    const fileToStore: TestCasesFileBox = new TestCasesFileBox(
      fileObj.filename,
      fileObj.text,
      fileObj.uploadedAt
    );

    const newLength = this.uploadedFileList.push(fileToStore);
    const indexOfStoredObject = newLength - 1;
    localStorage.setItem(
      this.localStorageKeyToFileList,
      JSON.stringify(this.uploadedFileList)
    );
    return indexOfStoredObject;
  }

  /* return false when not found  */
  searchForFileWithTheSameFilename(filename: string): boolean {
    if (this.uploadedFileList.length === 0) return false;
    let searchResult = false;
    this.uploadedFileList.forEach((f) => {
      if (f.filename.toLocaleUpperCase() === filename.toLocaleUpperCase()) {
        searchResult = true;
      }
    });
    console.log(searchResult);
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
