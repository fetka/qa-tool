/* eslint-disable no-plusplus */
import { Component, OnInit, ViewChild } from '@angular/core';
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
  showDelay: 700,
  hideDelay: 1000,
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
  testCases!: TestCase[];
  cloneTestCases!: TestCase[];

  snapshotsLinks!: string[];
  filteredScreenshots: Screenshot[] = [];
  selectedCase!: TestCase;
  fileSelectOptions: FileSelectOption[] = [];
  enableEdit: boolean = false;
  fileShouldBeSave: boolean = false;
  selectedFilename: string = 'test-cases - Copy@1.json';
  successResultPercent: number = 0;

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog
  ) {}

  resultChanged(selectedResult: any, id: any) {
    this.testCases[id].result = selectedResult;
  }

  ngOnInit(): void {
    this.testCases = this.testCaseService.getTestCases(this.selectedFilename);
    this.cloneTestCases = JSON.parse(JSON.stringify(this.testCases));
    this.fileSelectOptions = this.testCaseService.getFileSelectOption();
    let counter: number = 0;
    this.testCases.forEach((t) => {
      if (t.result === Result.Success) {
        counter++;
      }
    });
    this.successResultPercent = (counter / this.testCases.length) * 100;
  }
  fileSelectionChanged(fileName: string) {
    this.selectedFilename = fileName;
    this.testCases = this.testCaseService.getTestCases(fileName);
  }
  // changed(ev: any, result: any) {
  //   console.log('radio button change event', ev.value, result);
  // }

  selectTestCase(index: any) {
    if (index === 'all') {
      this.filteredScreenshots = this.testCaseService.getScreenshotsAll();
    } else {
      this.filteredScreenshots = this.testCaseService.getScreenshot(index);
    }
  }

  getScreenshotCount(index: number) {
    const count = this.testCases[index].screenshots?.length || 'all';
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
  updateSteps(event: any, steps: any[], i: number) {
    const text = (event.target as HTMLSpanElement).innerText as string;
    if (steps[i] !== text) {
      console.log(text, steps[i]);
      steps[i] = text;
      this.fileShouldBeSave = true;
    }
  }

  updateDescription(event: any, testCase: TestCase): void {
    const text = (event.target as HTMLSpanElement).innerText as string;
    if (testCase.description !== text) {
      testCase.description = text;
      this.fileShouldBeSave = true;
    }
  }
  updateTitle(event: any, testCase: TestCase): void {
    const text = (event.target as HTMLSpanElement).innerText as string;
    if (testCase.title !== text) {
      testCase.title = text;
      this.fileShouldBeSave = true;
    }
  }

  saveTestCases() {
    this.testCaseService.save(this.testCases, this.selectedFilename);
  }
}
