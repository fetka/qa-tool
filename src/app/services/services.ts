import { Injectable } from '@angular/core';

import { SCREENSHOT_LIST, TEST_CASES } from '../mocks/test_case_mocks';
import { Screenshot, TestCase } from '../models/test-case';

/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  testCases: TestCase[] = TEST_CASES;

  screenshots: Screenshot[] = SCREENSHOT_LIST;

  constructor() {}

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
}
