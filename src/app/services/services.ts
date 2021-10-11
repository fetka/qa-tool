import { Injectable } from '@angular/core';
import { SNAPSHOTS_LINKS, TEST_CASES } from '../mocks/test_case_mocks';
import { TestCase } from '../models/test-case';

@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  testCases: TestCase[] = TEST_CASES;

  snapshots: string[] = SNAPSHOTS_LINKS;

  getTestCasesAll(): TestCase[] {
    return this.testCases;
  }

  getSnapshotsLinksAll(): string[] {
    return this.snapshots;
  }
}
