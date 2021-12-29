/* eslint-disable prefer-destructuring */
import { TestCase, ErrorType, TestCasesFileBox } from '../models/test-case';
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { Injectable, OnInit } from '@angular/core';

/* eslint-disable nonblock-statement-body-position */
/* eslint-disable comma-dangle */
@Injectable({
  providedIn: 'root',
})
export class FileStoreService {
  uploadedFileList: TestCasesFileBox[] = [];
  dirtyFileList: TestCasesFileBox[] = [];
  actualFile!: TestCasesFileBox;
  localStorageKeyToFileList = 'testCase_fileList';

  constructor() {
    this.getFileFromLocalStorage();
  }

  getFileFromLocalStorage() {
    const value: string | null = localStorage.getItem(
      this.localStorageKeyToFileList
    );
    if (value) {
      const savedFiles: TestCasesFileBox[] = JSON.parse(value);
      savedFiles.forEach((element) => {
        const box = new TestCasesFileBox(
          element.filename,
          element.content,
          element.size,
          element.type,
          element.uploadedAt
        );
        this.uploadedFileList.push(box);
      });

      // console.log(this.uploadedFileList[0]);
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
  storeJSON(fileBox: TestCasesFileBox): number | ErrorType {
    // if (fileBox.isOpened) {
    //   return { error: 'File should be closed' };
    // }

    const fileToStore: TestCasesFileBox = new TestCasesFileBox(
      this.createNewFilename(fileBox.filename),
      fileBox.content,
      fileBox.size,
      fileBox.type,
      fileBox.uploadedAt
    );
    console.log('storeJson called');

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
    // console.log(searchResult);
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

  createNewFilename(name: string): string {
    let tempArray = name.split('.');
    const ext = tempArray.pop();
    let root = tempArray.join('');

    if (name.indexOf('@') >= 0) {
      tempArray = name.split('@');
      root = tempArray[0];
    }

    const version = name.match(/@\d*/g);
    let updated: number = 1;

    if (version) {
      updated = Number(version[0].substr(1)) + 1;
    }

    return root.concat(`@${updated}.${ext}`);
  }
}
