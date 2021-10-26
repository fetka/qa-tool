import {
  FileSelectOption,
  DialogData,
  Result,
  Screenshot,
  TestCase,
} from '../models/test-case';
import { FileStoreService } from '../services/file-store.service';
/* eslint-disable no-param-reassign */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

import { TestCaseService } from '../services/test-case.service';

/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 1000,
  touchendHideDelay: 100,
};
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState: boolean = false;
  showFiller = false;
  testCases!: TestCase[];
  snapshotsLinks!: string[];
  filteredScreenshots: Screenshot[] = [];
  selectedCase!: TestCase;
  fileSelectOptions: FileSelectOption[] = [];

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog,
    private fileService: FileStoreService
  ) {}

  selectChange(selectedResult: any, id: any) {
    this.testCases[id].result = selectedResult;
    console.log(selectedResult);
  }

  ngOnInit(): void {
    this.testCases = this.testCaseService.getTestCasesAll();
    this.fileSelectOptions = this.testCaseService.getFileSelectOption();
  }
  fileSelectionChanged(fileName: string) {
    console.log(fileName);
    this.testCaseService.loadTestCases(fileName);
  }
  changed(ev: any, result: any) {
    console.log('radio button change event', ev.value, result);
  }

  selectTestCase(index: any) {
    if (index === 'all') {
      this.filteredScreenshots = this.testCaseService.getScreenshotsAll();
    } else {
      this.filteredScreenshots = this.testCaseService.getScreenshot(index);
    }
  }

  getSnapshotCount(index: number) {
    const count = this.testCases[index].screenshots?.length || 'all';
    return `( ${count} )`;
  }

  openDialog(id: number): void {
    console.log(id);
    const data: DialogData = { list: this.filteredScreenshots, pointer: id };
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
