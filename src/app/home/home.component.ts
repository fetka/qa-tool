/* eslint-disable dot-notation */
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';

import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import {
  DialogData,
  FileSelectOption,
  Result,
  Screenshot,
  TestCase,
} from '../models/test-case';
import { TestCaseService } from '../services/test-case.service';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 600,
  hideDelay: 300,
  touchendHideDelay: 100,
  position: 'above',
};
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState: boolean = false;
  showFiller = false;
  filteredTestCaseList: TestCase[] = [];
  cloneTestCaseList!: TestCase[];
  changedTestCaseList!: TestCase[];
  searchValue: string = '';
  snapshotsLinkList!: string[];
  filteredScreenshotList: Screenshot[] = [];
  selectedCase!: TestCase;
  fileSelectOptions: FileSelectOption[] = [];
  selectedOption!: string;
  isEditableAll: boolean = false;
  fileShouldBeSave: boolean = false;
  selectedFilename: string = 'test-cases - Copy@1.json';
  progressPercent: number = 0;
  displayResult: string = '';

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {}

  resultChanged(selectedResult: any, id: any) {
    this.filteredTestCaseList[id].result = selectedResult;
    this.displayResult = this.calculateTestingProgress();
    this.fileShouldBeSave = true;
    this.changedTestCaseList = this.filteredTestCaseList;
  }

  searchByWords(event: Event | any) {
    const key = (event.target as HTMLInputElement).value as string;
    this.filteredTestCaseList = this.search(this.changedTestCaseList, key);
  }

  search(tests: TestCase[], word: string) {
    return tests.filter((t) => {
      return (
        t.title.match(word) != null ||
        t.description.match(word) != null ||
        t.outcome.match(word) != null ||
        t.steps.some((s) => {
          return s.match(word) != null;
        })
      );
    });
  }
  createTestSuite(event: any) {
    console.log(event);
  }
  calculateTestingProgress(): string {
    let counterSuccess: number = 0;
    let counterFailed: number = 0;
    let counterPending: number = 0;
    this.filteredTestCaseList.forEach((t) => {
      if (Number(t.result) === Number(Result.Success)) {
        counterSuccess++;
      }
      if (Number(t.result) === Number(Result.Failed)) {
        counterFailed++;
      }
      if (Number(t.result) === Number(Result.Pending)) {
        counterPending++;
      }
    });
    this.progressPercent =
      ((counterSuccess + counterFailed) / this.filteredTestCaseList.length) *
      100;

    return `
     Success: ${counterSuccess}  
     Failed: ${counterFailed}   
     Pending: ${counterPending}
     Progress: ${this.progressPercent}%`;
  }

  enableEditOnAll(event: MatCheckboxChange) {
    this.isEditableAll = event.checked;
    this.elementRef.nativeElement
      .querySelectorAll('.case__input')
      .forEach((element: { value: boolean }) => {
        element.value = event.checked;
      });
  }
  editClicked(str: any) {
    alert(str);
  }

  displayDescriptionAndSteps(caseIndex: number): string {
    let displayContent =
      this.filteredTestCaseList[caseIndex].description.concat('\n');
    this.filteredTestCaseList[caseIndex].steps.forEach((s) => {
      displayContent = displayContent.concat(s).concat('\n');
    });

    return displayContent;
  }

  ngOnInit(): void {
    this.fileSelectOptions = this.testCaseService.getFileSelectOption();
    if (this.fileSelectOptions.length === 1) {
      this.selectedOption = this.fileSelectOptions[0].value;
      this.fileSelectionChanged(this.fileSelectOptions[0].value);
      this.displayResult = this.calculateTestingProgress();
    }
  }

  fileSelectionChanged(fileName: string) {
    this.selectedFilename = fileName;
    this.filteredTestCaseList = this.testCaseService.getTestCases(fileName);
    this.cloneTestCaseList = JSON.parse(
      JSON.stringify(this.filteredTestCaseList)
    );
    this.fileSelectOptions = this.testCaseService.getFileSelectOption();
    this.displayResult = this.calculateTestingProgress();
    this.changedTestCaseList = this.filteredTestCaseList;
  }

  selectTestCase(index: any) {
    if (index === 'all') {
      this.filteredScreenshotList = this.testCaseService.getScreenshotsAll();
    } else {
      this.filteredScreenshotList = this.testCaseService.getScreenshot(index);
    }
  }

  getScreenshotCount(index: number) {
    const count = this.filteredTestCaseList[index].screenshots?.length || 'all';
    return `( ${count} )`;
  }

  openDialog(id: number): void {
    // console.log(id);
    const data: DialogData = { list: this.filteredScreenshotList, pointer: id };
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data,
    });
  }
  addTestCase(index: number) {
    const newTestCase: TestCase = {
      id: '',
      title: 'title',
      description: 'description',
      outcome: 'outcome',
      result: Result.Pending,
      screenshots: [],
      steps: ['step 1', 'step 2', 'step 3'],
    };
    this.filteredTestCaseList.splice(index + 1, 0, newTestCase);
    this.fileShouldBeSave = true;
    this.changedTestCaseList = this.filteredTestCaseList;
  }
  deleteTestCase(index: number) {
    this.filteredTestCaseList.splice(index, 1);
    this.fileShouldBeSave = true;
    this.changedTestCaseList = this.filteredTestCaseList;
  }

  moveUp(index: number) {
    if (index === 0 || this.filteredTestCaseList.length === 1) return;
    const swap: TestCase = this.filteredTestCaseList[index];
    this.filteredTestCaseList[index] = this.filteredTestCaseList[index - 1];
    this.filteredTestCaseList[index - 1] = swap;
    this.fileShouldBeSave = true;
    this.changedTestCaseList = this.filteredTestCaseList;
  }
  moveDown(index: number) {
    if (this.filteredTestCaseList.length === index + 1) return;
    const swap: TestCase = this.filteredTestCaseList[index];
    this.filteredTestCaseList[index] = this.filteredTestCaseList[index + 1];
    this.filteredTestCaseList[index + 1] = swap;
    this.fileShouldBeSave = true;
    this.changedTestCaseList = this.filteredTestCaseList;
  }

  updateSteps(event: Event | any, testCase: TestCase, k: number) {
    const el = event.target as HTMLSpanElement;
    event.stopPropagation();
    if (testCase.steps[k] !== el.innerText) {
      this.updateElement(el);
      testCase.steps[k] = el.innerText;
    }
  }

  updateDescription(event: Event | any, testCase: TestCase): void {
    const el = event.target as HTMLSpanElement;
    if (testCase.description !== el.innerText) {
      this.updateElement(el);
      testCase.description = el.innerText;
    }
  }

  updateTitle(event: Event | any, testCase: TestCase): void {
    const el = event.target as HTMLSpanElement;
    if (testCase.title !== el.innerText) {
      this.updateElement(el);
      testCase.title = el.innerText;
    }
  }
  updateOutcome(event: Event | any, testCase: TestCase): void {
    const el = event.target as HTMLSpanElement;
    if (testCase.outcome !== el.innerText) {
      this.updateElement(el);
      testCase.outcome = el.innerText;
    }
  }

  updateElement(el: HTMLSpanElement) {
    if (el.classList.contains('edited')) {
      this.changedTestCaseList = this.filteredTestCaseList;
      return;
    }
    this.fileShouldBeSave = true;
    el.classList.add('edited');
    this.changedTestCaseList = this.filteredTestCaseList;
  }

  saveTestCases(event: Event) {
    event.stopPropagation();

    this.fileShouldBeSave = !this.testCaseService.save(
      this.search(this.changedTestCaseList, ''),
      this.selectedFilename
    );
  }
}
