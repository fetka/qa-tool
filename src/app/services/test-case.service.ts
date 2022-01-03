import {
  FileSelectOption,
  Screenshot,
  TestCase,
  TestCasesFileBox,
} from '../models/test-case';
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { Injectable } from '@angular/core';

import { SCREENSHOT_LIST, TEST_CASES } from '../mocks/test_case_mocks';

import { FileStoreService } from './file-store.service';

@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  testCases!: TestCase[];
  screenshots: Screenshot[] = SCREENSHOT_LIST;
  private fileBoxList!: TestCasesFileBox[];

  constructor(private fileService: FileStoreService) {
    this.fileBoxList = this.fileService.getFileList();
  }

  getTestCases(fileName: string) {
    const fileBox = this.fileBoxList.filter(
      (fileObj) => fileObj.filename === fileName
    );
    if (!fileBox || fileBox.length === 0) return [];
    this.testCases = JSON.parse(fileBox[0].content) as TestCase[];
    this.testCases.forEach((tc) => Object.seal(tc));
    return this.testCases;
  }

  getHArdCodedTestCases(): TestCase[] {
    return TEST_CASES;
  }
  getScreenshotsAll(): Screenshot[] {
    return this.screenshots;
  }

  getScreenshot(index: number): Screenshot[] {
    if (this.testCases[index].screenshots.length === 0) {
      return this.getScreenshotsAll();
    }
    return this.testCases[index].screenshots;
  }
  getFileSelectOption(): FileSelectOption[] {
    const options: FileSelectOption[] = [];
    this.fileBoxList.forEach((file, i) => {
      const tempArray = file.filename.split('.');
      const ext = tempArray.pop();
      const viewVal = tempArray.join('').toUpperCase().concat(`.${ext}`);
      options.push({
        value: file.filename,
        viewValue: viewVal,
        selected: false,
      });
    });
    return options;
  }
  save(testCases: TestCase[], filename: string) {
    console.log('save called');
    // console.log(testCases);

    const text = JSON.stringify(testCases);
    const fileBox = new TestCasesFileBox(
      filename,
      text,
      text.length,
      'application/json',
      Date.now()
    );

    const result = this.fileService.storeJSON(fileBox);
    if (result > 0) {
      return true;
    }
    return false;
  }
}
