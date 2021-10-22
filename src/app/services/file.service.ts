import { Injectable } from '@angular/core';

import { JsonFileObject } from '../models/test-case';

/* eslint-disable comma-dangle */
@Injectable({
  providedIn: 'root',
})
export class FileService {
  private uploadedFileList: JsonFileObject[] = [];
  private localStorageKeyToFileList = '_testCase_fileList';
  constructor() {
    const value = localStorage.getItem(this.localStorageKeyToFileList);
    if (value) {
      this.uploadedFileList = JSON.parse(value);
    }
  }

  clearStorage() {
    localStorage.removeItem(this.localStorageKeyToFileList);
  }
  getFileList(): JsonFileObject[] {
    return this.uploadedFileList;
  }
  downloadJson(jsonContent: string, filename: string) {
    if (!jsonContent && filename.length < 1) return;

    const blob = new Blob([jsonContent], {
      type: 'application/json',
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.download = !filename.endsWith('.json')
      ? filename.concat('.json')
      : filename;

    a.href = (window.webkitURL || window.URL).createObjectURL(blob);
    a.target = '_self';
    a.click();
  }

  downloadFile(obj: JsonFileObject) {
    if (this.uploadedFileList) throw new Error('List is empty');
    if (obj.type === 'json') this.downloadJson(obj.text, obj.filename);
  }

  // getUploadedJSON(index: number): JsonFileObject {
  //   return this.uploadedFileList[index];
  // }

  addUploadedJSON(v: JsonFileObject) {
    this.uploadedFileList.push(v);
    localStorage.setItem(
      'testCase_fileList',
      JSON.stringify(this.uploadedFileList)
    );
    console.log(this.uploadedFileList.length);
    console.log(v.filename);
  }
}
