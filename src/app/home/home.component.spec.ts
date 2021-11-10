/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import {
  FileSelectOption,
  MediaType,
  Result,
  TestCase,
} from '../models/test-case';
import { TestCaseService } from '../services/test-case.service';
import { HomeComponent } from './home.component';

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
const filenameMock = 'mock.json';
const getTestCasesSpy = jasmine.createSpy().and.returnValue(testCasesMock);
const getScreenshotSpy = jasmine.createSpy().and.returnValue([]);
const optionMock: FileSelectOption = {
  value: filenameMock,
  viewValue: 'MOCK.json',
};
const getFileSelectionOptionSpy = jasmine
  .createSpy()
  .and.returnValue([optionMock]);
const getHArdCodedTestCasesSpy = jasmine.createSpy().and.returnValue([]);
const getScreenshotsAllSpy = jasmine.createSpy().and.returnValue([]);

const testCaseServiceStub: Partial<TestCaseService> = {
  getScreenshot: getScreenshotSpy,
  getFileSelectOption: getFileSelectionOptionSpy,
  getHArdCodedTestCases: getHArdCodedTestCasesSpy,
  getTestCases: getTestCasesSpy,
  getScreenshotsAll: getScreenshotsAllSpy,
  save: jasmine.createSpy(),
};

