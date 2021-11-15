/* eslint-disable no-param-reassign */
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

let testCasesMock: TestCase[] = [
  {
    title: 'title 1',
    id: '1',
    description: 'description 1',
    outcome: 'outcome 1',
    result: Result.Failed,
    steps: ['step 1', 'step 2', 'step 3'],
    screenshots: [],
  },
  {
    title: 'title 2',
    id: '2',
    description: 'description 2',
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
  });

  describe('ngOnInit', () => {
    it('should call getFileSelectionOption function', () => {
      expect(getFileSelectionOptionSpy).toHaveBeenCalled();
    });
    it('should call getFileSelectionOption function', () => {
      expect(component.fileSelectOptions).toEqual([optionMock]);
    });
    // it('should call getTestCases function', () => {
    //   expect(getTestCasesSpy).toHaveBeenCalled();
    // });
    // it('should call getTestCases function and return values', () => {
    //   const { testCasesFiltered: testCases } = component;
    //   expect(testCases).toEqual(testCasesMock);
    // });
    // it('should call getFileSelectionOption function', () => {
    //   expect(getFileSelectionOptionSpy).toHaveBeenCalled();
    // });
    // it('should call getFileSelectionOption function and return value', () => {
    //   const options = component.fileSelectOptions;
    //   expect(options).toEqual([optionMock]);
    // });
  });

  describe('fileSelectionChanged', () => {
    it('should call getTestCases function with filename', () => {
      const filename = 'file_B.json';
      component.fileSelectionChanged(filename);
      expect(getTestCasesSpy).toHaveBeenCalledWith(filename);
    });
  });

  describe('resultChanged', () => {
    beforeEach(() => {
      component.testCasesFiltered = testCasesMock;
      fixture.detectChanges();
    });
    it('should change the result value of test cases defined by index', () => {
      testCasesMock[0].result = 2;
      component.resultChanged(Result.Failed, 0);
      expect(testCasesMock[0].result).toEqual(Result.Failed);
    });
  });

  describe('getScreenshotCount', () => {
    beforeEach(() => {
      component.testCasesFiltered = testCasesMock;
      fixture.detectChanges();
    });
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
    beforeEach(() => {
      component.testCasesFiltered = testCasesMock;
      fixture.detectChanges();
    });
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
  describe('updateOutcome', () => {
    const updatedOutcome: string = 'updated outcome';
    const event: any = { target: { innerText: updatedOutcome } };
    const indexOfTestCase = 0;
    const savedStateOfOutcome = testCasesMock[indexOfTestCase].outcome;
    afterEach(() => {
      testCasesMock[indexOfTestCase].outcome = savedStateOfOutcome;
      component.fileShouldBeSave = false;
    });

    it("should update the underlying test case's outcome property", () => {
      component.updateOutcome(event, testCasesMock[indexOfTestCase]);
      expect(testCasesMock[0].outcome).toEqual(updatedOutcome);
    });

    it('fileShouldBeSave should equal true, if outcome have been changed', () => {
      component.updateOutcome(event, testCasesMock[indexOfTestCase]);
      expect(component.fileShouldBeSave).toBeTruthy();
    });

    describe(' with no change', () => {
      const eventWithNoChange: any = {
        target: { innerText: savedStateOfOutcome },
      };
      afterEach(() => {
        testCasesMock[indexOfTestCase].outcome = savedStateOfOutcome;
        component.fileShouldBeSave = false;
      });
      it("should NOT be updated the underlying test case's outcome property", () => {
        component.updateOutcome(
          eventWithNoChange,
          testCasesMock[indexOfTestCase]
        );
        expect(testCasesMock[indexOfTestCase].outcome).toEqual(
          savedStateOfOutcome
        );
      });
      it('fileShouldBeSave should equal false', () => {
        component.updateOutcome(
          eventWithNoChange,
          testCasesMock[indexOfTestCase]
        );
        expect(component.fileShouldBeSave).toBeFalsy();
      });
    });
  });
  describe('searchByWords function', () => {
    it('should behave...', () => {
      const inputEvent: any = { target: { value: 'title 1' } };
      const spySearch: any = spyOn(component, 'search');
      component.searchByWords(inputEvent);
      expect(spySearch).toHaveBeenCalledOnceWith(
        component.cloneTestCases,
        'title 1'
      );
    });
  });

  describe('search function', () => {
    it('should return the elements from the provided array that contain the searched word', () => {
      let result: number = component.search(testCasesMock, 'title 1').length; // 1
      result += component.search(testCasesMock, 'description 1').length; // 1
      result += component.search(testCasesMock, 'outcome 1').length; // 1
      result += component.search(testCasesMock, 'outcome 2').length; // 1
      result += component.search(testCasesMock, 'step 1').length; // 2
      result += component.search(testCasesMock, 'step 2').length; // 2
      result += component.search(testCasesMock, 'step 3').length; // 2
      result += component.search(testCasesMock, 'step 666').length; // null
      expect(result).toEqual(10);
    });
  });

  describe('calculateTestingProgress', () => {
    const savedStateOfMock = testCasesMock;
    beforeEach(() => {
      component.testCasesFiltered = testCasesMock;
      testCasesMock = savedStateOfMock;
      fixture.detectChanges();
    });
    it('should return string that contains progress data set', () => {
      testCasesMock[0].result = Result.Failed;
      testCasesMock[1].result = Result.Success;
      const success = 'Success: 1';
      const failed = 'Failed: 1';
      const pending = 'Pending: 0';
      const progress = 'Progress: 100%';
      const received = component.calculateTestingProgress();
      expect(received.match(success)).not.toBeNull();
      expect(received.match(failed)).not.toBeNull();
      expect(received.match(pending)).not.toBeNull();
      expect(received.match(progress)).not.toBeNull();
    });
    it('should set progress percent property', () => {
      testCasesMock[0].result = Result.Pending;
      component.calculateTestingProgress();
      expect(component.progressPercent).toEqual(50);
    });
  });

  // describe('caseEditableChanged function', () => {
  //   it('should return updated test case with truthy editable property', () => {
  //     const event: any = { checked: true };
  //     const testCase: Partial<TestCase> = { editable: false };
  //     const receivedValue = component.caseEditableChanged(event, testCase);
  //     expect(receivedValue.editable).toBeTruthy();
  //   });

  //   it('should return updated test case with falsy editable property ', () => {
  //     const event: any = { checked: false };
  //     const testCase: Partial<TestCase> = { editable: true };
  //     const receivedValue = component.caseEditableChanged(event, testCase);
  //     expect(receivedValue.editable).toBeFalsy();
  //   });
  // });

  describe('saveTestCases', () => {
    const event: any = { stopPropagation: jasmine.createSpy() };

    // it('should set back editable property to falsy', () => {
    //   const spyOnCancelEditableProps = spyOn(component, 'cancelEditableProps');
    //   component.saveTestCases(event);
    //   expect(spyOnCancelEditableProps).toHaveBeenCalled();
    // });

    it('should call testCaseService.save method with testCases array', () => {
      component.saveTestCases(event);
      expect(testCaseServiceStub.save).toHaveBeenCalledWith(
        component.testCasesFiltered,
        component.selectedFilename
      );
    });

    it('should call stopPropagation', () => {
      component.saveTestCases(event);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  // describe('cancelEditableProps()', () => {
  //   afterAll(() => testCasesMock.forEach((tc) => (tc.editable = false)));

  //   beforeEach(() => (component.testCasesFiltered = testCasesMock));

  //   it('should return testCase list with canceled editable props', () => {
  //     component.testCasesFiltered.forEach((tc) => (tc.editable = true));
  //     component.cancelEditableProps();
  //     const received = component.testCasesFiltered.every(
  //       (tc) => tc.editable === true
  //     );
  //     expect(received).toBeFalsy();
  //   });
  // });
});
