import {
  SCREENSHOT_LIST,
  SNAPSHOTS_LINKS,
  TEST_CASES,
} from '../mocks/test_case_mocks';
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
import { Injectable } from '@angular/core';

import { Screenshot, TestCase } from '../models/test-case';

@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  testCases: TestCase[] = TEST_CASES;

  screenshots: Screenshot[] = SCREENSHOT_LIST;

  getTestCasesAll(): TestCase[] {
    return this.testCases;
  }

  getScreenshotsAll(): Screenshot[] {
    return this.screenshots;
  }

  getScreenshot(id: number): Screenshot[] {
    if (!this.testCases[id].screenshots) return this.getScreenshotsAll();
    // const uniq = [...new Set(this.screenshots)];
    return this.testCases[id].screenshots;
  }
}
