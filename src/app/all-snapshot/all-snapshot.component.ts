/* eslint-disable comma-dangle */
import { TestCaseService } from '../services/services';
import { Component, OnInit } from '@angular/core';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'all-snapshot',
  templateUrl: './all-snapshot.component.html',
  styleUrls: ['./all-snapshot.component.scss'],
})
export class AllSnapshotComponent implements OnInit {
  snapshotsLinks!: string[];

  constructor(
    private testCaseService: TestCaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.snapshotsLinks = this.testCaseService.getSnapshotsLinksAll();
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '250px',
      data: { snapshotLinks: this.snapshotsLinks, initial: id },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
