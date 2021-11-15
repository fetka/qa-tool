import { map } from 'rxjs/operators';
/* eslint-disable arrow-body-style */
/* eslint-disable no-plusplus */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import {
  MatTooltipDefaultOptions,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
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

/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
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
  testCasesFiltered: TestCase[] = [];
  cloneTestCases!: TestCase[];
  changedTestCases!: TestCase[];
  searchValue: string = '';
  snapshotsLinks!: string[];
  filteredScreenshots: Screenshot[] = [];
  selectedCase!: TestCase;
  fileSelectOptions: FileSelectOption[] = [];
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
    this.testCasesFiltered[id].result = selectedResult;
    this.displayResult = this.calculateTestingProgress();
  }

  searchByWords(event: Event | any) {
    const key = (event.target as HTMLInputElement).value as string;
    this.testCasesFiltered = this.search(this.cloneTestCases, key);
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

  calculateTestingProgress(): string {
    let counterSuccess: number = 0;
    let counterFailed: number = 0;
    let counterPending: number = 0;
    this.testCasesFiltered.forEach((t) => {
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
      ((counterSuccess + counterFailed) / this.testCasesFiltered.length) * 100;

    return `
     Success: ${counterSuccess}  
     Failed: ${counterFailed}   
     Pending: ${counterPending}
     Progress: ${this.progressPercent}%`;
  }

  enableEditOnAll(event: MatCheckboxChange) {
    this.isEditableAll = event.checked;
    this.elementRef.nativeElement
      .querySelectorAll('.isCaseEditable')
      .forEach((element: { value: boolean }) => {
        element.value = event.checked;
      });
  }

  displayDescriptionAndSteps(caseIndex: number): string {
    let displayContent =
      this.testCasesFiltered[caseIndex].description.concat('\n');
    this.testCasesFiltered[caseIndex].steps.forEach((s) => {
      displayContent = displayContent.concat(s).concat('\n');
    });

    return displayContent;
  }

  ngOnInit(): void {
    this.fileSelectOptions = this.testCaseService.getFileSelectOption();
  }

  fileSelectionChanged(fileName: string) {
    this.selectedFilename = fileName;
    this.testCasesFiltered = this.testCaseService.getTestCases(fileName);
    this.cloneTestCases = JSON.parse(JSON.stringify(this.testCasesFiltered));
    this.fileSelectOptions = this.testCaseService.getFileSelectOption();
    this.calculateTestingProgress();
  }

  selectTestCase(index: any) {
    if (index === 'all') {
      this.filteredScreenshots = this.testCaseService.getScreenshotsAll();
    } else {
      this.filteredScreenshots = this.testCaseService.getScreenshot(index);
    }
  }

  getScreenshotCount(index: number) {
    const count = this.testCasesFiltered[index].screenshots?.length || 'all';
    return `( ${count} )`;
  }

  openDialog(id: number): void {
    // console.log(id);
    const data: DialogData = { list: this.filteredScreenshots, pointer: id };
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data,
    });
  }
  logIt(s: any) {
    if ((s.value === 'true' && this.isEditableAll) || s.value === 'true') {
      console.log(s.value);
    }
  }
  updateSteps(event: any, steps: any[], i: number) {
    const text = (event.target as HTMLSpanElement).innerText as string;
    if (steps[i] !== text) {
      // console.log(text, steps[i]);
      steps[i] = text;
      this.fileShouldBeSave = true;
      this.changedTestCases = this.testCasesFiltered;
    }
  }

  updateDescription(event: any, testCase: TestCase): void {
    const text = (event.target as HTMLSpanElement).innerText as string;
    if (testCase.description !== text) {
      testCase.description = text;
      this.fileShouldBeSave = true;
      this.changedTestCases = this.testCasesFiltered;
    }
  }
  updateTitle(ev: any, testCase: TestCase): void {
    const text = (ev.target as HTMLSpanElement).innerText as string;
    if (testCase.title !== text) {
      testCase.title = text;
      this.fileShouldBeSave = true;

      this.changedTestCases = this.testCasesFiltered;
    }
  }
  updateOutcome(event: any, testCase: TestCase): void {
    const text = (event.target as HTMLSpanElement).innerText as string;
    if (testCase.outcome !== text) {
      testCase.outcome = text;
      this.fileShouldBeSave = true;
      this.changedTestCases = this.testCasesFiltered;
    }
  }

  saveTestCases(event: Event) {
    event.stopPropagation();
    this.testCaseService.save(this.testCasesFiltered, this.selectedFilename);
  }

  // cancelEditableProps() {
  //   const canceledEditable: TestCase[] = [];
  //   this.testCasesFiltered.forEach((tc) => {
  //     tc.editable = false;
  //     canceledEditable.push(tc);
  //   });
  //   return canceledEditable;
  // }
}
