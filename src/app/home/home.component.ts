/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

import { TestCase } from '../models/test-case';
import { TestCaseService } from '../services/services';

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
      data: { snapshotLinks: this.filteredSnapshotsLinks, initial: id },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
