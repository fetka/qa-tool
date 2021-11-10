import { TestBed } from '@angular/core/testing';

import { SCREENSHOT_LIST, TEST_CASES } from '../mocks/test_case_mocks';
import {
  ErrorType,
  FileSelectOption,
  MediaType,
  Result,
  TestCase,
  TestCasesFileBox,
} from '../models/test-case';
import { FileStoreService } from './file-store.service';
import { TestCaseService } from './test-case.service';

describe('TestCasesService', () => {
  let service: TestCaseService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FileStoreService, useValue: fileStoreServiceStub },
      ],
    });
    service = TestBed.inject(TestCaseService);
  });

  describe('getFileList', () => {
    it('should be called by constructor', () => {
      expect(getFileListSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTestCases', () => {
    // beforeEach(() => service.getTestCases('tests.json'));

    it('should enumerate test cases into an array which belong to the file defined by passed in filename', () => {
      service.getTestCases('tests.json');
      expect(service.testCases).toEqual(testCasesMock);
    });

    it('should return empty array if not found', () => {
      const respond = service.getTestCases('not valid filename');
      expect(respond).toEqual([]);
    });
  });
  describe('getHArdCodedTestCases', () => {
    it('should return default value(TEST_CASES hard-coded array)', () => {
      service.testCases = [];
      const cases = service.getHArdCodedTestCases();
      expect(cases).toEqual(TEST_CASES);
    });
  });

  describe('getScreenshotsAll', () => {
    it('should return all screenshots(hard-coded list)', () => {
      const screenshots = service.getScreenshotsAll();
      expect(screenshots).toEqual(SCREENSHOT_LIST);
    });
  });

  describe('getScreenshot', () => {
    beforeEach(() => service.getTestCases('tests.json'));

    it('should return a screenshot selection related to index', () => {
      const screenshot = service.getScreenshot(1);
      expect(screenshot).toEqual(testCasesMock[1].screenshots);
    });

    it('should return all screenshot if no screenshot list was found', () => {
      const screenshot = service.getScreenshot(0);
      expect(screenshot).toEqual(SCREENSHOT_LIST);
    });
  });

  describe('getFileSelectOption', () => {
    beforeEach(() => service.getTestCases('tests.json'));

    it('should return file select option list create from TestCasesFileBox[] ', () => {
      const options: FileSelectOption[] = service.getFileSelectOption();
      expect(options).toEqual([
        { value: 'tests.json', viewValue: 'TESTS.json' },
      ]);
    });
  });

  describe('save', () => {
    it('should call fileStoreService.storeJson', () => {
      service.save(testCasesMock, filenameMock);
      expect(fileStoreServiceStub.storeJSON).toHaveBeenCalled();
    });
  });
});

const filenameMock = 'mock.json';
const fileBox: TestCasesFileBox = new TestCasesFileBox(
  filenameMock,
  'some test text'
);

const testCasesMock: TestCase[] = [
  {
    title: 'title 1',
    id: '1',
    description: ' description 1',
    outcome: 'outcome 1',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 2',
    id: '2',
    description: ' description 2',
    outcome: 'outcome 2',
    result: Result.Success,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [
      {
        title: '../../assets/screenshots/IMG_0094.PNG',
        link: '../../assets/screenshots/IMG_0094.PNG',
        type: MediaType.IMAGE,
      },
    ],
  },
];
const getFileListSpy = jasmine
  .createSpy()
  .and.returnValue([
    new TestCasesFileBox('tests.json', JSON.stringify(testCasesMock)),
  ]);

const fileStoreServiceStub: Partial<FileStoreService> = {
  uploadedFileList: [new TestCasesFileBox('tests.json', 'some test text')],
  localStorageKeyToFileList: 'test_test',
  getFileList: getFileListSpy,

  clearStorage: (): void => {},

  getFile: (): TestCasesFileBox | null => fileBox,
  downloadJson: (): void => {},
  storeJSON: jasmine.createSpy(),
  searchForFileWithTheSameFilename: (): boolean => true,
  removeFile: (): boolean => true,
};
