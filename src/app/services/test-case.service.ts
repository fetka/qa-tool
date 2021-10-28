import { Injectable } from '@angular/core';

import { SCREENSHOT_LIST, TEST_CASES } from '../mocks/test_case_mocks';
import {
  FileSelectOption,
  Screenshot,
  TestCase,
  TestCasesFileBox,
} from '../models/test-case';
import { FileStoreService } from './file-store.service';

@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  testCases: TestCase[] = TEST_CASES;

  screenshots: Screenshot[] = SCREENSHOT_LIST;

  private fileList!: TestCasesFileBox[];
  constructor(private fileService: FileStoreService) {
    this.fileList = this.fileService.getFileList();
  }

  loadTestCases(fileName: string) {
    const file = this.fileList.filter(
      (fileObj) => fileObj.filename === fileName
    );
    const f = JSON.parse(JSON.stringify(file[0].text));
    console.log(f.testCases);
  }

  getTestCasesAll(): TestCase[] {
    return this.testCases;
  }

  getScreenshotsAll(): Screenshot[] {
    return this.screenshots;
  }

  getScreenshot(id: number): Screenshot[] {
    if (!this.testCases[id].screenshots) return this.getScreenshotsAll();
    return this.testCases[id].screenshots;
  }
  getFileSelectOption(): FileSelectOption[] {
    const options: FileSelectOption[] = [];
    this.fileList.forEach((file) => {
      const tempArray = file.filename.split('.');
      const ext = tempArray.pop();
      const viewVal = tempArray.join('').toUpperCase().concat(`.${ext}`);
      options.push({
        value: file.filename,
        viewValue: viewVal,
      });
    });
    return options;
  }
}