const openSpy = jasmine.createSpy();
const MatDialogMock: Partial<MatDialog> = {
  open: openSpy,
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [],
      providers: [
        { provide: TestCaseService, useValue: testCaseServiceStub },
        { provide: MatDialog, useValue: MatDialogMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedFilename = filenameMock;
  });

  describe('ngOnInit', () => {
    it('should call getTestCases function', () => {
      expect(getTestCasesSpy).toHaveBeenCalled();
    });
    it('should call getTestCases function and return values', () => {
      const { testCases } = component;
      expect(testCases).toEqual(testCasesMock);
    });
    it('should call getFileSelectionOption function', () => {
      expect(getFileSelectionOptionSpy).toHaveBeenCalled();
    });
    it('should call getFileSelectionOption function and return value', () => {
      const options = component.fileSelectOptions;
      expect(options).toEqual([optionMock]);
    });
  });

  describe('fileSelectionChanged', () => {
    it('should call getTestCases function with filename', () => {
      const filename = 'file_B.json';
      component.fileSelectionChanged(filename);
      expect(getTestCasesSpy).toHaveBeenCalledWith(filename);
    });
  });

  describe('resultChanged', () => {
    it('should change the result value of test cases defined by index', () => {
      testCasesMock[0].result = 2;
      component.resultChanged(Result.Failed, 0);
      expect(testCasesMock[0].result).toEqual(Result.Failed);
    });
  });

  describe('getScreenshotCount', () => {
    it('should return count if test case have dedicated screenshots', () => {
      const count = 1;
      const expectedCount = `( ${count} )`;
      const receivedCount = component.getScreenshotCount(1);
      expect(receivedCount).toEqual(expectedCount);
    });
    it('should return count equals "All" if test case does NOT have dedicated screenshots', () => {
      const count = 0;
      const expectedCount = '( all )';
      const receivedCount = component.getScreenshotCount(0);
      expect(receivedCount).toEqual(expectedCount);
    });
  });

  describe('openDialog', () => {
    it('should call open dialog', () => {
      const { filteredScreenshots } = component;
      const data = {
        width: '250px',
        data: { list: filteredScreenshots, pointer: 1 },
      };
      component.openDialog(1);
      expect(openSpy).toHaveBeenCalledWith(ImageDialogComponent, data);
    });
  });

  describe('updateSteps', () => {
    const updatedStep: string = 'updated step';
    const event: any = { target: { innerText: updatedStep } };
    const indexOfStep = 0;
    const indexOfTestCase = 0;
    const savedStateOfStep = testCasesMock[indexOfTestCase].steps[indexOfStep];

    afterEach(() => {
      testCasesMock[indexOfTestCase].steps[indexOfStep] = savedStateOfStep;
      component.fileShouldBeSave = false;
    });
    it("should update the underlying test case's steps property", () => {
      component.updateSteps(
        event,
        testCasesMock[indexOfTestCase].steps,
        indexOfStep
      );
      expect(testCasesMock[indexOfTestCase].steps[indexOfStep]).toEqual(
        updatedStep
      );
    });
    it('fileShouldBeSave should equal true, if steps are changed', () => {
      component.updateSteps(
        event,
        testCasesMock[indexOfTestCase].steps,
        indexOfStep
      );
      expect(component.fileShouldBeSave).toBeTruthy();
    });

    describe(' with no change', () => {
      const eventWithNoChange: any = {
        target: { innerText: savedStateOfStep },
      };
      afterEach(() => {
        testCasesMock[indexOfTestCase].steps[indexOfStep] = savedStateOfStep;
        component.fileShouldBeSave = false;
      });
      it("should NOT update the underlying test case's steps property", () => {
        component.updateSteps(
          eventWithNoChange,
          testCasesMock[indexOfTestCase].steps,
          indexOfStep
        );
        expect(testCasesMock[indexOfTestCase].steps[indexOfStep]).toEqual(
          savedStateOfStep
        );
      });
      it('fileShouldBeSave should equal false ', () => {
        component.updateSteps(
          eventWithNoChange,
          testCasesMock[indexOfTestCase].steps,
          indexOfStep
        );
        expect(component.fileShouldBeSave).toBeFalsy();
      });
    });
  });

  describe('updateTitle', () => {
    const updatedTitle: string = 'updated title';
    const event = { target: { innerText: updatedTitle } };
    const indexOfTestCase = 0;
    const savedStateOfTitle = testCasesMock[indexOfTestCase].title;
    afterEach(() => {
      testCasesMock[indexOfTestCase].title = savedStateOfTitle;
      component.fileShouldBeSave = false;
    });

    it("should update the underlying test case's title property", () => {
      component.updateTitle(event, testCasesMock[indexOfTestCase]);
      expect(testCasesMock[0].title).toEqual(updatedTitle);
    });
    it('fileShouldBeSave should equal true, if title have been changed', () => {
      component.updateTitle(event, testCasesMock[indexOfTestCase]);
      expect(component.fileShouldBeSave).toBeTruthy();
    });

    describe(' with no change', () => {
      const eventWithNoChange: any = {
        target: { innerText: savedStateOfTitle },
      };
      afterEach(() => {
        testCasesMock[indexOfTestCase].title = savedStateOfTitle;
        component.fileShouldBeSave = false;
      });
      it("should NOT update the underlying test case's title property", () => {
        component.updateTitle(
          eventWithNoChange,
          testCasesMock[indexOfTestCase]
        );
        expect(testCasesMock[indexOfTestCase].title).toEqual(savedStateOfTitle);
      });
      it('fileShouldBeSave should equal false', () => {
        component.updateTitle(
          eventWithNoChange,
          testCasesMock[indexOfTestCase]
        );
        expect(component.fileShouldBeSave).toBeFalsy();
      });
    });
  });

  describe('updateDescription', () => {
    const updatedDescription: string = 'updated description';
    const event: any = { target: { innerText: updatedDescription } };
    const indexOfTestCase = 0;
    const savedStateOfDescription = testCasesMock[indexOfTestCase].description;
    afterEach(() => {
      testCasesMock[indexOfTestCase].description = savedStateOfDescription;
      component.fileShouldBeSave = false;
    });

    it("should update the underlying test case's description property", () => {
      component.updateDescription(event, testCasesMock[indexOfTestCase]);
      expect(testCasesMock[0].description).toEqual(updatedDescription);
    });

    it('fileShouldBeSave should equal true, if description have been changed', () => {
      component.updateDescription(event, testCasesMock[indexOfTestCase]);
      expect(component.fileShouldBeSave).toBeTruthy();
    });

    describe(' with no change', () => {
      const eventWithNoChange: any = {
        target: { innerText: savedStateOfDescription },
      };
      afterEach(() => {
        testCasesMock[indexOfTestCase].description = savedStateOfDescription;
        component.fileShouldBeSave = false;
      });
      it("should NOT be updated the underlying test case's description property", () => {
        component.updateDescription(
          eventWithNoChange,
          testCasesMock[indexOfTestCase]
        );
        expect(testCasesMock[indexOfTestCase].description).toEqual(
          savedStateOfDescription
        );
      });
      it('fileShouldBeSave should equal false', () => {
        component.updateDescription(
          eventWithNoChange,
          testCasesMock[indexOfTestCase]
        );
        expect(component.fileShouldBeSave).toBeFalsy();
      });
    });
  });

  describe('saveTestCases', () => {
    it('should call testCaseService.save method with testCases array', () => {
      component.saveTestCases();
      expect(testCaseServiceStub.save).toHaveBeenCalledWith(
        component.testCases,
        filenameMock
      );
    });
  });
});
