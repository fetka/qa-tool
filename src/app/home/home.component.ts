/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipDefaultOptions } from '@angular/material/tooltip';

import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { TestCase } from '../models/test-case';
import { TestCaseService } from '../services/services';

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
  panelOpenState: boolean = false;

  showFiller = false;

  testCases!: TestCase[];

  snapshotsLinks!: string[];

  filteredSnapshotsLinks!: string[];

  selectedCase!: TestCase;

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.testCases = this.testCaseService.getTestCasesAll();
  }

  changed(ev: any, result: any) {
    console.log('radio button change event', ev.value, result);
  }

  selectTestCase(index: any) {
    if (index === 'all') {
      this.filteredSnapshotsLinks = this.testCaseService.getSnapshotsLinksAll();
    } else {
      this.filteredSnapshotsLinks =
        this.testCaseService.getSnapshotLinks(index);
    }
  }

  getSnapshotCount(idx: number) {
    const count = this.testCases[idx].imageLinks?.length || 'all';
    return `( ${count} )`;
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data: { snapshotLinks: this.filteredSnapshotsLinks, pointer: id },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
